require('dotenv').config()

const combineUser = () => {
  const URL = process.env.URL.split(',')
  // if (body?.version) {
  //   RealURL = URL.filter((item) => {
  //     return item.includes('STP')
  //   })
  // } else
  //   RealURL = URL.filter((item) => {
  //     return item.includes('BTP')
  //   })

  // console.log('real url should be ', RealURL)

  const combine = { URL: URL }

  return combine
}

module.exports = { combineUser }
