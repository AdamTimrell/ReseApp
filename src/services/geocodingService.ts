import type { GeocodingData } from "@/types/geocodingData";

// API GEOKODNING: Söker huvudstad och landskod via Open-Meteo
export const getGeocodingData = async (
  capital: string,
  countryCode: string,
): Promise<GeocodingData> => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(capital)}&countryCode=${encodeURIComponent(countryCode)}&count=5&language=en&format=json`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch geocoding data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
