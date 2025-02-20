import { Place } from "@/types/placeTypes";
import axios from "axios"

const GOOGLE_API_KEY = "YOUR_API";

export const fetchPlaces = async (input: string): Promise<Place[]> => {
  if (!input) return [];

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`;

  try {
    const { data } = await axios.get(url);
    return data?.predictions || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error; 
  }
};

export const fetchPlaceDetails = async (placeId: string): Promise<{ lat: number; lng: number; name: string }> => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

  try {
    const { data } = await axios.get(detailsUrl);
    if (data?.result?.geometry) {
      const { lat, lng } = data.result.geometry.location;
      return { lat, lng, name: data.result.name };
    }
    throw new Error("No location data found");
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};
