import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// 🔹 Validation Schema


async function AddService() {
    const newservice ={
      name,amount,cleaners,time,phonenumber,description,imageurls:[imageurl1,imageurl2,imageurl3,imageurl4,imageurl5]
    }
    try {
      const result = await axios.post('https://onboard-app-rgij.onrender.com/api/services/addservice',newservice)
      console.log(result.data)
    } catch (error) {
      console.log(error)
      
    }





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // 👈 validate immediately while typing
  });

  const addService = (data) => {
    console.log("✅ Form Submitted:", data);
    // here you can call your backend API
  };

  return (
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
            placeholder="amount"
            {...register("amount")}
          />
          <p className="text-danger">{errors.amount?.message}</p>

    

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
        <button className="btn btn-primary mt-3" type="submit">
          Add Service
        </button>
      </div>
    </form>
  );
}
export default AddService
