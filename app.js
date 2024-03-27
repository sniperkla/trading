const express = require('express')
const HTTPStatus = require('http-status')
const app = express()
const port = 80
const cors = require('cors')
const bodyParser = require('body-parser')
const Trading = require('./model/trading')
const Log = require('./model/log')
const lineNotifyPost = require('./lib/lineNotifyPost')
const apiBinance = require('./lib/apibinance')
const callLeverage = require('./lib/calLeverage')
const realEnvironment = require('./lib/realEnv')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose')

// const connectionString = 'mongodb://localhost:27017/trading' //'mongodb://27.254.144.100/trading' // Replace with your database name
const connectionString = 'mongodb://admin:AaBb1234!@27.254.144.100/trading'

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

    let body = await checkDataFirst(bodyq)

    if (body.type === 'MARKET') {
      const x = await Log.findOne({ symbol: body.symbol })

      if (x) {
        const checkTakeOrCancle = await apiBinance.getOrder(
          x?.binanceMarket?.orderId,
          body.symbol
        )

        if (checkTakeOrCancle.status === 'CLOSED') {
          await Log.deleteOne({ symbol: body.symbol })
        }
      }

      const calLeverage = await callLeverage.leverageCal(
        body.symbol,
        body.priceCal,
        body.stopPriceCal,
        body.side
      )
      checkCondition(
        body,
        res,
        calLeverage.maximumQty,
        calLeverage.defaultLeverage,
        calLeverage.budget,
        calLeverage.minimum,
        calLeverage.openLongShort,
        calLeverage.st,
        calLeverage.valueAskBid
      )
    } else checkCondition(body, res)

    return res.status(HTTPStatus.OK).json({ success: true, data: 'ok' })
  } catch (error) {}
})

const checkCondition = async (
  body,
  res,
  maximumQty,
  defaultLeverage,
  budget,
  minimum,
  openLongShort,
  st,
  valueAskBid
) => {
  try {
    const finalBody = {
      ...body,
      quantity: maximumQty,
      leverage: defaultLeverage,
      budget: budget,
      minimum: minimum,
      openLongShort: openLongShort,
      st: st,
      valueAskBid: valueAskBid
    }
    await lineNotifyPost.postLineNotify(lineNotify(finalBody))

    if (body.type === 'MARKET') {
      await realEnvironment.buyingBinance(finalBody)
    } else if (body.type === 'STOP_MARKET') {
      await checkStopLoss(body)
    }

    return res.status(HTTPStatus.OK).json({ success: true, data: 'ไม่ๆๆๆ' })
  } catch (error) {}
}

// const envorimentTest = async (body) => {
//   try {
//     const checkBinance = await Log.findOne({
//       symbol: body.symbol
//     })

