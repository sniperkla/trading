const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Log = new Schema(
  {
    indicator1: { type: String },
    indicator2: { type: String },
    indicator2: { type: String },
    symbol: { type: String },
    trend: { type: String },
    status: { type: String },
    price: { type: String },
    time: { type: Date, default: Date.now },
    binance: { type: Object }
  },

  {
    timestamps: true
  }
)

module.exports = mongoose.model('Log', Log)
