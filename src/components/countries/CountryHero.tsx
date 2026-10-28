import type { CountryDetails } from "@/types/countryDetails";
import { ArrowLeft, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

interface CountryHeroProps {
  country: CountryDetails;
}

export function CountryHero({ country }: CountryHeroProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [flagSource, setFlagSource] = useState<"png" | "svg" | "fallback">(
    "png",
  );

  // NAVIGATION: Går tillbaka i historiken eller till startsidan vid direktbesök
  const handleBack = () => {
    if (location.state?.fromAtlas) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-600 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Tillbaka
        </button>
      </div>

      {/* HERO: Visar landets flagga, namn och regioner */}
      <div className="border-t border-slate-100 bg-gradient-to-r from-teal-50 via-white to-slate-50 px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-28 w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-md sm:h-32 sm:w-48">
            {/* FLAGGA: Reservbild i SVG eller reservtext om flaggan inte laddas */}
            {flagSource === "fallback" ? (
              <span className="text-sm text-slate-500">Flagga saknas</span>
            ) : (
              <img
                src={
                  flagSource === "png" ? country.flags.png : country.flags.svg
                }
                alt={`Flagga för ${country.name}`}
                onError={() =>
                  setFlagSource((current) =>
                    current === "png" ? "svg" : "fallback",
                  )
                }
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>

          <div className="min-w-0 space-y-3">
            <p className="flex items-center gap-2 text-sm font-medium text-teal-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Upptäck landet
            </p>

            <h1 className="break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {country.name}
            </h1>

            <div className="flex flex-wrap gap-2">
              {country.region && (
                <span className="rounded-full border border-teal-200 bg-white px-3 py-1 text-sm font-medium text-teal-800">
                  {country.region}
                </span>
              )}

              {country.subregion && (
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
                  {country.subregion}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
