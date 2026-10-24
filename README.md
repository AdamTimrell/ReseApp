# Atlas

Atlas is a country exploration and travel information application built as a school final project in JavaScript 3. It brings country facts, weather, and Wikipedia summaries together to help users explore destinations.

## Current features

- **Country listing:** Cards show each country's flag, name, capital, and region, with links to its detail page.
- **Country search:** Case-insensitive name matching. Submitting a search with exactly one match opens that country's detail page directly. Otherwise, the search updates the list, resets the region filter, and returns to page 1.
- **Region filtering:** Filter by Africa, Americas, Asia, Europe, or Oceania, or select All. Changing the region preserves the search and resets the page.
- **Pagination:** Up to 12 countries per page, with Previous and Next controls and a page indicator. Invalid page values fall back to page 1; out-of-range page numbers are clamped to the available range.
- **URL-based list state:** The `query`, `region`, and `page` parameters support direct links to filtered results, for example `/?query=land&region=Europe&page=1`.
- **Country details:** The `/country/:alpha3Code` route displays the flag, native name, capital, region, subregion, area, population, languages, and currencies.
- **Current weather:** Country details show temperature, weather description, humidity, and wind speed. Coordinates come from a matching capital-city geocoding result, with country coordinates as a fallback.
- **Wikipedia summaries:** Country details display an introduction and a link to the English Wikipedia article.
- **Status messages:** Loading and error messages for country data, weather, and Wikipedia, plus an empty-results message for the country list.

## Tech stack

- **React 19** and **TypeScript 6** for the frontend.
- **Vite 8** for development and production bundling.
- **Tailwind CSS 4** through the Tailwind Vite plugin.
- **shadcn/ui** components using Base UI, with Lucide icons available.
- **React Router 8** for client-side routes and URL parameters.
- **TanStack Query 5** for fetching and caching server data.
- **Oxlint** for linting.

Dependency ranges are defined in `package.json`; exact versions are recorded in `package-lock.json`.

## Getting started

### Prerequisites

- Node.js 22.12 or newer, compatible with the installed Vite version.
- npm.
- An internet connection for the external API requests.

### Installation

From the repository root:

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run TypeScript checks with `tsc -b`, then create the production bundle in `dist/`. |
| `npm run lint` | Run Oxlint on `src` and `vite.config.ts`. |
| `npm run preview` | Serve an existing production build locally. |

There is currently no automated test script configured.

## API integrations

API requests are defined in `src/services/` and consumed through TanStack Query hooks in `src/hooks/`.

| API | Current use |
| --- | --- |
| Countries.dev (`countries.dev/countries` and `countries.dev/alpha/:alpha3Code`) | Country lists and individual country facts, including flags, capitals, regions, population, coordinates, languages, and currencies. |
| Open-Meteo Geocoding (`geocoding-api.open-meteo.com/v1/search`) | Look up capital-city coordinates and select a result matching the country name. |
| Open-Meteo Forecast (`api.open-meteo.com/v1/forecast`) | Fetch current weather and seven days of daily forecast data. The interface currently displays current conditions only. |
| English Wikipedia REST API (`en.wikipedia.org/api/rest_v1/page/summary/:name`) | Fetch a country introduction and article link. The response may include a thumbnail, but the interface does not currently display it. |

The country service currently uses **Countries.dev**. The planned REST Countries v5 migration has not been implemented.

Country, geocoding, and Wikipedia queries use an infinite stale time; weather queries use a 15-minute stale time.

## Project structure

```text
src/
├── components/
│   ├── countries/    # Country cards, search form, and region filter
│   ├── ui/           # Reusable shadcn/ui components
│   ├── layout/       # Placeholder for shared layout work
│   └── details/      # Placeholder for detail components
├── hooks/            # TanStack Query hooks for API data
├── lib/              # Shared utilities, including class-name merging
├── pages/            # CountriesPage and CountryDetailsPage
├── services/         # HTTP requests to external APIs
├── types/            # TypeScript interfaces for API data
├── utils/            # Weather-code descriptions
├── assets/           # Asset directory
├── data/             # Placeholder for local data
├── App.tsx           # List and country-detail route definitions
├── main.tsx          # React entry point, router, and QueryClient provider
└── index.css         # Global styles and theme
```

`vite.config.ts` configures React, Tailwind, and the `@/` source alias. `components.json` contains shadcn/ui configuration.

## Environment variables

**No environment variables or API keys are currently required.** The services use public API endpoints defined directly in the source code, and the application does not currently read environment variables.

`.env.example` contains configuration notes only; creating a `.env` file is not necessary to run the application. Never place credentials or secrets in frontend configuration: Vite variables prefixed with `VITE_` are exposed to the browser.

## Project status

Atlas is under active development as a school final project. The features above are implemented in the current source code; live API availability and browser behavior have not been verified as part of this documentation update.

Planned work includes the REST Countries v5 migration, shared navigation and layout, and further responsive-design and accessibility review. The seven-day forecast is fetched but is not yet presented in the interface.

The latest local checks found a pre-existing TypeScript error: an unused `GeocodingData` import in `src/services/geocodingService.ts` prevents `npm run build` from completing. Lint completes with existing warnings. These issues are separate from this documentation update.

[PROJECT-PLAN.md](PROJECT-PLAN.md) and [TASKS.md](TASKS.md) contain earlier planning notes and may lag behind the current implementation.

### AI assistance

ChatGPT and OpenAI Codex have been used as development support for planning, explanations, debugging, code review, component configuration, refactoring, and documentation. The project author remains responsible for understanding and validating the code.
