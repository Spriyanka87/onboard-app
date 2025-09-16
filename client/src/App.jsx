

import './App.css'
import Navbar from './components/Navbar'
import{BrowserRouter , Route , Link, Routes,HashRouter as Router} from 'react-router-dom'
import Homescreen from './screens/Homescreen'
import Bookingscreen from './screens/Bookingscreen' 
import Registerscreen from './screens/Registerscreen'
import Loginscreen from './screens/Loginscreen'
import SubscriptionScreen from './screens/Subscriptionscreen'
import Footer from './components/Footer'
import Profilescreen from './screens/Profilescreen'
//import Adminscreen from './screens/Adminscreen'
import Landingscreen from './screens/Landingscreen'
import Addservicescreen from './screens/Addservicescreen'
import Admin from '../../admin/Admin'
import { Link } from "react-router-dom";
function App() {
  

  return (
    
      <div className="App">
        <Navbar/>
        <BrowserRouter>
        <Routes>
        <Route path="/home"  element={<Homescreen/>}/>
        <Route path="/book/:serviceid/:date" element={<Bookingscreen/>}/>
        <Route path='/register' element={<Registerscreen/>}/>
        <Route path="/login" element={<Loginscreen/>}/>
        <Route path="/subscriptions" element={<SubscriptionScreen/>}/>
        <Route path ="/profile" element={<Profilescreen/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/" element={<Landingscreen/>}/>
        <Route path="/addservice" element={<Addservicescreen/>}/>
        </Routes>
        
        </BrowserRouter>
         <Footer/>
      
        
        

      </div>
      
    
  )
}

export default App
