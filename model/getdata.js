const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema(
  {
    symbol: { type: Number, default: 0 },
    side: { type: String }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Data', Data)
