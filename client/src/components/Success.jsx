import React from 'react'
import { Link } from "react-router-dom";

function success({message}) {
  return (
    <div>
        <div class="alert alert-success" role="alert">
        {message}
</div>
      
    </div>
  )
}

export default success
