const geo = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaW1hbWFkeWFuIiwiYSI6ImNrM3A0ZjJrNzA4Z2Qzbm1pZnJxdGdwdzYifQ._25L_XM4ju8uokeyeTKfbw&limit=1'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback(chalk.red.inverse('Unable to connect to Geolocation service'), undefined)
        } else if (body.features.length === 0) {
            callback(chalk.red.inverse('Unable to find location. Try others.'), undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geo