import { useCountries } from "./hooks/useCountries";
import { CountryCard } from "./components/countries/CountryCard.tsx";

export default function App() {
  const { data: countries, isPending, error } = useCountries();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <main>
      {countries.map((country) => (
        <CountryCard key={country.alpha3Code} country={country} />
      ))}
    </main>
  );
}
