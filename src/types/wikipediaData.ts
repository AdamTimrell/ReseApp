// TYPER WIKIPEDIA: Artikelutdrag, valfri bild och länk till artikeln
export interface WikipediaData {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
  content_urls: {
    desktop: {
      page: string;
    };
  };
}
