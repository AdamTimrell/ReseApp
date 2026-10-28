import { useQuery } from "@tanstack/react-query";
import type { Country } from "@/types/country";
import { getCountries } from "@/services/countryService";

// LANDLISTA: Hämtar och cachar länder med React Query
export const useCountries = () => {
  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: Infinity,
  });
};
