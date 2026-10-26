import { useParams } from "react-router";
import { useCountryDetails } from "../hooks/useCountryDetails";
import { CountryHero } from "@/components/countries/CountryHero";
import { CountryInfo } from "@/components/countries/CountryInfo";
import { CountryWeather } from "@/components/countries/CountryWeather";
import { WikipediaSection } from "@/components/countries/WikipediaSection";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Button } from "@/components/ui/button";

export function CountryDetailsPage() {
  const { alpha3Code } = useParams();
  const {
    data: country,
    isPending,
    error,
    refetch,
  } = useCountryDetails(alpha3Code ?? "");

  if (!alpha3Code?.trim()) return <NotFoundPage />;
  if (isPending) return <p>Loading...</p>;
  if (error?.message === "Country not found") return <NotFoundPage />;
  if (error) {
    return (
      <main>
        <p>Error: {error.message}</p>
        <Button type="button" onClick={() => refetch()}>
          Refetch Country
        </Button>
      </main>
    );
  }
  if (!country) return <NotFoundPage />;

  return (
    <main>
      <CountryHero country={country} />
      <CountryInfo country={country} />
      <CountryWeather country={country} />
      <WikipediaSection countryName={country.name} />
    </main>
  );
}
