# Atlas – Reseapp

Svenskspråkig reseapp under utveckling för det individuella slutarbetet i JavaScript 3.
API-grunderna är skrivna och en första landlista med landkort är kopplad i koden.
Integrationen av landdetaljer, väder och Wikipedia på landsidan återstår.
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

- Vite, React och TypeScript med byggkommando.
- React Router-provider (ännu utan definierade routes) och TanStack Query-provider med query-hooks.
- Tailwind via Vite-plugin, neutralt shadcn/ui-grundtema och importalias `@/`.
- Installerade beroenden, inklusive React Hook Form och Zod.
- TypeScript-interface, servicefunktioner med HTTP-felhantering och TanStack Query-hooks för:
  - **Countries.dev:** landlista och enskilda landdetaljer (`useCountries`, `useCountryDetails`).
  - **Open-Meteo Forecast API:** aktuellt väder och sjudygnsprognos (`useWeather`).
  - **Open-Meteo Geocoding API:** ortsökning för att hämta huvudstadens koordinater (`useGeocodingData`).
  - **Wikipedia REST API:** landintroduktion, valfri miniatyrbild och artikellänk (`useWikipediaData`).
- Query-cache med 15 minuters `staleTime` för väder och `Infinity` för övriga queries.
  Geocoding- och Wikipedia-frågor aktiveras bara när namnet inte är tomt.
- `App.tsx` använder landlistans hook och renderar landkort med flagga, namn,
  huvudstad och region samt enkla laddnings- och felmeddelanden. Detta är verifierat
  i koden, inte genom en UI-kontroll.

## Vad återstår?

API-grundarbetet ovan är klart, men landsidan är ännu inte implementerad.
Nästa steg är routes och visning av landfakta samt att koppla ihop huvudstadens
geocoding med väderhämtningen och visa Wikipedia-introduktion, eventuell bild och
artikellänk. Dessa integrationer är ännu inte färdiga i gränssnittet.

Navbar, gemensam layout, sökning, regionfilter, sidindelning och URL-parametrar
återstår också, liksom genomarbetade laddnings-, fel- och retry-lägen för landsidan.

## Struktur och ansvar

- `src/components/layout/`: navigation och gemensam layout.
- `src/components/countries/`: kort, lista och framtida listkontroller.
- `src/components/details/`: tomma mappar för landsidan.
- `src/components/ui/`, `src/lib/utils.ts`: shadcn/ui-komponenter och klassverktyg.
- `src/data/`: plats för framtida mockdata. `src/types/`: appens datakontrakt.
- `src/pages/`: plats för sidkomponenter. `src/hooks/`: query-hooks för API:erna.
- `src/services/`: API-anrop. `src/utils/`: plats för rena hjälpfunktioner.
- `src/types/`: interface för länder, landdetaljer, väder, geocoding och Wikipedia.
- `src/App.tsx`: första landlistan. `src/main.tsx`: providers. `src/index.css`: tema.

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

Bygget kan kontrolleras med `npm run build` (inklusive TypeScript).
Vid denna README-uppdatering har källkoden granskats, men inga tester, bygg-, lint-
eller UI-kontroller körts. Installationen och dev-servern verifierades under den
ursprungliga uppsättningen; det verifierar inte de nya API-integrationerna.

Vid den ursprungliga uppsättningen rapporterade `npm audit` 7 high-advisories i shadcn-verktygets transitiva
beroendekedja (`braces` → `micromatch` → `fast-glob` med flera). Den föreslagna
force-åtgärden nedgraderar shadcn till 1.0.0 och har därför inte körts.
Audit-resultatet har inte kontrollerats på nytt vid denna dokumentationsuppdatering.

## AI-användning

Under utvecklingen av Atlas har jag använt ChatGPT och OpenAI Codex som stöd.

- **ChatGPT och Codex:** Stöd för planering, tolkning av uppgiftskrav, förklaringar kring React, TypeScript och API-hantering samt felsökning och kodgranskning.
- **Codex:** Även hjälp med installation och konfiguration av återanvändbara shadcn/ui-komponenter samt uppdatering av dokumentation.
- **Eget arbete:** Jag har själv skrivit implementationen av appens funktionalitet, inklusive TypeScript-interface, servicefunktioner och query-hooks. Jag ansvarar för koden och säkerställer att jag förstår den.

AI har fungerat som ett utvecklingsstöd, inte som en ersättning för min egen förståelse av projektet.
