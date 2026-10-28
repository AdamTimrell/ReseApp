// TYPER LÄNDER: Grunduppgifter för landlistan
export interface Country {
  name: string;
  alpha3Code: string;
  region: string;
  capital: string | null;
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  area: number | null;
}
