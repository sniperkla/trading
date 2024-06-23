const axios = require('axios')

const multiUser = async (URL, body) => {
  try {
    const response = await axios.post(URL, body)

    console.log('response', response.data)
    return response.data
  } catch (error) {
    return error.response
  }
}

module.exports = { multiUser }
