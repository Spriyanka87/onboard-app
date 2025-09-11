const mongoose = require('mongoose');
require('dotenv').config();


var mongoURL = 'mongodb+srv://udayasajjanapu:mohnish@cluster0.nag71vn.mongodb.net/sameera'

mongoose.connect(mongoURL ,{useUnifiedTopology : true , useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error',()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected',()=>{
    console.log('Mongo DB Connected Successfully In NodeJS')
})
 

module.exports = mongoose
