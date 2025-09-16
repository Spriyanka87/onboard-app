import React,{useState,useEffect} from 'react'

import { useNavigate } from "react-router-dom";

import axios from 'axios';
import Services from '../components/Services';
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/reset.css';
import moment from 'moment';
import { DatePicker, Space} from 'antd';
const onChange = (date, dateString) => {
  console.log(date,dateString);
}


function Homescreen() {

   const navigate = useNavigate();

const[services,setservices] = useState([])
const[loading,setloading] = useState()
const[error,seterror] = useState()
const[dateTime,setdateTime] = useState()
const[duplicateservices,setduplicateservices]=useState([]);

useEffect(()=>{
 const  fetchData = async () => {
  try {
    setloading(true)
  const res = await axios.get('https://onboard-app-rgij.onrender.com/api/services/getallservices');
    setservices(res.data)
    setloading(false)
  
} catch (error) {

  seterror(true)
  console.log(error)
  setloading(false)
}
 }

fetchData();

},[]);
const filterByDate =(date,dateString)=>
{
  setdateTime(dateString);
  console.log("Date &Time:",dateString);
}
  return (

    <div className="container">

<div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Welcome to On-Board Services</h2>
      <p>Fast & Reliable Toilet Cleaning Monthly Subscription</p>

      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "15px 25px",
          fontSize: "18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/subscriptions")}
      >
        Subscribe Now
      </button>
    </div>
      <div className='row justify-content-center mt-3'>
    
        <div className="col-md-3 datepicker ">
        <div style={{ textAlign: "center", padding: "3px" ,color:"white"}}><h2>Booking Dates</h2></div>
          <div style={{textAlign:"center",padding:"2px"}}>
            <DatePicker showTime={{use12Hours:true,format:'hh:mm A'}}format='DD-MM-YYYY hh:mm A' onChange={filterByDate}/> 
          </div>
        </div>

      </div>
       <div className = "row justify-content-center mt-3">

         {loading ? (<Loader/>) : services.length>1 ? (services.map(services=>{
          return <div className="col-md-9 mt-3">
            <Services services={services} date={dateTime}/>
            </div>;
        })
         ) :(
         <Error/>
        )}
    
       </div>
     
    </div>
  )
}

export default Homescreen
