import type { CountryDetails } from "@/types/countryDetails";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

interface CountryHeroProps {
  country: CountryDetails;
}

export function CountryHero({ country }: CountryHeroProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    location.state?.fromAtlas ? navigate(-1) : navigate("/");
  };
  return (
    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-teal-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
      <div className="flex gap-4 p-6 items-center">
        <img
          className="w-24 h-16 object-contain rounded-md shrink-0"
          src={country.flags.png}
          alt={`Flag of ${country.name}`}
        />
        <h1 className="text-base sm:text-2xl font-bold ">{country.name}</h1>
      </div>
    </section>
  );
}
