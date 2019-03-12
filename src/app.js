const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const log = console.log

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory))

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Hui Zheng'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App/About',
        author: 'Hui Zheng'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App/Help',
        author: 'Hui Zheng'
    })
})

app.get('/weather', (req, res) => {
    log(req.query)
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search tearm.'
        })
    }
    geocode(req.query.address,({lat, long, name}) => {
        forecast(lat, long, (error, response)=> {
            if (error) {
                return res.send(error)
            }
            response.name = name
            log(response)
            return res.send(response)
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {

    })
})


app.listen(3000,() => {
    console.log('Server is up and running at 3000.')
})