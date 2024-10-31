const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 3002
const cors = require('cors')
const bodyParser = require('body-parser')
const url = require('./lib/combineUser')
const axios = require('axios')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/gettrading', async (req, res) => {
  try {
    const bodyq = req.body
    const urls = url.combineUser()
    // Use Promise.all to handle multiple requests concurrently
    await Promise.all(
      urls.URL.map(async (url) => {
        await multiUser(url, bodyq)
      })
    )
    console.log('Data sent successfully to all URLs:', urls.URL)
    return res.status(HTTPStatus.OK).json({ success: true, data: 'success' })
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
