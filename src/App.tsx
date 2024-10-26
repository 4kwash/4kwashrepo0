import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Home from '../src/pages/Home';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import logo from './assets/logo.png';

import './App.css';



const App = () => {
  return(
    <>
  <Router>
      <Navbar logo={logo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/services/:serviceid" element={<ServiceDetail />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
    </>
  )
}
export default App;
