const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Trading = new Schema(
  {
    signal: { type: String },
    symbol: { type: String },
    trend: { type: String },
    price: { type: String },
    time: { type: Date, default: Date.now },
    status: { type: Boolean }
  },

  {
    timestamps: true
  }
)

module.exports = mongoose.model('Trading', Trading)
