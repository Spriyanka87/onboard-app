const express=require('express');
const cors = require('cors');
const app = express();
const dbConfig = require('./db')
const servicesRoutes = require('./routes/servicesRoutes')
const dotenv = require("dotenv").config();
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const subscriptionRoute = require('./routes/subscriptionRoute')

 
app.use(cors({
origin:"https://onboard-services-rdr.netlify.app",
methods:["GET","POST","PUT","DELETE"],
credentials:true



}));





app.use(express.json());

app.use('/api/services', servicesRoutes)

app.use('/api/users',usersRoute)

app.use('/api/bookings',bookingsRoute)

app.use('/api',subscriptionRoute)

const port = process.env.PORT || 5000

app.listen(port,()=>
    console.log(`Server running on port ${port}`));