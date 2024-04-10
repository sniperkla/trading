const express = require('express')
const app = express()
const port = 80
const cors = require('cors')
const bodyParser = require('body-parser')

const multiUser = require('./lib/multiUser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose')
// const connectionString = 'mongodb://admin:AaBb1234!@27.254.144.100/trading'
const connectionString = 'mongodb://localhost:27017/trading'

mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))
let bodyq = null

app.post('/gettrading', async (req, res) => {
  try {
    bodyq = req.body
    await multiUser.multiUser(bodyq)
  } catch (error) {}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
