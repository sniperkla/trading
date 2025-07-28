const express = require('express')
const app = express()
require('dotenv').config()

const port = 5800
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const connectionString = `${process.env.DB}` + `${process.env.NAME}`

console.log('connectionString', connectionString)
mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

import { Telegraf, Markup } from 'telegraf'

const BOT_TOKEN = '8342141580:AAE75-B-3IwhRXBFPCn8TY5Sq5KTvbw1Wpo'
const bot = new Telegraf(BOT_TOKEN)

// /start command → send greeting + keyboard
bot.start((ctx) => {
  ctx.reply(
    `👋 Welcome to My Bot!\n\nI can help you with:\n✅ Promotions\n✅ Contact info\n✅ About us`,
    Markup.keyboard([['📢 Promotions', '📞 Contact'], ['ℹ️ About Us']]).resize() // auto resize keyboard
  )
})

// Handle keyboard clicks
bot.hears('📢 Promotions', (ctx) =>
  ctx.reply(
    '🔥 Current promotions:\n- Sushi 30% OFF\n- Free drink on weekends!'
  )
)
bot.hears('📞 Contact', (ctx) =>
  ctx.reply('📞 Call us at +66 1234 5678\n📍 Visit Uoteru Kohkeaw')
)
bot.hears('ℹ️ About Us', (ctx) =>
  ctx.reply(
    '🍣 We are Uoteru Kohkeaw, authentic Japanese restaurant in Phuket!'
  )
)

bot.launch()
console.log('✅ Bot is running...')

// app.post('/license_api', async (req, res) => {
//   try {
//     const { account, licenes } = req.body
//     console.log('account', account)
//     console.log('licenes', licenes)

//     const checkAccount = await licen.findOne({
//       user: account,
//       licenes: licenes
//     })
//     if (checkAccount) {
//       return res.status(HTTPStatus.OK).json({ status: 'valid' })
//     } else return res.status(HTTPStatus.OK).json({ status: 'invalid' })
//   } catch (error) {
//     return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
//       error: error
//     })
//   }
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
