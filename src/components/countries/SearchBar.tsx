import { Button } from "@/components/ui/button.tsx";

interface SearchBarProps {
  search: string;
  onSearchChange: (search: string) => void;
  onSearchSubmit: () => void;
}

export function SearchBar({ search, onSearchChange, onSearchSubmit }: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearchSubmit();
      }}
    >
      <input
        type="search"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  );
}
