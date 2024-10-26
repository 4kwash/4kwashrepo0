import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';  // For navigation
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../css/styles.css';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import Footer from "../components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Define service schema interface
interface ServiceSchema {
  id: number;
  title: string;
  description: string;
  cost: number;
  image: string;
  video: string;
}

const Service: React.FC = () => {
  const [data, setData] = useState<ServiceSchema[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();  // To navigate to the service detail page

  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration
      easing: 'ease-in-out',  // Easing function
      once: true,  // Animation runs only once
    });

    const fetchServices = async () => {
      try {
        const response = await fetch('https://api-4k-1012991611421.us-central1.run.app/services');
        if (!response.ok) {
          throw new Error('Communication error');
        }
        const serviceData = await response.json();
        setData(serviceData || []);
        setLoading(false);
      } catch (error) {
        setError('An error occurred');
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleCardClick = (service: ServiceSchema) => {
    setTimeout(() => {
      navigate(`/services/${service.id}`, { state: { service } });  // Pass the entire service object
    }, 500);  // Delay navigation for animation to finish
  };

  if (loading) {
    return <h1 style={{ marginTop: '200px', textAlign: 'center' }}>Loading Services...</h1>;
  }

  if (error) {
    return <h1 style={{ marginTop: '200px', textAlign: 'center' }}>Error: {error}</h1>;
  }

  return (
    <>
      {/* Animated Header */}
      <div style={{
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#1abc9c',
        color: '#fff'
      }} data-aos="fade-down">
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Our Premium Services</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px', maxWidth: '600px', margin: 'auto' }}>
          Discover a wide range of premium car detailing services designed to make your vehicle look and feel brand new.
        </p>
      </div>

      {/* Services List */}
      <div className="service-swiper-wrapper" style={{ marginTop: '50px' }}>
        <div className="service-swiper">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3} // Adjust this as per your layout
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className='mySwiper'
          >
            {data.map((service) => (
              <SwiperSlide
                key={service.id}
                className="service-swiper-slide"
                onClick={() => handleCardClick(service)}  // Pass the service object on click
                style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  borderRadius: '15px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                  fontSize: '2rem',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <h1>{service.title}</h1>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Service;
