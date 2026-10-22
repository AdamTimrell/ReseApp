import type { Country } from "./country.ts";

export interface CountryDetails extends Country {
  nativeName?: string | null;
  subregion?: string | null;
  cioc?: string | null;
  latlng?: [number, number] | null;
  currencies?:
    | {
        code?: string | null;
        name?: string | null;
        symbol?: string | null;
      }[]
    | null;
  languages?:
    | {
        name?: string | null;
        nativeName?: string | null;
      }[]
    | null;
}
