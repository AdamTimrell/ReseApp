import { useQuery } from "@tanstack/react-query";
import type { WikipediaData } from "@/types/wikipediaData";
import { getWikipediaData } from "@/services/wikipediaService";

// WIKIPEDIA: Hämtar och cachar artikeldata när landets namn finns
export const useWikipediaData = (name: string) => {
  return useQuery<WikipediaData, Error>({
    queryKey: ["wikipedia", name],
    queryFn: () => getWikipediaData(name),
    staleTime: Infinity,
    enabled: name.trim().length > 0, // Kör enbart frågan om namnet inte är tomt
  });
};
