import React ,{useState,useEffect}from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader';
import { Suspense } from 'react';
import Error from '../components/Error';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

function Bookingscreen() {
     const{serviceid,date}= useParams();
    
    const[loading,setloading] = useState(true);
    const[error,seterror] = useState();
    const[service,setservice] = useState();
    const[count,setCount] = useState(1);
    const[total,setTotal]=useState(0);

const price = service?.startsat||0;

 useEffect(()=>{
  setTotal(count*price);
 },[count,price]);

    const increase =()=>{
        setCount(count+1);
    };
    const decrease =()=>{
        if(count>1){
        setCount(count-1);
        }
    }
    useEffect(()=>{
 const  fetchData = async () => {

  if(!localStorage.getItem('currentUser')){
    window.location.reload='/login'
  }


  try {
    setloading(true)
  const res = await axios.post('https://onboard-app-rgij.onrender.com/api/services/getservicebyid',{serviceid:serviceid});
    setservice(res.data)
    setloading(false)
  
} catch (error) {
  setloading(false);
  seterror(true);
  console.log("Error fetching service:",error)

}finally{
  setTimeout(()=>
  {setloading(false)},500);
} 
 }
fetchData();
},[serviceid]);

async function bookService(){
  const userWrapper =JSON.parse(localStorage.getItem('currentUser'))
  const currentUser=userWrapper?.data;
  if(!service?.name||!service?._id){
    alert('service is not loaded');
    return;
  }
  const bookingDetails ={
    service:service?.name,
    serviceid:service?._id,
    userid:currentUser?._id,
    date,
    totalamount:total,
  }
    console.log('Booking Detailes:',bookingDetails)

  try {
    const result = await axios.post('https://onboard-app-rgij.onrender.com/api/bookings/bookservice',bookingDetails)
    console.log(result.data)
  } catch (error) {
    console.error("Booking Failed:",error)
  }
Swal.fire({
      title: "Payment Successful 🎉",
      text: "Your booking has been confirmed!",
      icon: "success",
      confirmButtonText: "OK",
    });
} 

  return(
    <div className='m-5'>
    
      {loading ? (<Loader/>) : service ? (<div>
       <div className="row justify-content-center mt-5 bs">
        <div className="col-md-6">
          <h1>{service.name}</h1>
          <img src = {service.imageurls[0]} className="bigimg"/>
        </div>
          <div className="col-md-6">
          <div  style = {{textAlign:'right'}}>
          <h1>Booking Details</h1>
          <hr/>
          <b>
          <p>Name: {JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
          <p>Date: {date}</p>
          </b>
          </div>

          <div  style = {{textAlign:'right'}}>
          <b>
          <h1>Amount</h1> 
          <hr/>
          <p> Service : {service.name}</p> 
          <p>Amount per one service : ₹ {price}</p>
          <p><strong>Total Amount : ₹ {total} </strong></p>

           <div style={{textAlign:'right',gap:'10px'}}>
        <button onClick={decrease}>-</button>
        <span style={{margin:'0 10px'}}>{count}</span>
        <button onClick={increase}>+</button>
    </div><br/>

          </b>
          </div>

          <div  style = {{float:'right'}}>
          
          <button className='btn btn-primary'onClick={bookService} disabled={!service?.name}>Pay Now</button>
          </div>

        </div>
       </div>
      
      </div>) : (<Error/>)} 
    </div>
  );
}
export default Bookingscreen;
