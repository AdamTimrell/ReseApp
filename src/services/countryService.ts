import type { Country } from "../types/country";
import type { CountryDetails } from "../types/countryDetails";

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

export const getCountryDetails = async (
  alpha3Code: string,
): Promise<CountryDetails> => {
  const response = await fetch(
    `https://countries.dev/alpha/${alpha3Code}?fields=name,alpha3Code,region,capital,flags,population,area,nativeName,subregion,cioc,latlng,currencies,languages`,
  );
  if (response.status === 404) {
    throw new Error("Country not found");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch country details: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

getCountryDetails("SWE");

console.log(getCountryDetails("SWE"));
