import { useWikipediaData } from "@/hooks/useWikipediaData";
import { Button } from "@/components/ui/button";

interface WikipediaSectionProps {
  countryName: string;
}

export function WikipediaSection({ countryName }: WikipediaSectionProps) {
  //wikipedia error handling
  const {
    data: wikipediaData,
    isPending: isWikipediaPending,
    error: wikipediaError,
    refetch: refetchWikipedia,
  } = useWikipediaData(countryName);
  return (
    <>
      <section>
        <h2>Description</h2>
        {isWikipediaPending ? (
          <span>Loading Description...</span>
        ) : wikipediaError ? (
          <div>
            <span>Could not load Description.</span>
            <Button type="button" onClick={() => refetchWikipedia()}>
              Refetch Description
            </Button>
          </div>
        ) : wikipediaData?.extract != null ? (
          <span>{wikipediaData.extract}</span>
        ) : (
          "Not Available"
        )}
      </section>
      {wikipediaData && (
        <a
          href={wikipediaData.content_urls.desktop.page}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more on Wikipedia →
        </a>
      )}
    </>
  );
}
