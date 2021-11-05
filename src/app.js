const path = require('path')
const express = require('express')
const hbs = require('hbs')

const  geo = require('./utils/geo')
const weather = require('./utils/weather')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ahmad Imamadyan'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Weather App',
        name: 'Ahmad Imamadyan'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'Help Page',
        message: 'This is help page',
        name: 'Ahmad Imamadyan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'Please provide location/address'
        })
    }

    geo(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send ({error})
        }

        weather(latitude, longitude, (error, dataWeather) => {
            if (error) {
                return res.send ({error})
            }

            res.send ({
                address: req.query.address,
                forecast: dataWeather,
                location: location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Help article not found',
        name: 'Ahmad Imamadyan'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Ahmad Imamadyan'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})