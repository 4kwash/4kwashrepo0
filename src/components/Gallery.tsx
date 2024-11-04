import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles


import Footer from './Footer';
const API_END_POINT = "https://server-470044186658.us-central1.run.app";

interface MediaData {
  image: string;
  video: string;
  _id: string;
  __v: number;
}

const Gallery: React.FC = () => {
  const [media, setMedia] = useState<MediaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');

  // Initialize AOS animations on scroll
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Animation easing
    });
  }, []);

  // Fetch media (images and videos) from backend
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${API_END_POINT}/gallery`); // Replace with your backend API URL
        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }
        const data = await response.json();
        console.log(data);  // Log the media data to check if it's fetched correctly
        setMedia(data);
        setLoading(false);
      } catch (err) {
        
        setError(`An error occured: ${err}`);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const openModal = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const switchTab = (tab: 'images' | 'videos') => {
    setActiveTab(tab);
  };

  if (loading) {
    return <h1 style={{ textAlign: 'center', marginTop: '100px' }}>Loading gallery...</h1>;
  }

  if (error) {
    return <h1 style={{ textAlign: 'center', marginTop: '100px', color: 'red' }}>{error}</h1>;
  }

  // Filter images and videos based on the active tab
  const filteredMedia = activeTab === 'images'
    ? media.filter((item: MediaData) => item.image !== '') // Only images
    : media.filter((item: MediaData) => item.video !== ''); // Only videos

  return (
    <>
      {/* Gallery header */}
      <div style={{
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#3498db',  // Bluish color
        color: '#fff'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Our Stunning Gallery</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px', maxWidth: '600px', margin: 'auto' }}>
          Take a look at the amazing transformations and services we've provided. Click on any image or video for a closer view.
        </p>
      </div>

      {/* Tabs for Images and Videos */}
      <div className="tabs">
        <button
          className={activeTab === 'images' ? 'tab active' : 'tab'}
          onClick={() => switchTab('images')}
        >
          Images
        </button>
        <button
          className={activeTab === 'videos' ? 'tab active' : 'tab'}
          onClick={() => switchTab('videos')}
        >
          Videos
        </button>
      </div>

      {/* Responsive grid gallery with AOS animations */}
      <div className="gallery-grid">
        {filteredMedia.map((item, index) => (
          <div
            className="gallery-item"
            key={index}
            data-aos="zoom-in"  // AOS animation effect
            onClick={() => openModal(activeTab === 'images' ? item.image : item.video)}
          >
            {activeTab === 'images' ? (
              <img src={item.image} alt="Gallery Image" className="gallery-img" />
            ) : (
              <video src={item.video} className="gallery-video" controls />
            )}
          </div>
        ))}
      </div>

      {/* Modal Viewer */}
      {selectedMedia && (
        <div className="modal" onClick={closeModal} style={{marginBottom: '100px'}}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={closeModal}>&times;</span>
            {activeTab === 'images' ? (
              <img src={selectedMedia} alt="Full view" className="modal-img" />
            ) : (
              <video src={selectedMedia} className="modal-video" controls />
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Gallery;
