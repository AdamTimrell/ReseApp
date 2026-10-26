import type { CountryDetails } from "@/types/countryDetails";
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
    <>
      <button onClick={handleBack}>Back</button>
      <h1>{country.name}</h1>
      <img src={country.flags.png} alt={`Flag of ${country.name}`} />
    </>
  );
}
