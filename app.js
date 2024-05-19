const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 3002
const cors = require('cors')
const bodyParser = require('body-parser')
const url = require('./lib/combineUser')

const multiUser = require('./lib/multiUser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let bodyq = null

app.post('/gettrading', async (req, res) => {
  try {
    bodyq = req.body
    const urls = url.combineUser()
    for (let i = 0; i < urls.URL.length; i++) {
      multiUser.multiUser(urls.URL[i], bodyq)
    }
    return res.status(HTTPStatus.OK).json({ success: true, data: 'success' })
  } catch (error) {}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
