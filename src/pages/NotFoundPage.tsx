import { Link } from "react-router";

type NotFoundPageProps = {
  message?: string;
};

// 404: Visar saknad sida eller saknat land med länk till startsidan
export function NotFoundPage({ message }: NotFoundPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>

      <h2 className="text-2xl font-semibold text-slate-700">
        Sidan kunde inte hittas
      </h2>

      <p className="max-w-md text-slate-500">
        {message ?? "Landet eller sidan du söker finns inte."}
      </p>

      <Link
        to="/"
        className="mt-4 rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        Tillbaka till länderna
      </Link>
    </div>
  );
}
