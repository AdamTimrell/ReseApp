import { useQuery } from "@tanstack/react-query";
import type { Country } from "../types/country.ts";
import { getCountries } from "../services/countryService.ts";

export const useCountries = () => {
  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: Infinity,
  });
};
