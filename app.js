const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 5002
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const Data = require('./model/getdata')
const cron = require('node-cron')

require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const mongoose = require('mongoose')
const { postLineNotify } = require('./lib/lineNotityPost')

const pathName = process.env.NAME
const connectionString = `${process.env.DB}` + `${pathName}`

console.log('connectionString', connectionString)
mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

const schedule1hr = '0 * * * *'

const doCheckLinePost = async () => {
  await delay(10000)
  const getData = await Data.find()
  getData.map(async (item) => {
    if (item.status === false) {
      console.log('here', item.symbol)
      await senData(getData)
    } else {
      console.log('nothing', item.symbol)
    }
  })
}

const doCheckMarket = async () => {
  const data = getData.map((item) => {
    return { symbol: item.symbol, side: item.side, status: item.status }
  })
  await delay(20000)
  const buyit = {
    text: 'initsmcp',
    msg: `📈 สรุป เหรียญทั้งหมด`
  }
  await postLineNotify(buyit)
  for (let i = 0; i < data.length; i++) {
    const buyit = {
      text: 'initsmcp',
      msg: `\n เหรียญ : ${data[i].symbol} side :​${data[i].side}\n status :${
        data[i].status === true ? 'ซื้ออยู่ ✅' : 'รอซื้อ ❌'
      }`
    }
    await postLineNotify(buyit)
  }
}

const task1 = cron.schedule(schedule1hr, doCheckLinePost)
const task2 = cron.schedule(schedule1hr, doCheckMarket)

task1.start()
task2.start()

app.post('/getData', async (req, res) => {
  try {
    const bodyq = req.body
    if (bodyq.version === 'VS') {
      const checkData = await Data.findOne({ symbol: bodyq.symbol })
      if (checkData) {
        if (checkData.side !== bodyq.side && checkData.status == true) {
          await Data.updateOne(
            { symbol: bodyq.symbol },
            { side: bodyq.side, status: false },
            { upsert: true }
          )
        }
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

const senData = async (body) => {
  const URL = 'www'
  try {
    const response = await axios.post(URL, body)
    if (response.status === 200 || response.status === 201) {
      await Data.updateOne({ symbol: body.symbol }, { status: true })
      console.log('Data sent successfully to:', URL)
      // Handle successful response data (e.g., process response.data)
    } else {
      await Data.updateOne({ symbol: body.symbol }, { status: false })
      console.error('Error sending data to:', URL, 'Status:', response.status)
      // Handle unsuccessful response (e.g., display error message to user)
    }
  } catch (error) {
    console.error('Error sending data to:', URL, 'Error:', error)
    // Handle errors (e.g., network issues, server errors)
  }
}
