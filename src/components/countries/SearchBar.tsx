import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "react-router";

type SearchInputProps = {
  submittedSearch: string;
  onSubmit: (search: string) => void;
};

// SÖKFÄLT: Håller inmatningen lokalt och skickar sökningen vid formulärskick
function SearchInput({ submittedSearch, onSubmit }: SearchInputProps) {
  const [search, setSearch] = useState(submittedSearch);

  return (
    <form
      className="flex w-full max-w-md items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(search);
      }}
    >
      <input
        aria-label="Search countries"
        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
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

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedSearch = searchParams.get("query") ?? "";

  // SÖKNING: Uppdaterar URL-parametern query och återställer sidan till ett
  const handleSearchSubmit = (search: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("query", search.trim());
      params.set("page", "1");
      return params;
    });
  };

  // URL-SYNKRONISERING: Återställer sökfältet när sökningen i URL:en ändras
  return (
    <SearchInput
      key={submittedSearch}
      submittedSearch={submittedSearch}
      onSubmit={handleSearchSubmit}
    />
  );
}
