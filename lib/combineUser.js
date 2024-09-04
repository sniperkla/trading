require('dotenv').config()

const combineUser = (body) => {
  const URL = process.env.URL.split(',')
  const RealURL = []
  if (body.version) {
    RealURL = URL.filter((item) => {
      return item.includes('STP')
    })
  } else
    RealURL = URL.filter((item) => {
      return item.includes('BTP')
    })

    console.log("real url should be btpsmcp",RealURL)

  const combine = { URL: RealURL }

  return combine
}

module.exports = { combineUser }
