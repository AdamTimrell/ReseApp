import { Outlet } from "react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// SIDLAYOUT: Gemensam sidhuvud, sidfot och sidinnehåll via routerns Outlet
export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <Navbar />
      </header>

      <main className="flex-grow bg-slate-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
