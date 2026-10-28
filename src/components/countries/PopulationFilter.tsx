import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

interface PopulationFilterProps {
  selectedPopulation: string;
}

// BEFOLKNINGSFILTER: Sparar valt intervall i URL:en och återställer sidnumret
export function PopulationFilter({
  selectedPopulation,
}: PopulationFilterProps) {
  const [, setSearchParams] = useSearchParams();
  const populationRanges = ["All", "<1M", "1M-10M", "10M-100M", ">100M"];

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-md font-semibold text-gray-700">Population</h3>
      <Select
        value={selectedPopulation}
        onValueChange={(range) => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("population", range ?? "All");
            params.set("page", "1");
            return params;
          });
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Population Range" />
        </SelectTrigger>
        <SelectContent>
          {populationRanges.map((range) => (
            <SelectItem key={range} value={range}>
              {range}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
