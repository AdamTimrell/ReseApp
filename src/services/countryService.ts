import type { Country } from "../types/country";

export const getCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    "https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags,population,area",
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
