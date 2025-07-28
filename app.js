const express = require('express')
const app = express()
require('dotenv').config()
const port = 5800
const cors = require('cors')
const { Telegraf, Markup } = require('telegraf')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const connectionString = `${process.env.DB}` + `${process.env.NAME}`
const fs = require('fs')
const path = require('path')
console.log('connectionString', connectionString)
mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

const BOT_TOKEN = '8342141580:AAE75-B-3IwhRXBFPCn8TY5Sq5KTvbw1Wpo'
const bot = new Telegraf(BOT_TOKEN)
// /start command → send greeting + keyboard
bot.start((ctx) => {
  ctx.replyWithPhoto(
    { source: fs.createReadStream(path.join(__dirname, 'images/promo.png')) },
    {
      caption: '👋 Welcome to our bot!\n🍣 Enjoy our Sushi Promotion 30% OFF!',
      reply_markup: {
        keyboard: [['📢 Promotions', '📞 Contact'], ['ℹ️ About Us']],
        resize_keyboard: true
      }
    }
  )
})

// Handle keyboard clicks
bot.hears('📢 Promotions', async (ctx) => {
  // 1️⃣ Image + Caption
  await ctx.replyWithPhoto(
    { source: fs.createReadStream(path.join(__dirname, 'images/promo1.png')) },
    {
      caption: '1️⃣ register',
      parse_mode: 'Markdown'
    }
  )

  // 2️⃣ Just text
  await ctx.reply('2️⃣ start trading 🇯🇵')

  // 3️⃣ Another image + caption
  await ctx.replyWithPhoto(
    { source: fs.createReadStream(path.join(__dirname, 'images/promo2.png')) },
    {
      caption: '3️⃣ money',
      parse_mode: 'Markdown'
    }
  )
})
bot.hears('📞 Contact', (ctx) =>
  ctx.reply('📞 Call us at +66 1234 5678\n📍 Visit Uoteru Kohkeaw')
)
bot.hears('ℹ️ About Us', (ctx) =>
  ctx.replyWithPhoto(
    { source: fs.createReadStream(path.join(__dirname, 'images/promo.png')) },
    {
      caption:
        '🍣 We are Uoteru Kohkeaw!\nAuthentic Japanese restaurant in Phuket 🇯🇵🌴'
    }
  )
)

bot.launch()
console.log('✅ Bot is running...')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
