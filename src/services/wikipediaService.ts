import type { WikipediaData } from "../types/wikipediaData.ts";

export const getWikipediaData = async (
  name: string,
): Promise<WikipediaData> => {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
