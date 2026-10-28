import { useQuery } from "@tanstack/react-query";
import type { CountryDetails } from "@/types/countryDetails";
import { getCountryDetails } from "@/services/countryService";

// LANDSDETALJER: Hämtar och cachar landdata per landskod
export const useCountryDetails = (alpha3Code: string) => {
  return useQuery<CountryDetails, Error>({
    queryKey: ["countryDetails", alpha3Code],
    queryFn: () => getCountryDetails(alpha3Code),
    staleTime: Infinity,
    enabled: alpha3Code.trim().length > 0, // Kör enbart frågan om alpha3Code inte är tomt
  });
};
