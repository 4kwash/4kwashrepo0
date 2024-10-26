import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const API_KEY = "AIzaSyAxxPN_i7RI0ETwOzcJrh41mmaZRcAUJeI";

import '../css/styles.css';
import '../css/MediaQuery.css'

const containerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '10px',
};

const center = {
    lat: 43.759609, // Replace with your business latitude
    lng: -79.243607, // Replace with your business longitude
};

const LocationAndMission: React.FC = () => {
    return (
        <div className="location-mission-container">
            <div className="mission-statement">
                <h2>Our Mission</h2>
                <p>
                    At our detailing service, we are committed to providing the highest level of care
                    for your vehicle. Our mission is to restore, protect, and enhance your car's beauty
                    and performance, leaving you with a vehicle that looks and feels like new. With a
                    passion for excellence and attention to detail, we aim to exceed customer expectations.
                </p>
            </div>

            <div className="google-map">
                <LoadScript googleMapsApiKey={API_KEY}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
                        <Marker position={center} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default LocationAndMission;