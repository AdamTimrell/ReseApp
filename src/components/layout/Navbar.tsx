import { Link } from "react-router";
import { SearchBar } from "@/components/countries/SearchBar";

// NAVIGATION: Startsideslänk och sökfält anpassade för mobil och större skärmar
const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8">
      <Link to="/" className="shrink-0 text-xl font-semibold text-gray-900">
        Atlas
      </Link>

      <div className="min-w-0 w-full sm:w-auto">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
