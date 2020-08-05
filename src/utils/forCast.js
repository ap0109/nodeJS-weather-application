const request = require('request')

const forCast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=32724231f361dd512fdd8f6b2ec27bc3&query="+ longitude +","+ latitude +"&units=f";
    setTimeout(() => {
        request({url, json : true}, (error, {body}) => {
            debugger
            if(error){
                callback('Unable to connect weather services', undefined)
            } else if(body.error){
                callback('Unable to find location', undefined)
            }else{
                callback(undefined, body.current.weather_descriptions[0]+'. It is currently ' 
                + body.current.temperature + ' degree out there. It feels like '+ body.current.feelslike + ' degree out.'
                 +' The humidity is '+  body.current.humidity + '%.')
            }
        })
    })
}

module.exports = forCast