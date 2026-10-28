import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";

interface RegionFilterProps {
  selectedRegion: string;
}

// REGIONFILTER: Sparar vald region i URL:en och återställer sidnumret
export function RegionFilter({ selectedRegion }: RegionFilterProps) {
  const [, setSearchParams] = useSearchParams();
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-md font-semibold text-gray-700">Region</h3>
      {regions.map((region) => (
        <Button
          aria-pressed={region === selectedRegion}
          className={`w-full ${region === selectedRegion ? "bg-teal-700 text-white hover:bg-teal-800" : ""}`}
          variant={region === selectedRegion ? "default" : "outline"}
          key={region}
          onClick={() => {
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("region", region);
              params.set("page", "1");
              return params;
            });
          }}
        >
          {region}
        </Button>
      ))}
    </div>
  );
}
