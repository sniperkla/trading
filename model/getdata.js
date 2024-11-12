const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema(
  {
    symbol: { type: String },
    side: { type: String },
    type: { type: String, default: 'MARKET' },
    status: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Data', Data)
