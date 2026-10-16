# Atlas – Reseapp

Svenskspråkig startstruktur för det individuella slutarbetet i JavaScript 3.
Detta är endast en utvecklingsmiljö med tomma mappar. Appen visar bara "Atlas — Project ready".
Allt ligger i `reseapp/`; det befintliga `react-project/` används inte.

## Starta

Använd Node.js 22.12+ (verifierat med Node 24.20.0) och npm.
Från mappen `Projects`:

```bash
cd reseapp
npm install
npm run dev
```

Öppna adressen Vite visar, vanligtvis http://localhost:5173.
Ingen `.env` behövs nu; `.env.example` beskriver framtida konfiguration.

```bash
npm run build   # TypeScript-kontroll och produktionsbygge i dist/
npm run lint    # Oxlint från den aktuella Vite-mallen
npm run preview
```

## Vad finns på plats?

- Vite, React och TypeScript med fungerande byggkommando.
- React Router och TanStack Query-provider, utan routes eller queries.
- Tailwind via Vite-plugin, neutralt shadcn/ui-grundtema och importalias `@/`.
- Installerade beroenden, inklusive React Hook Form och Zod.
- Planerad mappstruktur med tomma mappar för komponenter, sidor, data, typer,
  hooks, tjänster och hjälpfunktioner. Tomma mappar bevaras med `.gitkeep`.

## Vad återstår?

Alla applikationsfunktioner implementerar du själv: datamodell, mockdata, navbar,
layout, landkort, lista, routes, sökning, regionfilter, sidindelning, URL-parametrar,
API-anrop, landfakta, Open-Meteo, Wikipedia samt laddnings-, fel- och retry-lägen.

## Struktur och ansvar

- `src/components/layout/`: navigation och gemensam layout.
- `src/components/countries/`: kort, lista och framtida listkontroller.
- `src/components/details/`: tomma mappar för landsidan.
- `src/components/ui/`, `src/lib/utils.ts`: tom UI-mapp och shadcn-klassverktyg.
- `src/data/`: plats för framtida mockdata. `src/types/`: appens datakontrakt.
- `src/pages/`: sidkomponenter. `src/hooks/`: framtida query-hooks.
- `src/services/`: framtida API-anrop. `src/utils/`: framtida rena funktioner.
- `src/App.tsx`: minimal startsida. `src/main.tsx`: providers. `src/index.css`: tema.

Se [PROJECT-PLAN.md](PROJECT-PLAN.md) för ordning och [TASKS.md](TASKS.md) för första uppgiften.
Vid framtida publicering behöver webbservern skicka `index.html` för klientroutes.

## Officiella installationsguider

- [Vite](https://vite.dev/guide/)
- [Tailwind med Vite](https://tailwindcss.com/docs/installation/using-vite)
- [shadcn/ui med Vite](https://ui.shadcn.com/docs/installation/vite)
- [React Router](https://reactrouter.com/start/declarative/installation)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/quick-start)

Versioner finns i `package.json`; exakt installerade versioner låses i `package-lock.json`.

## Verifiering

Efter förenklingen verifieras bygget med `npm run build` (inklusive TypeScript).
Installationen och dev-servern verifierades under den ursprungliga uppsättningen;
beroenden har inte installerats om.

`npm audit` rapporterade 7 high-advisories i shadcn-verktygets transitiva
beroendekedja (`braces` → `micromatch` → `fast-glob` med flera). Den föreslagna
force-åtgärden nedgraderar shadcn till 1.0.0 och har därför inte körts.
Det är en kvarstående installationsvarning, inte ett TypeScript- eller byggfel.
