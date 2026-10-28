import { AppLayout } from "@/components/layout/AppLayout";
import { CountriesPage } from "@/pages/CountriesPage";
import { CountryDetailsPage } from "@/pages/CountryDetailsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Routes, Route } from "react-router";

// ROUTING: Kopplar URL-sökvägar till startsida, landsdetaljer och 404
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<CountriesPage />} />
        <Route path="/country/:alpha3Code" element={<CountryDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
