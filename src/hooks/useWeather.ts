import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "../types/weather.ts";
import { getWeather } from "../services/weatherServices";

export const useWeather = (latitude: number, longitude: number) => {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => getWeather(latitude, longitude),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
