import React, { useEffect, useState } from "react";
import { Tabs, Tag } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const { TabPane } = Tabs;

function Profilescreen() {



  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (e) {
      return null;
    }
  })();

  useEffect(() => {
    if (!user) {
    
      window.location.href = "/login";
    }
  }, [user]);

  return (
    
    <div className="ml-3 mt-3  text-center bs">
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user?.data?.name ?? "-"}</h1>
          <h1>Email: {user?.data?.email ?? "-"}</h1>
          <h1>isAdmin: {user?.data?.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>

        <TabPane tab="CurrentBookings" key="2">
          <MyBookings/>
        </TabPane>
      </Tabs>
      
    </div>
  
  );
}

export default Profilescreen;

export function MyBookings() {

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (e) {
      return null;
    }
  })();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchBookings = async () => {
      if (!user?.data?._id) {
        if (mounted) setError("User not found. Please login.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await axios.post(
          "https://onboard-app-rgij.onrender.com/api/bookings/getbookingsbyuserid/",
          { userid: user.data._id }
        );
        if (Array.isArray(res.data)) {
          if (mounted) setBookings(res.data);
        } else if (Array.isArray(res.data.data)) {
          if (mounted) setBookings(res.data.data);
        } else if (Array.isArray(res.data.bookings)) {
          if (mounted) setBookings(res.data.bookings);
        } else {
        
          if (mounted) setBookings([]);
        }
      } catch (err) {
        console.error(err);
        if (mounted)
          setError(
            err.response?.data?.message || err.message || "Failed to load bookings"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBookings();

    return () => {
      mounted = false;
    };

  }, []);

 
  async function cancelBooking(bookingid,serviceid){
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes, cancel it!",
      
    });

    if (loading) return <Loader />;
  if (error) return <Error message={error} />;

    try {
      setLoading(true)
      const result = await axios.post("https://onboard-app-rgij.onrender.com/api/bookings/cancelbooking",{bookingid,serviceid})
      console.log(result.data)

     setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingid ? { ...b, status: "cancelled" } : b
        )
      );

      Swal.fire({
          title: "Cancelled",
          text: "Your booking has been cancelled successfully.",
          icon: "success",
          confirmButtonText: "OK"
        })
    } catch (error) {
      console.log(error)

      Swal.fire({
          title: "Error",
          text: "Something went wrong while cancelling.",
          icon: "error",
          confirmButtonText: "OK"
        });

      
    }
  }

  return (
    <div className= ' row justify-content-center'>
    <div className="mt-3 col-md-7 " style={{textAlign:'center',marginBottom:'10px'}}>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id ?? booking.id} className="bs" style={{ marginBottom: 12 }}>
            <h3>{booking.service ?? booking.name ?? "Service name"}</h3>
            <p><b>BookingID:</b> {booking._id ?? booking._id}</p>
            <p><b>Date:</b> {booking.date ?? booking.createdAt ?? "N/A"}</p>
            <p><b>Amount:</b> {booking.totalamount ?? booking.totalamount}</p>
            <p><b>Status: </b>{""}
  {booking.status=='cancelled'?(<Tag color="red">CANCELLED</Tag>):(<Tag color="green">CONFIRMED</Tag>)}
</p>


  {booking.status!=='cancelled'&& (<div className="text-right">
  <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.serviceid)}}>CANCEL BOOKING</button>
   </div>)}
            
  </div>
        ))
      )}
    </div>
    </div>
  );
}

