import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";

interface RegionFilterProps {
  selectedRegion: string;
}

export function RegionFilter({ selectedRegion }: RegionFilterProps) {
  const [, setSearchParams] = useSearchParams();
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div>
      {regions.map((region) => (
        <Button
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
