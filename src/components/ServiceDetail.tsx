import React from 'react';
import { useLocation } from 'react-router-dom';

interface ServiceSchema {
  id: number;
  title: string;
  description: string;
  cost: number;
  video: string;
}

const ServiceDetail: React.FC = () => {
  const location = useLocation();
  const service = location.state?.service as ServiceSchema;

  if (!service) {
    return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Service not found</h1>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',  // Stacks the video/title/description in a column
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      maxWidth: '1200px',
      margin: '100px auto',
      border: '1px solid #ddd', // Box layout
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle effect
      backgroundColor: '#f9f9f9' // Light background for the box
    }}>

      {/* Flexbox row for video, title, and description */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',  // Align video, title, and description in a row
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        padding: '20px',
        flexWrap: 'wrap', // Allow wrapping on smaller screens
      }}>
        
        {/* Service Video - iPhone 15 size */}
        <div style={{
          width: '390px',  // Width of iPhone 15 display
          height: '844px',  // Height of iPhone 15 display
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginRight: '20px'  // Space between video and title/description
        }}>
          <video
            src={service.video}
            controls
            autoPlay
            muted  // This will allow the video to autoplay without sound
            loop  // If you want the video to repeat
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px'
            }}
          />
        </div>

        {/* Center column for title and description */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,  // Take the remaining space
          textAlign: 'center',
        }}>
          {/* Service Title */}
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px',
            wordWrap: 'break-word'
          }}>
            {service.title}
          </h1>

          {/* Service Cost */}
          <h3 style={{
            fontSize: '1.8rem',
            color: '#27ae60',
            marginBottom: '40px',
            fontWeight: '600'
          }}>
            Cost: ${service.cost}
          </h3>

          {/* Service Description aligned with video */}
          <div style={{
            textAlign: 'justify',
            width: '100%',
            padding: '0 15px',
            maxWidth: '600px',
            marginTop: '20px',  // Add spacing between title/cost and description
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: '#34495e',
              lineHeight: '1.6'
            }}>
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
