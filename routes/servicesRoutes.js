const express = require("express");
const router = express.Router();


const homeclean = require('../models/homeclean');

router.get("/getallservices", async(req,res)=>{
    try{ 
    
    const services = await homeclean.find({});
    
     res.send(services);
    } catch(error){
        
        return res.status(500).json({message:error})
    }

});

router.post("/getservicebyid", async(req,res)=>{
  const {serviceid} = req.body
    try{ 
  
    const services = await homeclean.findOne({_id:serviceid});
    
     res.send(services);
    } catch(error){
        
        return res.status(500).json({message:error})
    }

});

router.post("/addservice",async(req,res)=>{
    try {
        const newservice = new homeclean(req.body)
        await newservice.save()
        res.send('New Service Added Successfully')
    } catch (error) {
        return res.status(400).json({error})
        
    }
})


module.exports = router;