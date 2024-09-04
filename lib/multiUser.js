const axios = require('axios')

const multiUser = async (URL, body) => {
  await axios.post(URL, body)
}

module.exports = { multiUser }
