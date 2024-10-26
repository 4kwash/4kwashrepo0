// apiService.js

const API_BASE_URL = "https://your-backend-api-url.com"; // Replace with your backend API URL

/**
 * Fetch services from the backend API.
 * @returns {Promise<Array>} A promise that resolves to an array of service objects.
 */
export const fetchServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
