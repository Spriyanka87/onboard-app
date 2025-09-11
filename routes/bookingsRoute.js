const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const homeclean = require("../models/homeclean");

router.post("/bookservice", async (req, res) => {
  const { service, serviceid, userid, date, totalamount } = req.body;

  console.log("data:", req.body);

  try {
    const newBooking = new Booking({
      service: service,
      serviceid: serviceid,
      userid: userid,
      date: date,
      totalamount: totalamount,
      transactionId: "1234",
    });
    const booking = await newBooking.save();

    const homecleantemp = await homeclean.findOne({_id:serviceid });
    if(!homecleantemp){
        return res.status(404).json({error:"Service not found"})
    }

    homecleantemp.currentbookings.push({
      bookingid: booking._id,
      date: date,
      userid: userid,
      status: booking.status,
    });

    await homecleantemp.save();

    console.log("Received Booking ", booking);
    res.status(201).json({ msg: "Booking Successfully", booking: booking });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/getbookingsbyuserid',async(req,res)=>{


  try{
    const {userid} = req.body.userid
    const bookings = await Booking.find({userId:userid})
    res.send(bookings)
  } catch(error){ 
    return res.status(400).json({error})

  }

})

router.post("/cancelbooking",async(req,res)=>{
  const{bookingid,serviceid} =req.body
  try {
    const booking = await Booking.findOne({_id :bookingid})
    booking.status = 'cancelled'
    await booking.save()
    const service = await homeclean.findOne({_id:serviceid})
    const bookings = service.currentbookings
    const temp = bookings.filter(booking=> booking.bookingid.toString()!==bookingid)
    service.currentbookings = temp


    await service.save()
    res.send('Your booking cancelled successfully')
  } catch (error) {
    return res.status(400).json({error})
    
  }
})

router.get("/getallbookings",async(req,res)=>{
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({error})
    
  }
})


module.exports = router;
