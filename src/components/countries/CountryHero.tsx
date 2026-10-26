import type { CountryDetails } from "@/types/countryDetails";

interface CountryHeroProps {
  country: CountryDetails;
}

export function CountryHero({ country }: CountryHeroProps) {
  return (
    <>
      <h1>{country.name}</h1>
      <img src={country.flags.png} alt={`Flag of ${country.name}`} />
    </>
  );
}
