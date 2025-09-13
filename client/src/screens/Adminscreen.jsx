import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const { TabPane } = Tabs;

function Adminscreen() {
  // useEffect(()=>{
  //    if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
  //        window.location.href ='/home'
  //    }

  // },[])

  return (
    <div className="mt-3 ml-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px"}}>
       Admin Panel
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>

        <TabPane tab="Services" key="2">
          <Services />
        </TabPane>

        <TabPane tab="Add Services" key="3">
          <AddService/>
        </TabPane>

        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default Adminscreen;
//Bookings
export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "https://onboard-app-rgij.onrender.com/api/bookings/getallbookings"
        );

        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Service</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.totalamount}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//Services
export function Services() {
  const [services, setservices] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "https://onboard-app-rgij.onrender.com/api/services/getallservices"
        );

        setservices(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Services</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Service Id</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Cleaners</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {services.length &&
              services.map((service) => {
                return (
                  <tr>
                    <td>{service._id}</td>
                    <td>{service.name}</td>
                    <td>{service.startsat}</td>
                    <td>{service.cleaners}</td>
                    <td>{service.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//Users
export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "https://onboard-app-rgij.onrender.com/api/users/getallusers"
        );

        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//AddService
  
  const schema = yup.object().shape({
  name: yup.string().required("Service name is required"),
  
  startsat: yup.string().required("Start status is required"),  
  cleaners: yup
    .number()
    .typeError("Cleaners must be a number")
    .min(1, "At least 1 cleaner required")
    .required("Cleaners is required"),
  time: yup.string().required("Time is required"),
  phonenumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  imageurl1: yup.string().url("Enter a valid URL").required("Image URL 1 is required"),
  imageurl2: yup.string().url("Enter a valid URL").nullable(),
  imageurl3: yup.string().url("Enter a valid URL").nullable(),
  imageurl4: yup.string().url("Enter a valid URL").nullable(),
  imageurl5: yup.string().url("Enter a valid URL").nullable(),
});

export function AddService(){
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange", // 👈 validate immediately while typing
    });
    const addService = async(data) => {
    try {

    const newservice ={
       name: data.name,
        startsat: data.startsat,
        cleaners: data.cleaners,
        time: data.time,
        phonenumber: data.phonenumber,
        description: data.description,
        imageurls: [
          data.imageurl1,
          data.imageurl2,
          data.imageurl3,
          data.imageurl4,
          data.imageurl5,
        ],
    }
      const result = await axios.post('https://onboard-app-rgij.onrender.com/api/services/addservice',newservice)
      console.log(result.data)
    } catch (error) {
      console.log(error)
      
    }
  }
    return(
          <form onSubmit={handleSubmit(addService)} className="container mt-4">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Service name"
            {...register("name")}
          />
          <p className="text-danger">{errors.name?.message}</p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="startsat"
            {...register("startsat")}
          />
          <p className="text-danger">{errors.startsat?.message}</p>

    

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Cleaners"
            {...register("cleaners")}
          />
          <p className="text-danger">{errors.cleaners?.message}</p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Time"
            {...register("time")}
          />
          <p className="text-danger">{errors.time?.message}</p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Phone number"
            {...register("phonenumber")}
          />
          <p className="text-danger">{errors.phonenumber?.message}</p>

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            rows={3}
            {...register("description")}
          />
          <p className="text-danger">{errors.description?.message}</p>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL 1"
            {...register("imageurl1")}
          />
          <p className="text-danger">{errors.imageurl1?.message}</p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL 2"
            {...register("imageurl2")}
          />
          <p className="text-danger">{errors.imageurl2?.message}</p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL 3"
            {...register("imageurl3")}
          />
          <p className="text-danger">{errors.imageurl3?.message}</p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL 4"
            {...register("imageurl4")}
          />
          <p className="text-danger">{errors.imageurl4?.message}</p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL 5"
            {...register("imageurl5")}
          />
          <p className="text-danger">{errors.imageurl5?.message}</p>
        </div>
      </div>

      <div className="text-right">
        <button className="btn btn-primary mt-3 " type="submit">
          Add Service
        </button>
      </div>
    </form>
       
    )
}

