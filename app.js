const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 5002
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const Data = require('./model/getdata')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose')

const pathName = process.env.NAME
const connectionString = `${process.env.DB}` + `${pathName}`

console.log('connectionString', connectionString)
mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

app.post('/getData', async (req, res) => {
  try {
    const bodyq = req.body
    if (bodyq.version === 'VS') {
      const checkData = await Data.findOne({ symbol: bodyq.symbol })
      if (checkData) {
        await Data.updateOne(
          { symbol: bodyq.symbol },
          { side: bodyq.side },
          { upsert: true }
        )
      } else {
        await Data.create({ symbol: bodyq.symbol, side: bodyq.side })
      }

      return res.status(HTTPStatus.OK).json({ success: true, data: 'success' })
    }
  } catch (error) {
    console.error('Error broadcasting data:', error)
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Failed to broadcast data'
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const multiUser = async (URL, body) => {
  try {
    const response = await axios.post(URL, body)
    if (response.status === 200 || response.status === 201) {
      console.log('Data sent successfully to:', URL)
      // Handle successful response data (e.g., process response.data)
    } else {
      console.error('Error sending data to:', URL, 'Status:', response.status)
      // Handle unsuccessful response (e.g., display error message to user)
    }
  } catch (error) {
    console.error('Error sending data to:', URL, 'Error:', error)
    // Handle errors (e.g., network issues, server errors)
  }
}
