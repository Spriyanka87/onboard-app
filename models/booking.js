const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
    service : {
        type: String,
        required:true
    },
    serviceid : {
        type: String,
        required:true
    },
    userid : {
        type : String,
        required : true
    },
    date :{
        type : String,
        required : true
    },
    totalamount : {
        type : Number,
        required : true
    }, 
    transactionId :{
        type : String,
        required : true
    },
    status : {
        type: String,
        enum:["booked","cancelled"],
        required : true,
        default : 'booked'
    }
},{
    timestamps : true,
})
const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;