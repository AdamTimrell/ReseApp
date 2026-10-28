import type { WikipediaData } from "@/types/wikipediaData";

interface WikidataArticleResult {
  results: {
    bindings: {
      item: { value: string };
      title: { value: string };
    }[];
  };
}

interface WikipediaSummary extends WikipediaData {
  lang: string;
  type: string;
  wikibase_item?: string;
}

// WIKIDATA: Matchar landskod till svensk artikel utan översatta namn eller textsökning
export const getWikipediaData = async (
  countryCode: string,
): Promise<WikipediaData | null> => {
  const code = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return null;

  const query = `
    SELECT DISTINCT ?item ?title WHERE {
      ?item wdt:P297 "${code}" .
      ?article schema:about ?item ;
        schema:isPartOf <https://sv.wikipedia.org/> ;
        schema:name ?title .
    }
    LIMIT 2
  `;
  const params = new URLSearchParams({ query, format: "json" });
  const articleResponse = await fetch(
    `https://query.wikidata.org/sparql?${params}`,
  );

  if (!articleResponse.ok) {
    throw new Error(
      `Failed to find Wikipedia article: ${articleResponse.statusText}`,
    );
  }

  const articles: WikidataArticleResult = await articleResponse.json();
  // ARTIKELMATCHNING: Saknad eller tvetydig landskoppling ger befintlig reservtext
  if (articles.results.bindings.length !== 1) return null;
  const article = articles.results.bindings[0];
  const itemId = article.item.value.match(/\/entity\/(Q\d+)$/)?.[1];
  if (!itemId) return null;

  const response = await fetch(
    `https://sv.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article.title.value)}`,
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia data: ${response.statusText}`);
  }

  const data: WikipediaSummary = await response.json();
  // IDENTITET: Avvisar andra ämnen, förgreningssidor och artiklar på fel språk
  if (
    data.wikibase_item !== itemId ||
    data.lang !== "sv" ||
    data.type !== "standard" ||
    !data.extract?.trim() ||
    !data.content_urls?.desktop?.page?.startsWith("https://sv.wikipedia.org/wiki/")
  ) {
    return null;
  }

  return data;
};
