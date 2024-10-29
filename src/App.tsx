import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Home from '../src/pages/Home';
import Gallery from './pages/Gallery';
import Reviews from './pages/Testimonial';
import logo from './assets/logo.png';

import './App.css';



const App = () => {
  return(
    <>
  <Router>
      <Navbar logo={logo} />
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
