const axios = require('axios')

const postLineNotify = async (buyit, type, status) => {
  const url = 'https://notify-api.line.me/api/notify'
  const accessToken = 'F7a8pS8pvY12WuFggDpsE589qiIAUvk4Sqs2S3ynvy0'
  let message = null

  if (buyit.text === 'buy') {
    message = whenBuy(buyit)
    // } else if (typeof buyit === 'string' && buyit === 'stoploss') {
    //   message = whenStopLoss(buyit)
    // }
  } else if (buyit.text === 'updatestoploss') {
    message = whenUpdateStopLoss(buyit)
  } else if (buyit.text === 'stoplossfirst') {
    message = whenStopLossFirst(buyit)
  } else if (buyit.text === 'takeprofit') {
    message = whenTakeProfit(buyit)
  } else if (buyit.text === 'error') {
    message = whenError(buyit)
  } else if (buyit.text === 'checkstoploss') {
    message = whenCheckStopLoss(buyit)
  } else {
    message = whenMarketTrigger(buyit)
  }

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
    .then(() => {})

    .catch((error) => {
      console.log(error)
    })
}
module.exports = {
  postLineNotify
}

const whenBuy = (buyit) => {
  message = `\n--------------\n${buyit.text2}\n--------------\nชื่อเหรียญ: ${buyit.symbol}\nจำนวน: ${buyit.quantity}\nSide order : ${buyit.side}\nleverage: ${buyit.leverage}\nMark Price Future : ${buyit.valueAskBid}\nงบลงทุน: ${buyit.budget}\nซื้อเหรียญขั้นต่ำ: ${buyit.minimum}\nPosition Open: ${buyit.openLongShort}\nSL%: ${buyit.st}% , ${buyit.stopPriceCal}\nTP: ${buyit.takeProfit}\nเงินคงเหลือ: ${buyit.defaultMargin} `
  return message
}

const whenError = (buyit) => {
  message = `\nยกเลิกคำสั่งซื้อ เหรียญ: ${buyit.symbol}\nError from ${buyit.type} : ${buyit.msg}`
  return message
}

const whenUpdateStopLoss = (buyit) => {
  message = `${buyit.msg}`
  return message
}
const whenStopLossFirst = (buyit) => {
  message = `${buyit.msg}`
  return message
}

const whenMarketTrigger = (buyit) => {
  if (buyit.type === 'MARKET') {
    message = `\n--------------\nMARKET\n--------------\nsymbol: ${buyit.symbol}\ntype: ${buyit.type}\nside: ${buyit.side}\ntime: ${buyit.time}\n***********\nTakeProfit\n***********\ntype: ${buyit.takeProfit.type} \nside: ${buyit.takeProfit.side}\nsymbol: ${buyit.takeProfit.symbol}\nprice: ${buyit.takeProfit.takeprofit}`
  } else if (buyit.type === 'STOP_MARKET')
    message = `\n--------------\nSTOPLOSS\n--------------\nsymbol: ${buyit.symbol}\ntype: ${buyit.type}\nside: ${buyit.side}\nprice: ${buyit.price}\nstopPrice: ${buyit.stopPrice}\n time: ${buyit.time}`

  return message
}
const whenTakeProfit = (buyit) => {
  message = `${buyit.msg}`
  return message
}

const whenCheckStopLoss = (buyit) => {
  message = `เหรียญ ${buyit.symbol} ${buyit.msg}`
  return message
}
