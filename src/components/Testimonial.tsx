import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Slider from "react-slick";
import AOS from "aos";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import ServiceCardSlider from "./ServiceCardSlider";
import Footer from "./Footer";

const PLACE_ID = "ChIJz0Ny1UDR1IkR7Ro3MbKD7uo"; // 4kwash business
const API_KEY = "AIzaSyAovgapf4SGvhHECoryGreKf6874XYsyas";

interface Review {
  rating: number | null;
  text: string | null;
  profile_photo_url?: string;
  author_name: string;
  author_url?: string; // Make author_url optional
}

const Reviews: React.FC = () => {
  const [placeDetails, setPlaceDetails] = useState<{ displayName: string; formattedAddress: string; reviews: Review[] } | null>(null);

  useEffect(() => {
    AOS.init(); // Initialize AOS animations

    const loadPlaceDetails = async () => {
      const loader = new Loader({
        apiKey: API_KEY,
        version: "weekly",
        libraries: ["places"],
      });

      const google = await loader.load();
      const service = new google.maps.places.PlacesService(document.createElement("div"));

      service.getDetails(
        {
          placeId: PLACE_ID,
          fields: ["name", "formatted_address", "reviews"],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const reviews = place.reviews?.map((review) => ({
              rating: review.rating ?? 0,
              text: review.text ?? "No review",
              profile_photo_url: review.profile_photo_url || "",
              author_name: review.author_name,
              author_url: review.author_url ?? "#", // Provide fallback URL if undefined
            })) ?? [];

            setPlaceDetails({
              displayName: place.name || "Loading Reviews...",
              formattedAddress: place.formatted_address || "No address found",
              reviews,
            });
          }
        }
      );
    };

    loadPlaceDetails();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="slider-background">
        <div className="slider-container" data-aos="fade-up">
          <h2>{placeDetails?.displayName || "Loading Reviews..."}</h2>
          <p>{placeDetails?.formattedAddress}</p>
          {placeDetails?.reviews && placeDetails.reviews.length > 0 ? (
            <Slider {...sliderSettings}>
              {placeDetails.reviews.map((review, index) => (
                <div key={index} className="review-slide">
                  <div className="review-content">
                    {review.profile_photo_url && (
                      <img
                        src={review.profile_photo_url}
                        alt={`${review.author_name}'s profile`}
                        className="review-profile-photo"
                      />
                    )}
                    <a href={review.author_url} target="_blank" rel="noopener noreferrer">
                      <strong>{review.author_name}</strong>
                    </a>
                    <div>Rating: {review.rating} ⭐️</div>
                    <p>{review.text}</p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </div>
      <ServiceCardSlider />
      <Footer />
    </>
  );
};

export default Reviews;
