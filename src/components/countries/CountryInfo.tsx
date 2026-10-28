import type { CountryDetails } from "@/types/countryDetails";
import {
  MapPin,
  Users,
  Map,
  Globe2,
  Languages,
  Coins,
  BookOpen,
  Compass,
} from "lucide-react";

interface CountryInfoProps {
  country: CountryDetails;
}

export function CountryInfo({ country }: CountryInfoProps) {
  // LANDSFAKTA: Formaterar språk och valutor med reservtext när uppgifter saknas
  const languages =
    country.languages
      ?.map((lang) => lang.name)
      .filter(Boolean)
      .join(", ") || "Ej tillgängligt";

  const currencies =
    country.currencies
      ?.map((currency) => currency.name)
      .filter(Boolean)
      .join(", ") || "Ej tillgängligt";

  return (
    <section className="space-y-6">
      {/* LANDSDETALJER: Visar huvudstad, befolkning, areal och region */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <MapPin className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
          <p className="text-sm text-slate-500">Huvudstad</p>
          <p className="mt-1 break-words text-lg font-semibold text-slate-900">
            {country.capital ?? "Ej tillgängligt"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <Users className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
          <p className="text-sm text-slate-500">Befolkning</p>
          <p className="mt-1 break-words text-lg font-semibold text-slate-900">
            {country.population != null
              ? country.population.toLocaleString("sv-SE")
              : "Ej tillgängligt"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <Map className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
          <p className="text-sm text-slate-500">Areal</p>
          <p className="mt-1 break-words text-lg font-semibold text-slate-900">
            {country.area != null
              ? `${country.area.toLocaleString("sv-SE")} km²`
              : "Ej tillgängligt"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <Globe2 className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
          <p className="text-sm text-slate-500">Region</p>
          <p className="mt-1 break-words text-lg font-semibold text-slate-900">
            {country.region ?? "Ej tillgängligt"}
          </p>
        </div>
      </div>

      {/* LANDSFAKTA: Visar originalnamn, underregion, språk och valutor */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-900">
          Mer om {country.name}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <BookOpen
              className="mt-1 h-5 w-5 shrink-0 text-teal-700"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Namn på originalspråk</p>
              <p className="break-words font-medium text-slate-900">
                {country.nativeName ?? "Ej tillgängligt"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Compass
              className="mt-1 h-5 w-5 shrink-0 text-teal-700"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Underregion</p>
              <p className="break-words font-medium text-slate-900">
                {country.subregion ?? "Ej tillgängligt"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Languages
              className="mt-1 h-5 w-5 shrink-0 text-teal-700"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Språk</p>
              <p className="break-words font-medium text-slate-900">
                {languages}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Coins
              className="mt-1 h-5 w-5 shrink-0 text-teal-700"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Valutor</p>
              <p className="break-words font-medium text-slate-900">
                {currencies}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
