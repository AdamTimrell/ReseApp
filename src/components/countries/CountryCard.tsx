import type { Country } from "../../types/country";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <Link to={`/country/${country.alpha3Code}`}>
      <Card>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name}`}
          className="w-full h-40 object-cover"
        />
        <CardHeader>
          <CardTitle>{country.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Capital: {country.capital || "N/A"}</p>
          <p>Region: {country.region}</p>
          <p>View Details</p>
        </CardContent>
      </Card>
    </Link>
  );
};
