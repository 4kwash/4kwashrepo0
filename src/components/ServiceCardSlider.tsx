import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/styles.css';
import '../css/MediaQuery.css';
const API_END_POINT = "https://server-470044186658.us-central1.run.app";

import { Pagination, Navigation } from 'swiper/modules';



interface ServiceData {
    id: number;
    title: string;
    description: string;
    cost: number; // Changed from Float32Array to number
    image: string;
    video: string;
}



const ServiceCardSlider: React.FC = () => {
    const [data, setData] = useState<ServiceData[]>([]); // Removed the null option and kept it as an empty array by default
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_END_POINT}/services`);
                if (!res.ok) {
                    throw new Error('Failed to fetch services');
                }
                const serviceData = await res.json();
                setData(serviceData || []); // If no data, keep an empty array
                setLoading(false);
            } catch (err) {
                console.log(err)
                setError(`The following error occured: ${error}`,);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading services...</p>;
    } else {
        return (
            <>
                
                <div className="service-card-slider">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={'auto'}
                        pagination={{ clickable: true }}
                        navigation={true}
                       
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        modules={[Pagination, Navigation]}
                    >
                        {data.length === 0 ? (
                            <p>No services found</p>
                        ) : (
                            data.map((service) => (
                                <SwiperSlide key={service.id}>
                                    <div className="service-card">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="service-card-image"
                                            style={{
                                                width: '500px',
                                                height: '300px'
                                            }}
                                        />
                                        <h3>{service.title}</h3>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
                
            </>
        )
    }



};

export default ServiceCardSlider;
