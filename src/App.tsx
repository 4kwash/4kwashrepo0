import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '@components/Navbar';
import Services from '@components/Services';
import ServiceDetail from '@components/ServiceDetail';
import Home from '@components/Home';
import Gallery from '@components/Gallery';
import Reviews from '@components/Testimonial';


import './App.css';
import './responsive.css'



const App = () => {
  return(
    <>
  <Router>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/service" element={<Services />} />
        <Route path="/services/:serviceid" element={<ServiceDetail />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
    </>
  )
}
export default App;
