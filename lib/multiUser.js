const axios = require('axios')

const multiUser = async (URL, body) => {
  try {
    const response = await axios.post(URL, body)
    console.log('url', URL)
    return response.data
    // Log the API response
  } catch (error) {
    return error.response
  }
}

module.exports = { multiUser }
