const mongoose = require('mongoose')
const Schema = mongoose.Schema



const account = new Schema(
  {
    user: { type: String },
    licenes: { type: String },
    expireDate: { type: Date },
    expireDateThai: { type: String }, // e.g. "01/12/2568"
    status: { type: String, default: 'valid' }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('account', account)
