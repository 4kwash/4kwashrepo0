import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer: React.FC = () => {
    const [dateTime, setDateTime] = useState<string>(new Date().toLocaleString());

    // Update the date and time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(timer); // Clean up the timer on unmount
    }, []);

    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
            </div>
            <div className="date-time">{dateTime}</div>
        </footer>
    );
};

export default Footer;
