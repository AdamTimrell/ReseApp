import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main>
      <h1>404 — Country not found</h1>
      <Link to="/">Back to country list</Link>
    </main>
  );
}
