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
    if (checkAccount) {
      return res.status(HTTPStatus.OK).json({ status: 'valid' })
    } else return res.status(HTTPStatus.OK).json({ status: 'invalid' })
  } catch (error) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      error: error
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