//     const status = true
//     if (!checkBinance) {
//       const {
//         symbol,
//         side,
//         type,
//         takeProfit,
//         quantity,
//         stopPriceCal,
//         leverage
//       } = body
//       const setLeverage = await apiBinance.changeLeverage(symbol, leverage)
//       let binanceMarket = {}
//       binanceMarket = await apiBinance.postBinannce(
//         symbol,
//         side,
//         quantity,
//         type,
//         stopPriceCal,
//         status
//       )
//       if (binanceMarket.status === 400) {
//         const buyit = {
//           symbol: symbol,
//           text: 'error',
//           type: type,
//           msg: binanceMarket.data.msg
//         }
//         await lineNotifyPost.postLineNotify(buyit)
//       } else if (binanceMarket.status === 200) {
//         const binanceTakeProfit = await apiBinance.postBinannce(
//           takeProfit.symbol,
//           takeProfit.side,
//           quantity,
//           takeProfit.type,
//           stopPriceCal,
//           status,
//           takeProfit.takeprofit
//         )
//         if (binanceTakeProfit.status === 200) {
//           const buy = await realEnvironment.buyingBinance(body)
//         } else if (binanceTakeProfit.status === 400) {
//           const buyit = {
//             text: 'error',
//             symbol: takeProfit.symbol,
//             type: takeProfit.type,
//             msg: binanceTakeProfit.data.msg
//           }
//           await lineNotifyPost.postLineNotify(buyit)
//         }
//       }
//     } else if (checkBinance) {
//       const buyit = {
//         text: 'error',
//         symbol: body.symbol,
//         type: body.type,
//         msg: 'มีออเดอร์อยู่แล้วจ้าาาา'
//       }
//       await lineNotifyPost.postLineNotify(buyit)
//     }
//   } catch (error) {}
// }
const checkStopLoss = async (body) => {
  try {
    const { symbol, side, type, stopPrice } = body

    console.log('urhere')

    const qty = 0
    const status = true

    const data = await apiBinance.postBinannce(
      symbol,
      side,
      qty,
      type,
      stopPrice,
      status
    )

    const check = await Log.findOne({
      'symbol': symbol,
      'binanceStopLoss.symbol': symbol
    })

    if (data.status === 200) {
      if (check) {
        console.log('urrightjaaaaaaaa')
        //   await apiBinance.cancleOrder(symbol, check.binanceStopLoss.orderId)
        // }

        await Log.findOneAndUpdate(
          { symbol: symbol },
          {
            $set: { binanceStopLoss: data.data }
          },
          { upsert: true }
        )
      }

      const buyit = {
        symbol: symbol,
        text: 'updatestoploss',
        type: type,
        msg: `อัพเดท stoploss สำเร็จ , เลื่อน stopLoss : ${stopPrice}`
      }
      await lineNotifyPost.postLineNotify(buyit)
    } else {
      const buyit = {
        symbol: symbol,
        text: 'error',
        type: type,
        msg: data.data.msg
      }
      await lineNotifyPost.postLineNotify(buyit)
    }
  } catch (error) {}
}

const lineNotify = (body) => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const buyit = {
    symbol: body.symbol,
    side: body.side,
    type: body.type,
    price: body.price,
    takeProfit: body.takeProfit,
    stopPrice: body.stopPrice,
    time: `${hours}:${minutes}:${seconds}`
  }
  return buyit
}

const checkMarketBody = (body) => {
  let real = {}

  const filteredBody = body.filter((item) => item.hasOwnProperty('takeprofit'))

  real = {
    type: body[0].type,
    side: body[0].side,
    symbol: body[0].symbol,
    takeProfit: filteredBody[0],
    priceCal: body[0].priceCal,
    stopPriceCal: body[0].stopPriceCal
  }

  return real
}

const checkStopLossBody = (bodyq) => {
  let real = {}

  real = {
    type: bodyq.type,
    side: bodyq.side,
    symbol: bodyq.symbol,
    price: bodyq.price,
    stopPrice: bodyq.stopPrice
  }

  return real
}

const checkDataFirst = async (bodyq) => {
  if (bodyq[0]?.type === 'MARKET') {
    const modifiedBody = bodyq.map((item) => ({
      ...item,
      symbol: item.symbol.replace(/\.P$/, '')
    }))

    const bodyMarket = checkMarketBody(modifiedBody)

    const checkData = await Trading.findOne({
      symbol: bodyMarket.symbol,
      type: bodyMarket.type
    })

    if (checkData) {
      await Trading.updateOne(
        {
          symbol: bodyMarket.symbol,
          type: bodyMarket.type
        },
        bodyMarket,
        { upsert: true }
      )
    }
    if (!checkData) await Trading.create(bodyMarket)

    return bodyMarket
  } else if (bodyq?.type === 'STOP_MARKET') {
    let body = {
      ...bodyq,
      symbol: bodyq.symbol.replace(/\.P$/, '')
    }
    const bodyStopLoss = checkStopLossBody(body)

    return bodyStopLoss
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
