import { CountriesPage } from "./pages/CountriesPage.tsx";
import { CountryDetailsPage } from "./pages/CountryDetailsPage.tsx";
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CountriesPage />} />
      <Route path="/country/:alpha3Code" element={<CountryDetailsPage />} />
    </Routes>
  );
}
