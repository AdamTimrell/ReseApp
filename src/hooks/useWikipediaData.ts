import { useQuery } from "@tanstack/react-query";
import type { WikipediaData } from "../types/wikipediaData.ts";
import { getWikipediaData } from "../services/wikipediaService.ts";

export const useWikipediaData = (name: string) => {
  return useQuery<WikipediaData, Error>({
    queryKey: ["wikipedia", name],
    queryFn: () => getWikipediaData(name),
    staleTime: Infinity,
    enabled: name.trim().length > 0, // Kör enbart frågan om namnet inte är tomt
  });
};
