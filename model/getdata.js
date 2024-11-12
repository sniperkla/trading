const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema(
  {
    symbol: { type: String },
    side: { type: String },
    type: { type: String, default: 'MARKET' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Data', Data)
