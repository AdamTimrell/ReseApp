import type { WeatherData } from "@/types/weather";

// API VÄDER: Hämtar aktuellt väder och sjudygnsprognos från Open-Meteo
export const getWeather = async (
  latitude: number,
  longitude: number,
): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto&forecast_days=7`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
