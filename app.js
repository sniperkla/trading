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
    const checkAccount = await licen.findOne({
      accountNumber: account,
      license: licenes
    })

    if (checkAccount) {
      if (checkAccount.status !== 'valid') {
        return res.status(HTTPStatus.OK).json({
          status: 'invalid',
          reason: checkAccount.status,
          expireDate: checkAccount.expireDate,
          expireDateThai: checkAccount.expireDateThai
        })
      }

      const now = new Date()
      let expireDateGregorian
      if (
        checkAccount.expireDate &&
        typeof checkAccount.expireDate === 'string'
      ) {
        // Parse Thai Buddhist calendar date and time string (e.g., "17/09/2568 15:22" or "17/09/2568")
        let datePart = checkAccount.expireDate
        let timePart = '00:00'
        if (checkAccount.expireDate.includes(' ')) {
          ;[datePart, timePart] = checkAccount.expireDate.split(' ')
        }
        const [day, month, yearThai] = datePart.split('/').map(Number)
        const yearGregorian = yearThai - 543
        let hour = 0,
          minute = 0
        if (timePart && timePart.includes(':')) {
          const timeSplit = timePart.split(':')
          hour = Number(timeSplit[0]) || 0
          minute = Number(timeSplit[1]) || 0
        }
        expireDateGregorian = new Date(
          yearGregorian,
          month - 1,
          day,
          hour,
          minute,
          0
        )
      } else if (checkAccount.expireDate instanceof Date) {
        expireDateGregorian = checkAccount.expireDate
      }

      if (expireDateGregorian && expireDateGregorian < now) {
        // Expired, update status to invalid
        if (checkAccount.status !== 'invalid') {
          checkAccount.status = 'expired'
          await checkAccount.save()
        }
        return res.status(HTTPStatus.OK).json({
          status: 'invalid',
          reason: 'expired',
          expireDate: checkAccount.expireDate,
          expireDateThai: checkAccount.expireDateThai
        })
      } else if (expireDateGregorian && expireDateGregorian >= now) {
        // Not expired, update status to valid
        if (checkAccount.status !== 'valid') {
          checkAccount.status = 'valid'
          await checkAccount.save()
        }
        return res.status(HTTPStatus.OK).json({
          status: 'valid',
          expireDate: checkAccount.expireDate,
          expireDateThai: checkAccount.expireDateThai
        })
      }
      return res.status(HTTPStatus.OK).json({
        status: checkAccount.status,
        expireDate: checkAccount.expireDate,
        expireDateThai: checkAccount.expireDateThai
      })
    } else {
      return res.status(HTTPStatus.OK).json({
        status: 'invalid',
        reason: 'not found'
      })
    }
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      error: error
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
