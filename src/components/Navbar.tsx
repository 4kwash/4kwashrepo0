import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa'; // Icons for hamburger menu
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';
import '../css/MediaQuery.css';

interface NavbarProps {
    logo: string;  // Accepts a logo as a prop
}

// Custom hook to handle scrolling behavior
const useScroll = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrolled;
};

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
    const [menuActive, setMenuActive] = useState<boolean>(false);
    const scrolled = useScroll();
    const navigate = useNavigate();

    // Toggle hamburger menu state
    const toggleMenu = () => {
        setMenuActive((prevState) => !prevState);
    };

    // Close menu on link click (mobile)
    const handleLinkClick = () => {
        if (menuActive) {
            setMenuActive(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            {/* Logo */}
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <img src={logo} alt="Logo" />
            </div>
            <div className="phone-number">
                <FaPhone />
                <p>416-671-9932</p>
            </div>

            {/* Hamburger Menu - Only visible on smaller screens */}
            <div 
                className="navbar-hamburger" 
                onClick={toggleMenu} 
                aria-label="Toggle menu" 
                aria-expanded={menuActive}
            >
                {menuActive ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>

            {/* Navigation Links */}
            <ul className={`navbar-links ${menuActive ? 'active' : ''}`}>
                <li><a href="/" className="navbar-link" onClick={handleLinkClick}>Home</a></li>
                <li><a href="/service" className="navbar-link" onClick={handleLinkClick}>Service</a></li>
                <li><a href="/reviews" className="navbar-link" onClick={handleLinkClick}>Reviews</a></li>
                <li><a href="/gallery" className="navbar-link" onClick={handleLinkClick}>Gallery</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
