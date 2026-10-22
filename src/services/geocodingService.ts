import type { GeocodingData } from "../types/geocodingData.ts";

export const getGeocodingData = async (
  name: string,
): Promise<GeocodingData> => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5&language=en&format=json`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch geocoding data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
