const mongoose = require("mongoose");


const homecleanSchema = mongoose.Schema({
    name:{
        type: String ,
        required:true
    },
    startsat : {
        type :  String,
        required : false
    
    },
    cleaners : {
        type : Number,
        required : true
    },
    phonenumber : {
        type : String,
        required : false
    },
    imageurls : [],
    currentbookings : [] ,
    description : {
        type : String,
        required : true
    },
    amount : {
        type : String,
        required : false
    },
    time : {
        type: String,
        required : true
    }


})
const homecleanModel = mongoose.model('services' , homecleanSchema)

module.exports = homecleanModel
