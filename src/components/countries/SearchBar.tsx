import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useCountries } from "@/hooks/useCountries.ts";

export function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: countries } = useCountries();

  const submittedSearch = searchParams.get("query") ?? "";
  // Search state
  const [search, setSearch] = useState(submittedSearch);
  // Search matches
  const searchMatches = countries?.filter((country) =>
    country.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  // Event handlers
  const handleSearchSubmit = () => {
    if (searchMatches?.length === 1) {
      navigate(`/country/${searchMatches[0].alpha3Code}`, {
        state: { fromAtlas: true },
      });
    } else {
      navigate(`/?query=${encodeURIComponent(search.trim())}&page=1`);
    }
    setSearch("");
  };

  return (
    <form
      className="flex w-full max-w-md items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit();
      }}
    >
      <input
        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 
        placeholder-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        type="search"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  );
}
