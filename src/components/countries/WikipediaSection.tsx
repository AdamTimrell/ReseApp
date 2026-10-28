import { useWikipediaData } from "@/hooks/useWikipediaData";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";

interface WikipediaSectionProps {
  countryName: string;
}

export function WikipediaSection({ countryName }: WikipediaSectionProps) {
  // WIKIPEDIA: Hämtar artikelutdrag för landets namn
  const {
    data: wikipediaData,
    isPending: isWikipediaPending,
    error: wikipediaError,
    refetch: refetchWikipedia,
  } = useWikipediaData(countryName);

  return (
    <section className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center gap-2">
        <BookOpen
          className="h-6 w-6 shrink-0 text-teal-700"
          aria-hidden="true"
        />
        <h2 className="text-xl font-bold text-slate-900">Om {countryName}</h2>
      </div>

      {/* WIKIPEDIASTATUS: Hanterar laddning, fel med nytt försök och saknad beskrivning */}
      {isWikipediaPending ? (
        <p role="status" className="text-slate-600">
          Laddar beskrivning...
        </p>
      ) : wikipediaError ? (
        <div className="space-y-4">
          <p role="alert" className="text-slate-600">
            Kunde inte ladda beskrivningen.
          </p>
          <Button type="button" onClick={() => refetchWikipedia()}>
            Försök igen
          </Button>
        </div>
      ) : wikipediaData?.extract != null ? (
        <div className="flex flex-1 flex-col gap-5">
          {/* WIKIPEDIABILD: Visar artikelns miniatyrbild när den finns */}
          {wikipediaData.thumbnail?.source && (
            <img
              src={wikipediaData.thumbnail.source}
              alt={`Bild från Wikipedia: ${countryName}`}
              className="max-h-56 w-full rounded-xl bg-slate-50 object-contain"
            />
          )}

          <p className="break-words leading-7 text-slate-700">
            {wikipediaData.extract}
          </p>
        </div>
      ) : (
        <p className="text-slate-600">Ingen beskrivning tillgänglig.</p>
      )}

      {/* WIKIPEDIALÄNK: Öppnar hela artikeln i en ny flik */}
      {wikipediaData?.content_urls?.desktop?.page && (
        <a
          href={wikipediaData.content_urls.desktop.page}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-md font-semibold text-teal-700 hover:text-teal-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
        >
          Läs mer på Wikipedia
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </section>
  );
}
