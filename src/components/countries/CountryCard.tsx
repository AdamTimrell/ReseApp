import type { Country } from "@/types/country";
import { useState } from "react";
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

// LANDKORT: Länkar till landsdetaljer och markerar intern navigering
export const CountryCard = ({ country }: CountryCardProps) => {
  const [flagSource, setFlagSource] = useState<"png" | "svg" | "fallback">(
    "png",
  );
  return (
    <Link
      to={`/country/${country.alpha3Code}`}
      state={{ fromAtlas: true }}
      className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
    >
      <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* FLAGGA: Provar PNG, sedan SVG och till sist reservtext vid bildfel */}
        {flagSource === "fallback" ? (
          <div className="flex h-48 w-full items-center justify-center rounded-t-xl bg-slate-100 text-slate-500">
            <span>Flagga saknas</span>
          </div>
        ) : (
          <img
            src={flagSource === "png" ? country.flags.png : country.flags.svg}
            alt={`Flagga för ${country.name}`}
            onError={() => {
              setFlagSource((current) =>
                current === "png" ? "svg" : "fallback",
              );
            }}
            className="h-48 w-full rounded-t-xl bg-slate-50 object-contain"
          />
        )}
        <CardHeader>
          <CardTitle className="text-lg font-bold">{country.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-1">
          <p>Huvudstad: {country.capital || "Ej tillgänglig"}</p>
          <p>Region: {country.region}</p>
        </CardContent>
        <CardFooter>
          <p className="text-teal-700 font-semibold">
            Utforska landet <ArrowRight className="inline-block size-4 gap-1" />
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
