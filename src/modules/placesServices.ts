import axios from 'axios';

const API_KEY = 'AIzaSyAovgapf4SGvhHECoryGreKf6874XYsyas'; 
// const PLACE_ID = 'EitLaW5nc3RvbiBSZCwgQ2FtcGVyZG93biBOU1cgMjA1MCwgQXVzdHJhbGlhIi4qLAoUChIJGVZzrTuwEmsREy1_EDTFr0ISFAoSCaGwjGUssBJrEVCvMhZofQEF'; // Replace with your place ID

export const getPlaceReviews = async () => {
  const url = `https://places.googleapis.com/v1/places/${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.result) {
      return response.data.result.reviews || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching place reviews:", error);
    return [];
  }
};
