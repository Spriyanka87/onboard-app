import React ,{useState} from "react";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";

function Loader() {
  let [loading, setLoading] = useState(true);
  
  return (
<div style={{merginTop:'150px'}}>
    <div className="d-flex justify-content-center align-items-center">
      <HashLoader color='purple' loading={loading}  size={100}  speedMultiplier={2}/>
    </div>
    </div>
  );
}

export default Loader;
