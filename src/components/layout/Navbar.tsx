import { Link } from "react-router";
import { SearchBar } from "../countries/SearchBar";

const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8 justify-between items-center gap-4 py-4">
      <Link to="/" className="shrink-0 text-xl font-semibold text-gray-900">
        Atlas
      </Link>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
