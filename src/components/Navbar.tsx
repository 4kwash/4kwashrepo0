import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone, FaInstagram } from 'react-icons/fa'; // Icons for hamburger menu
import { useNavigate } from 'react-router-dom';


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

const Navbar: React.FC = () => {
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
        <>
            {/* Hamburger Menu - Only visible on smaller screens */}
            <div
                className="navbar-hamburger"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={menuActive}
            >
                {menuActive ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>


            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>


                <div className="navbar-logo-container" onClick={() => navigate('/')}>
                    <h1><span>4K</span> Wash</h1>
                </div>


                <div className="icon">
                    <FaPhone id='phone-icon' />
                    <p id='phone-number'>416-671-9932</p>
                </div>
                <div className="icon">
                    <FaInstagram id='instagram'/>
                    <p><a href="#">racinkc</a></p>
                </div>


                {/* Navigation Links */}
                <ul className={`navbar-links ${menuActive ? 'active' : ''}`}>
                    <li><a href="/" className="navbar-link" onClick={handleLinkClick}>Home</a></li>
                    <li><a href="/service" className="navbar-link" onClick={handleLinkClick}>Service</a></li>
                    <li><a href="/reviews" className="navbar-link" onClick={handleLinkClick}>Reviews</a></li>
                    <li><a href="/gallery" className="navbar-link" onClick={handleLinkClick}>Gallery</a></li>
                </ul>


            </nav>
        </>
    );
};

export default Navbar;

