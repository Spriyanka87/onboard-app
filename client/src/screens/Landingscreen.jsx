import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

function Landingscreen() {
  useEffect(() => {
    AOS.init({ duration: 1300 }); // animation duration
  }, []);

  return (
    <div className="row landing justify-content-center">
      <div className="col-md-12 text-center">
        {/* Heading animation */}
        <h2
          style={{ color: "white", fontSize: "100px" }}
          data-aos="fade-down"
        >
          On-Board Services
        </h2>

        {/* Title animation */}
        <h1 style={{ color: "white" }} data-aos="fade-up">
          Reliable cleaning & maintenance solutions at your doorstep.
        </h1>

        <Link to="/home">
          <button
            className="btn landingbtn"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}









export default Landingscreen
