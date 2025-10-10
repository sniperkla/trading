// Simple API key authentication middleware
// const API_KEY = process.env.API_KEY || 'your-secret-api-key';
// function apiKeyAuth(req, res, next) {
//   const key = req.headers['x-api-key'];
//   if (!key || key !== API_KEY) {
//     return res.status(HTTPStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
//   }
//   next();
// }
const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
require('dotenv').config()

const port = 5800
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const licen = require('./model/licen')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const connectionString = `${process.env.DB}` + `${process.env.NAME}`

// ---------------- Helper Functions (expiration handling) ----------------
// Parse Thai Buddhist calendar date (DD/MM/YYYY[ HH:mm]) to JS Date
const parseThaiExpireDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null
  let datePart = dateStr
  let timePart = '00:00'
  if (dateStr.includes(' ')) {
    ;[datePart, timePart] = dateStr.split(' ')
  }
  const [day, month, yearThai] = datePart.split('/').map(Number)
  if (!day || !month || !yearThai) return null
  const yearGregorian = yearThai - 543
  let hour = 0,
    minute = 0
  if (timePart && timePart.includes(':')) {
    const timeSplit = timePart.split(':')
    hour = Number(timeSplit[0]) || 0
    minute = Number(timeSplit[1]) || 0
  }
  return new Date(yearGregorian, month - 1, day, hour, minute, 0)
}

// Evaluate one license document, update status if needed, and build response object.
// Keeps custom statuses (e.g., 'revoked') untouched unless determining expiry.
async function evaluateAndSyncLicense(doc) {
  const now = new Date()
  let expireDateGregorian = null
  if (doc.expireDate) {
    if (typeof doc.expireDate === 'string') {
      expireDateGregorian = parseThaiExpireDate(doc.expireDate)
    } else if (doc.expireDate instanceof Date) {
      expireDateGregorian = doc.expireDate
    }
  }

  // If we can evaluate an expiry date
  if (expireDateGregorian) {
    const msInDay = 24 * 60 * 60 * 1000
    const daysToExpire = Math.floor((expireDateGregorian - now) / msInDay)
    if (expireDateGregorian <= now) {
      if (doc.status !== 'expired') {
        // Only overwrite if status is (valid|expired|invalid) - preserve suspended, revoked, etc.
        if (
          ['valid', 'expired', 'invalid', 'nearly_expired'].includes(doc.status)
        ) {
          await doc.updateOne({
            $set: { status: 'expired' },
            $unset: { lastNearlyExpiredNotifiedAt: 1 }
          })
        }
      }
      return {
        status: 'invalid',
        reason: 'expired',
        expireDate: doc.expireDate
      }
    } else if (daysToExpire >= 0 && daysToExpire < 3) {
      if (doc.status !== 'nearly_expired') {
        if (
          ['valid', 'expired', 'invalid', 'nearly_expired'].includes(doc.status)
        ) {
          await doc.updateOne({
            $set: { status: 'nearly_expired' },
            $unset: { notified: 1 }
          })
        }
      }
      return {
        status: 'nearly_expired',
        reason: 'expires_soon',
        daysToExpire,
        expireDate: doc.expireDate,
        expireDateThai: doc.expireDateThai
      }
    } else {
      if (doc.status !== 'valid') {
        // Only overwrite if status is (valid|expired|invalid|nearly_expired) - preserve suspended, revoked, etc.
        if (
          ['valid', 'expired', 'invalid', 'nearly_expired'].includes(doc.status)
        ) {
          await doc.updateOne({
            $set: { status: 'valid' },
            $unset: { notified: 1, lastNearlyExpiredNotifiedAt: 1 }
          })
        }
      }
      return {
        status: 'valid',
        expireDate: doc.expireDate,
        expireDateThai: doc.expireDateThai
      }
    }
  }

  // No parsable expiry date -> return current status & note
  return {
    status: doc.status || 'valid',
    expireDate: doc.expireDate || null,
    expireDateThai: doc.expireDateThai,
    note: 'no-expire-date'
  }
}

console.log('connectionString', connectionString)
mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

// app.post('/license_api', apiKeyAuth, async (req, res) => {
app.post('/license_api', async (req, res) => {
  try {
    const { account, licenes } = req.body

    // DEMO account first
    const demoDoc = await licen.findOne({
      accountNumber: 'DEMO',
      license: licenes
    })
    if (demoDoc) {
      // Check for suspended or other non-standard statuses first
      if (!['valid', 'expired', 'invalid'].includes(demoDoc.status)) {
        return res.status(HTTPStatus.OK).json({
          status: 'invalid',
          reason: demoDoc.status,
          expireDate: demoDoc.expireDate,
          expireDateThai: demoDoc.expireDateThai
        })
      }
      const demoResult = await evaluateAndSyncLicense(demoDoc)
      return res.status(HTTPStatus.OK).json(demoResult)
    }

    // Normal account
    const userDoc = await licen.findOne({
      accountNumber: account,
      license: licenes
    })
    if (!userDoc) {
      // Fallback: account not found but license exists -> treat as demo usage
      const licenseOnlyDoc = await licen.findOne({ license: licenes })
      if (licenseOnlyDoc && licenseOnlyDoc.accountNumber === 'DEMO') {
        const assumed = await evaluateAndSyncLicense(licenseOnlyDoc)
        return res.status(HTTPStatus.OK).json({
          ...assumed,
          assumedDemo: true,
          reason: assumed.reason || 'account-not-found-demo-assumed'
        })
      }
      return res
        .status(HTTPStatus.OK)
        .json({ status: 'invalid', reason: 'not found' })
    }

    // If status already something other than valid/expired/invalid/nearly_expired (like revoked), return immediately
    if (
      !['valid', 'expired', 'invalid', 'nearly_expired'].includes(
        userDoc.status
      )
    ) {
      return res.status(HTTPStatus.OK).json({
        status: 'invalid',
        reason: userDoc.status,
        expireDate: userDoc.expireDate,
        expireDateThai: userDoc.expireDateThai
      })
    }

    const result = await evaluateAndSyncLicense(userDoc)
    return res.status(HTTPStatus.OK).json(result)
  } catch (error) {
    console.error('Error processing /license_api request:', error)
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      error: error
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
