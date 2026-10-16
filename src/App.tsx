import { useCountries } from "./hooks/useCountries";

export default function App() {
  const { data: countries, isPending, error } = useCountries();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <main>
      {countries?.map((country) => (
        <div key={country.alpha3Code}>
          <h2>{country.name}</h2>
        </div>
      ))}
    </main>
  );
}
