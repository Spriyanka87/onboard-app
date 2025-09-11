import React from 'react'

function Error({message}) {
  return (
    <div>
        <div class="alert alert-danger" role="alert">
         <div>{message}</div>
</div>

      
    </div>
  )
}

export default Error
