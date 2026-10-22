import { useQuery } from "@tanstack/react-query";
import type { GeocodingData } from "../types/geocodingData.ts";
import { getGeocodingData } from "../services/geocodingService.ts";

export const useGeocodingData = (name: string) => {
  return useQuery<GeocodingData, Error>({
    queryKey: ["geocoding", name],
    queryFn: () => getGeocodingData(name),
    staleTime: Infinity,
    enabled: name.trim().length > 0, // Kör enbart frågan om namnet inte är tomt
  });
};
