const express = require('express')
const chalk = require('chalk')
const path = require('path')
const hbs = require('hbs')
const getWeatherInfo = require('./utils/getWeatherInfo')

//for deploying app
const port = process.env.PORT || 3000
    //
const app = express()

//path for express config
const viewPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

//to use public static directory
app.use(express.static(publicPath))

//setup handlebars view engine and location of viewa
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('', {
        title: 'Weather',
        body: 'Welcome to Weather app',
        name: 'Parth Shekhaliya'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        body: 'Welcome to about page',
        name: 'Parth Shekhaliya'

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'Welcome to Help',
        name: 'Parth Shekhaliya'
    })

})
app.get('/weather', (req, res) => {

    if (!req.query.location) {
        return res.send({
            error: 'Please provide valid location'
        })
    }

    getWeatherInfo(req.query.location, (error, data = {}) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            locationData: data.city,
            printData: data.print,
            imgData: data.img
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        body: 'Help Page not Found',
        name: 'Parth Shekhaliya'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        body: 'Page not Found',
        name: 'Parth Shekhaliya'
    })
})


app.listen(port, () => {
    console.log(chalk.greenBright.inverse("Server is On !"))
})