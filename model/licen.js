const mongoose = require('mongoose')
const Schema = mongoose.Schema

const account = new Schema(
  {
    user: { type: String },
    licenes: { type: String },
    expireDate: { type: String },
    status: { type: String, default: 'valid' }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('account', account)
