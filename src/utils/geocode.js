const request = require('request')
const log = console.log
const mapboxKey = 'pk.eyJ1IjoiaGFuZ3J5cGFuZGEiLCJhIjoiY2o4bzdxN3BiMDBidzJ3bnR0NXVnaGhoZiJ9.QzJ4mM5vo4WWydbsCsFbiw'
var location = 'salt lake'

const geocode = (location, callback) => {
    const geoLocatorURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token='+mapboxKey

    request({
        url: geoLocatorURL,
        json: true
    }, (error, response) => {
        if (error) {
            log("Error occurred.")
        } else {
            const feature = response.body.features[0]
            coordinates = feature.geometry.coordinates
            const long = coordinates[0]
            const lat = coordinates[1]
            const name = feature.place_name
            callback({
                lat: lat,
                long: long,
                name: name
            })
        }
    })
}

module.exports = geocode
