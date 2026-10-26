import type { Country } from "../../types/country";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <Link to={`/country/${country.alpha3Code}`} state={{ fromAtlas: true }} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
      <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name}`}
          className="w-full h-48 rounded-t-xl object-cover"
        />
        <CardHeader>
          <CardTitle className="text-lg font-bold">{country.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-1">
          <p>Capital: {country.capital || "N/A"}</p>
          <p>Region: {country.region}</p>
        </CardContent>
        <CardFooter>
          <p className="text-teal-700 font-semibold">
            Explore Country <ArrowRight className="inline-block size-4 gap-1" />
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
