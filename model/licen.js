const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Setting = new Schema(
  {
    account: { type: String },
    licence: { type: String },
    expire: { type: String }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('Setting', Setting)
