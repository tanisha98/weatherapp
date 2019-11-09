const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT||3000 //heroku port
const hbs= require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
// Define paths for Express config
const directoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

// Setup handlerbars engine and  views location
app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(directoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'Tanisha Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name : 'Tanisha Singh'
    })
})

app.get('',(req,res)=>{  //(route,function:what to send back:request,respond)
res.send('Hello express!')

})
// app.get('',(req,res)=>{
//     // res.send({
//     //     name:'andrew',  SINGLE OBJECT
//     //     age:21
//     // })

//      res.send([{
//          name :'tani' //MULTIPLE OBJECTS
//      },{
//          name: 'sarah'
//      }])
// })

// app.get('',(req,res)=>{
//     res.send('<h1>ABOUT</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: " Please provide an address"
        })
        
    }
  
    geocode(req.query.address,(error ,{latitude,longitude,location}={})=>{
        if(error){
          return  res.send({error})
        }
      
      forecast(latitude, longitude, (error , fdata) => {
        if(error){
          return  res.send({error})
        }
      
      res.send({
          forecast : fdata,
          location,
          address: req.query.address
      })
       
      })
      })

})
app.get('/products',(req,res)=>{

    if(!req.query.search){
return res.send({
    error: " You must provide a search"
})

    }
    console.log(req.query)
    res.send({
       product:[]
    })
})
// app.get('/help/*',(req,res)=>{
//     res.render('404',{
//         title:'404',
//         name : 'Tanisha Singh',
//         error: 'Help article not found'
//     })
//     })


app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name : 'Tanisha Singh',
    error: 'Page not found'
})
})
app.listen(port, ()=>{     //start up server:IMP
    console.log("server is up on port"+port)
})