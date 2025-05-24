const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 5800
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const licen = require('./model/licen')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

app.post('/license_api', async (req, res) => {
  try {
    const bodyq = req.body

    const checkLicence = await licen.findOne({ account: bodyq.account })
    if (checkLicence) {
      console.log('ur member')
      console.log('checkLicence ', checkLicence)
      return res.status(HTTPStatus.OK).json({ status: 'valid' })
    } else return res.status(HTTPStatus.OK).json({ status: 'invalid' })
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
