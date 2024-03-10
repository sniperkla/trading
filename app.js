const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 4050
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/gettrading', (req, res) => {
  try {
    const body = req.body

    console.log('this is body', body)
    return res.status(HTTPStatus.OK).json({ success: true, data: "xxx" })
  } catch (error) {
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
