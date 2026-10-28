import { useParams } from "react-router";
import { useCountryDetails } from "@/hooks/useCountryDetails";
import { CountryHero } from "@/components/countries/CountryHero";
import { CountryInfo } from "@/components/countries/CountryInfo";
import { CountryWeather } from "@/components/countries/CountryWeather";
import { WikipediaSection } from "@/components/countries/WikipediaSection";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Button } from "@/components/ui/button";

export function CountryDetailsPage() {
  // LANDSDETALJER: Läser landskoden från URL:en och hämtar valt land
  const { alpha3Code } = useParams();
  const {
    data: country,
    isPending,
    error,
    refetch,
  } = useCountryDetails(alpha3Code ?? "");

  // 404: Visar felsidan om landskoden saknas
  if (!alpha3Code?.trim()) return <NotFoundPage />;
  // LADDNING: Visar indikator medan landsdetaljer hämtas
  if (isPending) {
    return (
      <main className="flex min-h-64 flex-col items-center justify-center gap-3">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent"
          aria-hidden="true"
        />
        <p role="status">Laddar...</p>
      </main>
    );
  }
  // FELHANTERING: Skiljer saknat land från API-fel med nytt försök
  if (error?.message === "Country not found") return <NotFoundPage />;
  if (error) {
    return (
      <main className="flex flex-col items-center gap-4 p-6">
        <p role="alert">Kunde inte hämta landsinformationen. Försök igen.</p>
        <Button type="button" onClick={() => refetch()}>
          Försök igen
        </Button>
      </main>
    );
  }
  if (!country) return <NotFoundPage />;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <CountryHero country={country} />

      <CountryInfo country={country} />

      {/* RESPONSIV LAYOUT: Visar Wikipedia och väder i en eller två kolumner */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <WikipediaSection countryName={country.name} />
        <CountryWeather country={country} />
      </div>
    </main>
  );
}
