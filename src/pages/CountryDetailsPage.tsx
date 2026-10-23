import { useParams } from "react-router";
import { useCountryDetails } from "../hooks/useCountryDetails";

export function CountryDetailsPage() {
  const { alpha3Code } = useParams();
  const {
    data: country,
    isPending,
    error,
  } = useCountryDetails(alpha3Code ?? "");
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!country) {
    return (
      <main>
        <p>Country not found.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{country.name}</h1>
      <p>Native Name: {country.nativeName ?? "Not Available"}</p>
      <img src={country.flags.png} alt={`Flag of ${country.name}`} />
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
    </main>
  );
}
