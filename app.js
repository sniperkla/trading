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

app.post('/license_api', async (req, res) => {
  try {
    const { account, licenes } = req.body
    const checkAccount = await licen.findOne({
      user: account,
      licenes: licenes
    })
    console.log('checkAccount', checkAccount)
    if (checkAccount) {
      const now = new Date()
      let expireDateGregorian
      if (
        checkAccount.expireDate &&
        typeof checkAccount.expireDate === 'string'
      ) {
        // Parse Thai Buddhist calendar date and time string (e.g., "01/09/2568 12:00")
        let datePart = checkAccount.expireDate
        let timePart = '00:00'
        if (checkAccount.expireDate.includes(' ')) {
          ;[datePart, timePart] = checkAccount.expireDate.split(' ')
        }
        const [day, month, yearThai] = datePart.split('/').map(Number)
        const yearGregorian = yearThai - 543
        const [hour, minute] = timePart.split(':').map(Number)
        expireDateGregorian = new Date(
          yearGregorian,
          month - 1,
          day,
          hour,
          minute
        )
      } else if (checkAccount.expireDate instanceof Date) {
        expireDateGregorian = checkAccount.expireDate
      }

      if (expireDateGregorian && expireDateGregorian < now) {
        // Expired, update status to invalid
        checkAccount.status = 'invalid'
        await checkAccount.save()
        return res.status(HTTPStatus.OK).json({
          status: 'invalid',
          reason: 'expired',
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
