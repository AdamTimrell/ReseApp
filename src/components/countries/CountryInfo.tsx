import type { CountryDetails } from "@/types/countryDetails";

interface CountryInfoProps {
  country: CountryDetails;
}

export function CountryInfo({ country }: CountryInfoProps) {
  return (
    <>
      <p>Native Name: {country.nativeName ?? "Not Available"}</p>
      <p>Capital: {country.capital ?? "Not Available"}</p>
      <p>Region: {country.region ?? "Not Available"}</p>
      <p>Subregion: {country.subregion ?? "Not Available"}</p>
      <p>
        Area:{" "}
        {country.area != null
          ? country.area.toLocaleString() + " km²"
          : "Not Available"}
      </p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>
        Languages:{" "}
        {country.languages != null && country.languages.length > 0
          ? country.languages.map((lang) => lang.name).join(", ")
          : "Not Available"}
      </p>
      <p>
        Currencies:{" "}
        {country.currencies != null && country.currencies.length > 0
          ? country.currencies.map((currency) => currency.name).join(", ")
          : "Not Available"}
      </p>
    </>
  );
}
