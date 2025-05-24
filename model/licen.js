const mongoose = require('mongoose')
const Schema = mongoose.Schema

const account = new Schema(
  {
    user: { type: String },
    licenes: { type: String }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('account', account)
