import React, { useEffect } from 'react';
import AOS from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // AOS styles
import { FaArrowRight } from 'react-icons/fa';

import backgroundImage from '../assets/darkenedbg.png';
import VehicleForm from '../components/VehicleInquiry';
import Footer from '../components/Footer';
// import ServiceCardSlider from '../components/ServiceCardSlider';
import LocationAndMission from '../components/LocationAndMission';
import { ImgComparisonSlider } from '@img-comparison-slider/react';


import beforeImage from '../assets/before.jpg';
import afterImage from '../assets/after.jpg';


import '../css/styles.css';
import '../css/MediaQuery.css'


const Home: React.FC = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const sectionStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        minHeight: '100vh', // Ensure section covers the viewport height
        display: 'flex',
        justifyContent: 'center', // Align header and form side-by-side in center
        alignItems: 'center',
        gap: '20%',
        padding: '0 50px',
        boxSizing: 'border-box',
        
    };

    const headerStyle: React.CSSProperties = {
        color: 'white',
        textAlign: 'left',
        maxWidth: '400px',
    };

    const formContainerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '10px',
        
    };

    return (
        <div className="home-container">
            <section style={sectionStyle} className='section-style'>
                {/* Header Section with AOS */}
                <div style={headerStyle} data-aos="fade-right" className='aos-init'>
                    <h1>Welcome to Our Detailing Service</h1>
                    <p id='greeting'>
                        Experience the ultimate car care with our professional detailing
                        services. We provide top-notch exterior washes, interior cleaning,
                        engine detailing, and ceramic coatings to keep your car looking
                        brand new.
                    </p>
                </div>

                {/* Form Section with AOS */}
                <div style={formContainerStyle} data-aos="fade-left">
                    <h2 style={{ color: 'white', textAlign: 'center' }}>Vehicle Inquiry</h2>
                    <VehicleForm />
                </div>
            </section>

            {/* Service Slider with AOS */}
            {/* <div data-aos="fade-in">
                <ServiceCardSlider />
            </div> */}

            <div data-aos="fade-in" className='before-after slider'>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h1>See Our Work</h1>
                    <p>We take pride in delivering quality results</p>
                    <p>Drag Image Slider</p>
                    <FaArrowRight className='icon' />
                </div>

                <ImgComparisonSlider data-aos="fade-left" style={{ width: '50%', height: '600px', borderRadius: '50px', marginTop: '200px' }} id='image-slider'>
                    <img slot='second' src={beforeImage} />
                    <img slot='first' src={afterImage} />
                    
                </ImgComparisonSlider>

            </div>


            {/* Location and Mission Section with AOS */}
            <div data-aos="zoom-in">
                <LocationAndMission />
            </div>

            <Footer /> {/* Footer Component */}
        </div>
    );
};

export default Home;
