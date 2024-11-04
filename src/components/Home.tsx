import React, { useEffect } from 'react';
import AOS from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // AOS styles
import { FaCar, FaSoap, FaSprayCan, FaCheck } from 'react-icons/fa';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import backgroundImage from '@assets/img/darkenedbg.png';
import VehicleForm from '@components/VehicleInquiry';
import after from '../assets/img/after.jpg'
import before from '../assets/img/before.jpg'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const API_KEY = import.meta.env.VITE_API_KEY
import Footer from './Footer';
import '../App.css'


const containerStyle = {
    display: 'flex',
    width: '100%',
    height: '600px',
    borderRadius: '10px',
    marginBottom: '100px',
};

const center = {
    lat: 43.759609, // Replace with your business latitude
    lng: -79.243607, // Replace with your business longitude
};

const Home: React.FC = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const iconSize: number = 80


    return (
        <div className="home-container">
            <section style={{ backgroundImage: `url(${backgroundImage})` }} className='section-style'>

                <div data-aos="fade-right" className='aos-init'>
                    <h1 className='header-on-mobile'>Welcome 4K  Detailing Service</h1>
                    <p id='greeting'>
                        Experience the ultimate car care with our professional detailing
                        services. We provide top-notch exterior washes, interior cleaning,
                        engine detailing, and ceramic coatings to keep your car looking
                        brand new.
                    </p>
                </div>
                <VehicleForm />
            </section>
            <section className='section-two'>

                <div className="section-two-card">
                    <FaCar size={iconSize} />
                    <h1>Exterior only Detailing</h1>
                    <p>Get a full exterior wash, polish, and protection to keep your vehicle looking pristine. Our team carefully removes dirt and grime, restores shine, and applies a long-lasting protective layer</p>
                </div>
                <div className="section-two-card">
                    <FaSoap size={iconSize} />
                    <h1>Interior</h1>
                    <p>Deep cleaning for every part of your car’s interior, from seats to carpets. We use high-quality products that leave your interior fresh and spotless.</p>
                </div>
                <div className="section-two-card">
                    <FaSprayCan size={iconSize} />
                    <h1>Ceramic Coating</h1>
                    <p>Protect your vehicle with our advanced ceramic coating service. A durable, high-gloss finish guards your car against dirt, scratches, and UV rays</p>
                </div>
                <div className="section-two-card">
                    <FaCheck size={iconSize} />
                    <h1>Paint Correction</h1>
                    <p>Eliminate scratches, swirls, and oxidation to bring out the best in your car’s paint. Our multi-step process leaves your vehicle with a flawless finish.</p>
                </div>

            </section>

            <section className='section-three'>
                <div className="section-three-container">
                    <h1>See out work</h1>
                    <p>When it comes to car detailing, there's nothing quite like the magic of a "before and after" transformation. Imagine a vehicle that has weathered countless drives, showing the effects of everyday wear and exposure to the elements. The paint might be dull, the wheels caked in dust, and the interior not as fresh as it once was. But with our professional car detailing service, this same car emerges with a new lease on life.</p>
                </div>
                <ImgComparisonSlider data-aos="fade-left" style={{ width: '50%', height: '600px', borderRadius: '50px' }} id='image-comparison-slider'>
                    /<img slot='second' src={before} />
                    <img slot='first' src={after} />
                </ImgComparisonSlider>
            </section>

            <section className='section-four'>
                <div className="google-map" data-aos='zoom-in'>

                    <div className="mission-statement">
                        <h1>Mission Statement</h1>
                        <p>Our mission is to elevate the car detailing experience by delivering unparalleled quality, precision, and care in every service. We are dedicated to transforming and preserving each vehicle with meticulous attention to detail, using innovative techniques and premium products that enhance both beauty and longevity. With a commitment to excellence and customer satisfaction, we strive to make every vehicle a reflection of pride and elegance, providing our clients with an exceptional experience that exceeds expectations and drives their confidence on the road.</p>
                    </div>

                    <LoadScript googleMapsApiKey={API_KEY}>
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>
                <Footer />

            </section>


        </div>
    );
};

export default Home;
