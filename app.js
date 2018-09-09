require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/')
const app = express()
const db = mongoose.connection
const port = process.env.PORT || 3000

mongoose.connect('mongodb://minzard:minzard1@ds249992.mlab.com:49992/to-do-fancy')
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(){
    console.log(`Database connected`)
})

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/',routes)


app.listen(port, ()=>{
    console.log(`running at port: ${port}`)
})
