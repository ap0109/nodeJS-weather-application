const express =  require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forCast = require('./utils/forCast')

console.log(__dirname)
console.log(__filename)

const app =  express()

// Defne paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Amit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a some helpfultext.',
        title: 'Help',
        name: 'Amit'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geoCode(req.query.address,(error,{longitude,latitude,location}={}) => {
        if(error){
            return res.send({ error })
        }
        forCast(longitude,latitude, (error, forCastData) => {
            if(error){
                return res.send({ error })
            }

            return res.send({
                location,
                forCastData,
                address : req.query.address

            })
        })
    }) 
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
}) 

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Amit',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
   res.render('404', {
        title: '404',
        name: 'Amit',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server in up on port 3000')
})