import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "../types/weather.ts";
import { getWeather } from "../services/weatherServices";

export const useWeather = (
  latitude: number | undefined,
  longitude: number | undefined,
) => {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => {
      if (latitude === undefined || longitude === undefined) {
        throw new Error("Weather coordinates are missing");
      }
      return getWeather(latitude, longitude);
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: latitude !== undefined && longitude !== undefined,
  });
};
