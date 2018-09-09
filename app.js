require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const routes = require('./routes/')
const app = express()
const db = mongoose.connection

mongoose.connect('mongodb://minzard:minzard1@ds249992.mlab.com:49992/to-do-fancy')
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(){
    console.log(`Database connected`)
})

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use('/',routes)


app.listen(3000, ()=>{
    console.log(`http://localhost:3000/`)
})

// mlab.com