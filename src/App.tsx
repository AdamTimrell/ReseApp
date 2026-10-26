import { AppLayout } from "./components/layout/AppLayout.tsx";
import { CountriesPage } from "./pages/CountriesPage.tsx";
import { CountryDetailsPage } from "./pages/CountryDetailsPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { Routes, Route } from "react-router";

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
