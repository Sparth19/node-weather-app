const request = require('request')
const chalk = require('chalk')
const getWeatherInfo = (loc, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7ae2b1a864e71e9615f13656b386087b&query=' + encodeURIComponent(loc)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(("Network connection is not available.."), undefined)
        } else if (response.body.error) {
            callback(("Please provode valid location"), undefined)
        } else {
            const data = response.body
            const sendData = {
                print: data.current.weather_descriptions + ". Temprature is " + data.current.temperature + " but it feels like " + data.current.feelslike + " in " + data.location.name + '-' + data.location.region + '-' + data.location.country + ".",
                city: data.location.name,
                img: data.current.weather_icons
            }
            callback(undefined, sendData)
        }
    })
}

module.exports = getWeatherInfo