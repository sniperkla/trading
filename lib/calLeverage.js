const axios = require('axios')

const apiBinance = require('./apibinance')

const leverageCal = async (symbol, priceCal, stopPriceCal, side) => {
  let st = Math.abs(((priceCal - stopPriceCal) / stopPriceCal) * 100).toFixed(2)

  const defaultMargins = await apiBinance.getDefultMagin()

  const initialMargin = defaultMargins.filter((item) => {
    return item.asset === 'USDT'
  }) // get only USDT
  const defaultMargin = initialMargin[0].balance

  let defaultLeverage = await apiBinance.getLeverageInitial(symbol)
  const askBid = await apiBinance.getMarketPrice(symbol)
  const markPrice = await apiBinance.getPrice(symbol)
  const haha = await apiBinance.getExchangeInfo()
  const getMarkPrice = await apiBinance.getMarkPrice(symbol)

  const x = haha.data.symbols.filter((item) => {
    return item.symbol === symbol
  })
  const min_Notional = x[0].filters.filter((item) => {
    return item.filterType === 'MIN_NOTIONAL'
  })

  let minimum = min_Notional[0].notional / markPrice

  if (minimum > 0.5) {
    minimum = Math.ceil(minimum)
  } else {
    //minimum = parseFloat(minimum.toFixed(3))
    minimum = Math.ceil(minimum * 1000) / 1000
  }

  let match = 0
  let running = 0

  if (minimum < 0.5) {
    match = parseInt(minimum.toString().match(/\.(\d*)/)[1].length)
    running = parseFloat(1 / Math.pow(10, match))
  } else {
    running = 1
  }

  let maximumQty = minimum
  const bids = askBid.bids[0][0]
  const asks = askBid.asks[0][0]
  const budget = defaultMargin * 0.02 || 2.5

  let leverage = budget * defaultLeverage * (st / 100)

  while (leverage > budget) {
    leverage = budget * defaultLeverage * (st / 100)
    if (leverage <= budget) {
      break
    }
    defaultLeverage--
  }

  let direction = 0
  let marketSize = 0
  let price = 0
  let valueAskBid = 0

  if (side === 'BUY') {
    const ask1 = asks * 0.0005
    valueAskBid = asks
    price = parseFloat(asks + ask1)
    direction = 1
  } else if (side === 'SELL') {
    valueAskBid = bids
    price = bids
    direction = -1
  }

  marketSize = (price * maximumQty) / defaultLeverage

  while (marketSize < budget) {
    marketSize = (price * maximumQty) / defaultLeverage

    if (marketSize >= budget) {
      break
    }
    maximumQty = maximumQty + running
  }

  let openLongShort = calMargin(
    price,
    maximumQty,
    direction,
    priceCal,
    defaultLeverage
  )

  if (openLongShort.openLongShort < budget) {
    return {
      maximumQty,
      defaultLeverage,
      st,
      budget,
      minimum,
      openLongShort,
      valueAskBid
    }
  } else {
    while (openLongShort.openLongShort > budget) {
      maximumQty = maximumQty - running

      openLongShort = calMargin(
        price,
        maximumQty,
        direction,
        getMarkPrice,
        defaultLeverage
      )
      if (openLongShort.openLongShort < budget) {
        // console.log('Margin', budget)
        // console.log('Leverage', defaultLeverage)
        // console.log('st%', st)
        // console.log('asksBids', price)
        // console.log('MinimumQty', minimum)
        // console.log(
        //   'Size Qty Long และ Size Qty Short (ขั้นตอนหา Maximum Qty)',
        //   maximumQty
        // )
        // console.log(
        //   'Calculate Margin Long  และ Calculate Margin Short (ขั้นตอนที่ 2)',
        //   openLongShort.bidsAsksCost
        // )
        // console.log(
        //   'Calculate Margin Long  และ Calculate Margin Short (ขั้นตอนที่ 3)',
        //   openLongShort.openloss
        // )
        // console.log(
        //   'Calculate Margin Long  และ Calculate Margin Short (ขั้นตอนที่ 4)',
        //   openLongShort.openLongShort
        // )
        // console.log('mark price ของฟิวเจอ ', markPrice)
        // console.log('mark price spot', getMarkPrice)
        // console.log('mark price ask[0] ที่ยังไม่คำนวน', asks)
        // console.log('mark price bid[0] ที่ยังไม่คำนวน', bids)
        return {
          maximumQty,
          defaultLeverage,
          st,
          budget,
          minimum,
          openLongShort,
          valueAskBid
        }
      }
    }
  }
}

module.exports = {
  leverageCal
}
const calMargin = (
  price,
  maximumQty,
  direction,
  getMarkPrice,
  defaultLeverage
) => {
  const bidsAsksCost = (price * maximumQty) / defaultLeverage

  const openloss =
    maximumQty * Math.abs(direction * (0 - (getMarkPrice - price)))

  const openLongShort = bidsAsksCost + openloss

  return { openLongShort, openloss, bidsAsksCost }
}

// debug
// console.log('Margin', budget)
// console.log('Leverage', defaultLeverage)
// console.log('st%', st)
// console.log('asksBids', price)
// console.log('MinimumQty', minimum)
// console.log(
//   'Size Qty Long และ Size Qty Short (ขั้นตอนหา Maximum Qty)',
//   maximumQty
// )
// console.log(
//   'Calculate Margin Long  และ Calculate Margin Short (ขั้นตอนที่ 2)',
//   openLongShort.bidsAsksCost
// )
// console.log(
//   'Calculate Margin Long  และ Calculate Margin Short (ขั้นตอนที่ 3)',
//   openLongShort.openloss
// )
// console.log(
//   'Calculate Margin Long  และ Calculate Margin Short (ขั้นตอนที่ 4)',
//   openLongShort.openLongShort
// )
// console.log('mark price ของฟิวเจอ ', markPrice)
// console.log('mark price spot', getMarkPrice)
// console.log('mark price ask[0] ที่ยังไม่คำนวน', asks)
// console.log('mark price bid[0] ที่ยังไม่คำนวน', bids)
