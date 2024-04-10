const axios = require('axios')
const url = require('./combineUser')

const multiUser = async (body) => {
  const urls = url.combineUser()

  for (let i = 0; i < urls.URL.length; i++)
    try {
      const response = await axios.post(urls.URL[i], body)
      return response.data
      // Log the API response
    } catch (error) {
      return error.response
    }
}

module.exports = { multiUser }
