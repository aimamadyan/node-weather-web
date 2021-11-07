const request = require('request')
const chalk = require('chalk')

const weather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3d88d8acbaff51e8e2f93bc007d8f04&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callbackg(chalk.inverse.red('Unable to connect to Weather service'), undefined)
        } else if (body.error) {
            callback(chalk.redBright.inverse(body.error.info), undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently '
                    + body.current.temperature + ' degress out. It feels like '
                    + body.current.feelslike + ' degress out')
        }
    })
}

module.exports = weather