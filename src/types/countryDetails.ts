import type { Country } from "@/types/country";

// TYPER LANDSDETALJER: Utökar landets grunduppgifter med språk, valutor och koordinater
export interface CountryDetails extends Country {
  alpha2Code: string;
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
