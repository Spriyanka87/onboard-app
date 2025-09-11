import React,{useState} from 'react'
import {Modal,Button,Carousel} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Services({services,date}) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div className = 'row bs'>
      <div className = "col-md-4 mt-3 ">
      <img src= {services.imageurls[0]} className='smallimg'/>
    </div>
    <div className = 'col-md-7 '>
    
      
      <h4>{services.name}</h4>
      <p> <b>Amount</b> : ₹{services.startsat}</p>
      <p> <b>Time</b> :{services.time}</p>
      <p><b>Cleaners</b> : {services.cleaners} </p>
      
      
      <p><b>Phonenumber</b> : {services.phonenumber}</p>
      <div style={{float:'right'}}>
        <Link to={`/book/${services._id}/${date}`}>

          <button className='btn btn-primary m-2 '>Book Now</button>
        
        </Link>
        <button className="btn btn-primary" onClick={handleShow}>View Details </button>
      </div>
    </div>
 

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{services.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
    <Carousel>
      {services.imageurls.map(url=>{
        return <Carousel.Item>
          <img
           className="d-block w-100 bigimg"
           src = {url}
          />
        </Carousel.Item>
      })}
        
    </Carousel>
    <p>{services.description}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Services
