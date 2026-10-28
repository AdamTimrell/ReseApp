import { useCountries } from "@/hooks/useCountries";
import { CountryCard } from "@/components/countries/CountryCard";
import { useSearchParams } from "react-router";
import { RegionFilter } from "@/components/countries/RegionFilter";
import { Button } from "@/components/ui/button";
import { PopulationFilter } from "@/components/countries/PopulationFilter";

export function CountriesPage() {
  // LÄNDER: Hämtar landlistan och status för API-anropet
  const { data: countries, isPending, error, refetch } = useCountries();

  // URL-PARAMETRAR: Läser sökning, region och befolkning från URL:en
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedSearch = searchParams.get("query") ?? "";
  const selectedRegion = searchParams.get("region") ?? "All";
  const selectedPopulation = searchParams.get("population") ?? "All";

  // FILTRERING: Kombinerar sökning, region och befolkningsintervall
  const filteredCountries = countries?.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(submittedSearch.trim().toLowerCase());

    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;

    let matchesPopulation = true;
    switch (selectedPopulation) {
      case "<1M":
        matchesPopulation = country.population < 1_000_000;
        break;
      case "1M-10M":
        matchesPopulation =
          country.population >= 1_000_000 && country.population < 10_000_000;
        break;
      case "10M-100M":
        matchesPopulation =
          country.population >= 10_000_000 && country.population < 100_000_000;
        break;
      case ">100M":
        matchesPopulation = country.population >= 100_000_000;
        break;
      default:
        matchesPopulation = true; // Alla länder vid övriga värden
    }

    return matchesSearch && matchesRegion && matchesPopulation;
  });

  // PAGINERING: Väljer tolv länder och begränsar sidnumret
  const countriesPerPage = 12;
  const totalPages =
    Math.ceil((filteredCountries?.length ?? 0) / countriesPerPage) || 1;
  const requestedPage = parseInt(searchParams.get("page") ?? "1", 10);
  const validPage = Number.isNaN(requestedPage) ? 1 : requestedPage;
  const currentPage = Math.max(1, Math.min(totalPages, validPage));
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const paginatedCountries = filteredCountries?.slice(startIndex, endIndex);

  // LADDNING: Visar introduktion och snurrande laddningsindikator
  if (isPending)
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-4 p-12"
      >
        <section
          aria-labelledby="explore-heading"
          className="relative flex min-h-64 items-end overflow-hidden rounded-2xl bg-slate-800 px-6 py-8 text-white sm:min-h-80 sm:px-10 sm:py-10 lg:min-h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

          <div className="relative z-10 max-w-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-200">
              Atlas
            </p>

            <h1
              id="explore-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Utforska världen
            </h1>

            <p className="mt-3 max-w-md text-base leading-relaxed text-slate-100 sm:text-lg">
              Upptäck länder, kulturer och nya resmål.
            </p>
          </div>
        </section>

        <div
          aria-hidden="true"
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-teal-700"
        />
        <p>Laddar Länder...</p>
      </div>
    );
  // FELHANTERING: Visar felmeddelande och försök igen-knapp
  if (error)
    return (
      <div role="alert" className="flex flex-col items-center gap-4 p-8">
        <p>Kunde inte hämta länderna. Försök igen.</p>
        <Button onClick={() => refetch()}>Försök igen</Button>
      </div>
    );
  // RESPONSIV LAYOUT: Anpassar sidans bredd och marginaler efter skärmstorlek
  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-7xl mx-auto w-full sm:px-6 lg:px-8">
      {/* HERO: Bakgrundsbild, gradient och rubrik på startsidan */}
      <section
        aria-labelledby="explore-heading"
        className="relative flex min-h-64 items-end overflow-hidden rounded-2xl bg-slate-800 px-6 py-8 text-white sm:min-h-80 sm:px-10 sm:py-10 lg:min-h-96"
      >
        <img
          src="/images/atlas-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

        <div className="relative z-10 max-w-xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-200">
            Atlas
          </p>

          <h1
            id="explore-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Utforska världen
          </h1>

          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-100 sm:text-lg">
            Upptäck länder, kulturer och nya resmål.
          </p>
        </div>
      </section>

      {/* FILTER: Visar region och befolkning bredvid landlistan på stora skärmar */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside
          aria-label="Country Filters"
          className="self-start w-full lg:w-60 shrink-0 bg-white rounded-lg border border-gray-200 p-4 space-y-4"
        >
          <h2 className="text-lg font-bold text-gray-800">Filter</h2>
          <RegionFilter selectedRegion={selectedRegion} />
          <PopulationFilter selectedPopulation={selectedPopulation} />
        </aside>
        <section className="min-w-0 flex-1">
          {/* LANDKORT: Visar aktuell sida i ett responsivt rutnät */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCountries?.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </div>
          {/* TOMT RESULTAT: Meddelande när inga länder matchar filtren */}
          {filteredCountries?.length === 0 && (
            <p>Inga länder matchar dina kriterier</p>
          )}
          {/* PAGINERING: Växlar sida i URL:en och behåller aktiva filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <Button
              variant="outline"
              className="min-w-28 rounded-lg border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => {
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("page", (currentPage - 1).toString());
                  return params;
                });
              }}
            >
              Föregående
            </Button>
            <p className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Sida {currentPage} av {totalPages}
            </p>
            <Button
              variant="outline"
              className="min-w-28 rounded-lg border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
              disabled={currentPage === totalPages}
              onClick={() => {
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("page", (currentPage + 1).toString());
                  return params;
                });
              }}
            >
              Nästa
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
