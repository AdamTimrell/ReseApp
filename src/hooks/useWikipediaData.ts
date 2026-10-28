import { useQuery } from "@tanstack/react-query";
import type { WikipediaData } from "@/types/wikipediaData";
import { getWikipediaData } from "@/services/wikipediaService";

// WIKIPEDIA: Hämtar och cachar svenska artikeldata per landskod
export const useWikipediaData = (countryCode: string) => {
  return useQuery<WikipediaData | null, Error>({
    queryKey: ["wikipedia", "sv", countryCode],
    queryFn: () => getWikipediaData(countryCode),
    staleTime: Infinity,
    enabled: countryCode.trim().length > 0, // Kör enbart frågan om landskoden finns
  });
};
