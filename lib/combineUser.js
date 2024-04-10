require('dotenv').config()

const combineUser = () => {
  const URL = process.env.URL.split(',')

  const combine = { URL: URL }

  return combine
}

module.exports = { combineUser }
