const request  = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url ="https://api.darksky.net/forecast/84f2f82ff0d430f632b9bfcb9cf9fb56/" + latitude + "," + longitude
    request( {url,json:true },(error,{body})=>{
    if(error){
        callback('Unable to connect to location services',undefined)
    }else if(body.error){
       callback('Unable to find location',undefined)
    }else{
        callback(undefined, body.daily.data[0].summary + ' It is ' + body.currently.temperature + ' degree out. Threre is a ' + body.currently.precipProbability + '% chances of rain'
        )
    }
    })
    
    }
    module.exports = forecast