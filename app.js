const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 4050
const cors = require('cors')
const bodyParser = require('body-parser')
const Trading = require('./model/trading')
const Log = require('./model/log')
const axios = require('axios')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose')

const connectionString = 'mongodb://0.tcp.ap.ngrok.io:17800/trading' // Replace with your database name

mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))
let bodyq = null

app.get('/getbinance', async (req, res) => {
  try {
    const getLog = await Log.find()

    return res.status(HTTPStatus.OK).json({ success: true, data: getLog })
  } catch (error) {}
})

app.post('/gettrading', async (req, res) => {
  try {
    bodyq = req.body
    let body = {
      ...bodyq,
      status: false,
      symbol: bodyq.symbol.replace(/\.P$/, '')
    }
    const checkData = await Trading.findOne({
      signal: body.signal,
      trend: body.trend,
      symbol: body.symbol
    })

    if (checkData) {
      await Trading.deleteMany({
        signal: body.signal,
        trend: body.trend,
        symbol: body.symbol
      })
    }
    const createNew = await Trading.create({
      ...body,
      status: false
    })

    if (body.signal === '15m' || body.signal === '4h' || body.signal === '1m')
      checkTf15and4h(body, res)

    return res.status(HTTPStatus.OK).json({ success: true, data: 'ok' })
  } catch (error) {}
})

const checkTf15and4h = async (body, res) => {
  try {
    const check15m = await Trading.findOne({
      symbol: body.symbol,
      signal: '15m',
      trend: body.trend
    })
    const check4h = await Trading.findOne({
      symbol: body.symbol,
      signal: '4h',
      trend: body.trend
    })

    const check1m = await Trading.findOne({
      symbol: body.symbol,
      signal: '1m',
      trend: body.trend
    })

    let whenBuy = {
      symbol: body.symbol,
      price: parseFloat(check15m?.price)
    }

    postLineNotify(lineNotify(body))

    if (check1m) {
      // console.log('เข้า 1 นาทีจ้า')
      checkStopLoss(body, res, check15m, check4h, check1m)
    }
    if (check4h && check15m && check1m) {
      postLineNotify('buy')
      //  console.log('ซื้อเลย up', whenBuy)
      buyingBinance(check15m, check4h, check1m)
    } else {
      console.log('อย่าซื้อเลย')
    }
    return res.status(HTTPStatus.OK).json({ success: true, data: 'ไม่ๆๆๆ' })
  } catch (error) {}
}

//const creteLog = async () => {} //  signal1 signal2 symbol1 symbol2   + binance responese

const buyingBinance = async (check15m, check4h, check1m) => {
  try {
    const checkBinance = await Log.findOne({ 'binance.symbol': check1m.symbol })

    if (!checkBinance) {
      let data = {
        signal1: check4h?.signal,
        signal2: check15m?.signal,
        signal3: check1m?.signal,
        symbol: check1m?.symbol,
        trend: check1m?.trend,
        status: 'Buying',
        price: check1m?.price,
        binance: { symbol: check1m.symbol }
      }
      const logCreated = await Log.create(data)
    } else console.log('มีอยู่แล้วไม่ต้องซื้อจ้า')
    deletedWhenMatch(check15m, check4h, check1m)
  } catch (error) {}
}

const checkStopLoss = async (body, check15m, check4h, check1m) => {
  try {
    const nice = await Log.findOne({
      'binance.symbol': body.symbol // "15m"
    })
    if (nice) {
      if (
        (body.trend === 'Down' && nice.trend === 'Up') ||
        (body.trend === 'Up' && nice.trend === 'Down')
      ) {
        postLineNotify('stoploss')
        console.log('this is nice', nice)
        console.log('cancle take profit')
        deletedWhenMatch(check15m, check4h, check1m)
      }
    }
  } catch (error) {}
}
const deletedWhenMatch = async (check15m, check4h, check1m) => {
  await Trading.deleteMany({
    $or: [{ _id: check15m?._id }, { _id: check4h?._id }, { _id: check1m?._id }]
  })
}

const postLineNotify = async (buyit) => {
  const url = 'https://notify-api.line.me/api/notify'
  const accessToken = 'F7a8pS8pvY12WuFggDpsE589qiIAUvk4Sqs2S3ynvy0'
  let message = null
  if (typeof buyit === 'string' && buyit === 'buy') {
    message = 'ซื้อแล้ว'
  } else if (typeof buyit === 'string' && buyit === 'stoploss') {
    message = 'Stop Loss Detect!! Cancle Order'
  } else
    message = `\nsignal: ${buyit.signal}\ntrend: ${buyit.trend}\nprice: ${buyit.price}\nsymbol: ${buyit.symbol}\ntime: ${buyit.time}`

  await axios({
    method: 'post',
    url,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      message: message
      // Other parameters as needed (refer to LINE Notify API documentation)
    }
  })
    .then(() => {
      console.log('hello')
    })

    .catch((error) => {})
}

const lineNotify = (body) => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const buyit = {
    signal: body.signal,
    price: body.price,
    trend: body.trend,
    symbol: body.symbol,
    time: `${hours}:${minutes}:${seconds}`
  }
  return buyit
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
