//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const darkSkyKey = 'cccfa76ef538041766aa78991c30dbca'
const request = require('request')


const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/' + darkSkyKey + '/'+lat+','+long+'?units=si'

  request({
    url: url,
    json: true
}, (error, response) => {
    if (error) {
        callback("Error occurred.", undefined)
    } else if (response.body.error) {
      callback('Response returned, but error occored.', undefined)
    } else {
      callback(undefined, {
        Temperature: response.body.currently.temperature,
        Percipatation: response.body.currently.precipProbability,
        Summary: response.body.currently.summary
      })
    }

})

}

module.exports = forecast