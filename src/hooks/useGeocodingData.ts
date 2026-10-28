import { useQuery } from "@tanstack/react-query";
import type { GeocodingData } from "@/types/geocodingData";
import { getGeocodingData } from "@/services/geocodingService";

// GEOKODNING: Hämtar och cachar koordinater när namn och landskod finns
export const useGeocodingData = (name: string, countryCode: string) => {
  return useQuery<GeocodingData, Error>({
    queryKey: ["geocoding", name, countryCode],
    queryFn: () => getGeocodingData(name, countryCode),
    staleTime: Infinity,
    enabled: Boolean(name?.trim() && countryCode?.trim()),
  });
};
