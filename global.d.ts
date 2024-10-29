declare global {
    interface Window {
      google: typeof google;
    }
  }
  
  interface CompatibleReview extends google.maps.places.Review {
    rating: number | null;
    text: string | null;
  }
  