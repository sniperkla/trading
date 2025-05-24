const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 9999
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/getUser', async (req, res) => {
  try {
    const bodyq = req.body
    console.log('hello', bodyq)
    console.log('Data sent successfully to all URLs:', req.body)
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
