import {constructUrl} from './constructUrl';

export const getCurrentLocationName = async (
  longitude: number,
  latitude: number,
) => {
  console.log(longitude, latitude);

  const endpoint = 'mapbox.places'; // Optional: Specify endpoint for places
  const url = constructUrl(longitude, latitude, endpoint); // Replace with your function

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching location data: ${response.status}`);
    }
    const data = await response.json();
    const placeName = data.features[0].place_name || 'Location not found'; // Access place name
    console.log('Location name:', placeName);
    return placeName;
  } catch (error) {
    console.error('Error:', error);
    return null; // Or handle the error differently
  }
};
