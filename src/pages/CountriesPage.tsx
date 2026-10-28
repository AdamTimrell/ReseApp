import { useCountries } from "../hooks/useCountries";
import { CountryCard } from "../components/countries/CountryCard.tsx";
import { useSearchParams } from "react-router";
import { RegionFilter } from "../components/countries/RegionFilter.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PopulationFilter } from "@/components/countries/PopulationFilter.tsx";

export function CountriesPage() {
  // Data fetching
  const { data: countries, isPending, error } = useCountries();

  // Routing and URL parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedSearch = searchParams.get("query") ?? "";
  const selectedRegion = searchParams.get("region") ?? "All";
  const selectedPopulation = searchParams.get("population") ?? "All";

  // Filtering
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
        matchesPopulation = true; // "All" or any other value
    }

    return matchesSearch && matchesRegion && matchesPopulation;
  });

  // Pagination
  const countriesPerPage = 12;
  const totalPages =
    Math.ceil((filteredCountries?.length ?? 0) / countriesPerPage) || 1;
  const requestedPage = parseInt(searchParams.get("page") ?? "1", 10);
  const validPage = Number.isNaN(requestedPage) ? 1 : requestedPage;
  const currentPage = Math.max(1, Math.min(totalPages, validPage));
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const paginatedCountries = filteredCountries?.slice(startIndex, endIndex);

  // Loading and error states
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // JSX return
  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-7xl mx-auto w-full sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCountries?.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </div>
          {filteredCountries?.length === 0 && <p>No countries found.</p>}
          <div className="flex items-center justify-center gap-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => {
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("page", (currentPage - 1).toString());
                  return params;
                });
              }}
            >
              Previous
            </Button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => {
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("page", (currentPage + 1).toString());
                  return params;
                });
              }}
            >
              Next
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
