# Elsewhere 🌍

Elsewhere är en webbapplikation där användaren kan utforska världens länder och få information om olika resmål. Applikationen är utvecklad som slutprojekt i kursen JavaScript 3.

## Funktioner

- Söka efter länder och filtrera efter världsdel och befolkningsmängd.
- Bläddra mellan länder med paginering.
- Visa landsinformation som huvudstad, språk, valuta och befolkning.
- Se aktuellt väder med temperatur, vindhastighet och väderbeskrivning.
- Läsa beskrivningar och se bilder från Wikipedia.
- Behålla sökningar och filter i URL:en vid navigering.
- Visa laddningsindikatorer och felmeddelanden med möjlighet att försöka igen.

## Tekniker och ramverk

Projektet är byggt med **React, TypeScript och Vite**. Jag valde React eftersom jag ville utveckla mina kunskaper inom komponentbaserad frontendutveckling och skapa en applikation med återanvändbara komponenter.

Jag har även använt Tailwind CSS och shadcn/ui för design, React Router för navigering och TanStack Query för API-anrop och cachning.

Applikationen använder följande API:er:

- **Countries.dev** – information om länder.
- **Open-Meteo** – geokodning och väderinformation.
- **Wikipedia** – landsbeskrivningar och bilder.

## Installation

För att köra projektet lokalt behöver du Node.js och npm installerat.

Klona projektet och installera beroenden:

```bash
git clone https://github.com/AdamTimrell/ReseApp.git
cd ReseApp
npm install
```

Starta utvecklingsservern:

```bash
npm run dev
```

Öppna sedan adressen som visas i terminalen, vanligtvis `http://localhost:5173`.

Inga API-nycklar eller miljövariabler krävs.

## Extra funktioner

Utöver grundfunktionerna har jag lagt till filtrering efter befolkningsmängd, luftfuktighet i väderinformationen och bilder från Wikipedia.

Jag hade från början implementerat en alternativ sökfunktion som fungerade annorlunda jämfört med den i pprojektbeskrivningen. Jag ville att enstaka länder skulle ta användaren till landets detaljsida för att användaren skulle slippa extra klick. Jag valde att inte inkludera filtrering när man sökte så att man fritt kan söka bland länder utan att behöva ta bort applicerade filter. Filtrena fungerade efter en sökning ifall man ville visa alla europeiska länder som börjar på "F". Jag valde tillslut att gå efter projektbeskrivningens sökfunktion då produktägaren har slutgiltiga ordet över hur sidan ska se ut. I en riktig utvecklingsmiljö kan man inte implementera de funktioner man anser passar bäst bara för att man känner för det utan det ska tas med produktägaren i första hand.

## Deployment

**Länk till applikationen:** (https://elsewhere-gamma-eight.vercel.app/)

## AI-användning

Jag har använt ChatGPT och OpenAI Codex som stöd under utvecklingen. AI har hjälpt mig med planering, förklaringar, felsökning, kodgranskning, refaktorering och dokumentation.

Jag har använt verktygen både för att förstå nya koncept och för att få hjälp med delar av implementationen. Jag ansvarar själv för att granska och förstå den färdiga lösningen.

## Personlig reflektion

Detta var ett av de roligare projekten jag arbetat med sedan jag började studera frontend. Komponentbaserade kodningen ger ett naturligt sett att organisera koden på som passar mig bättre och hjälper mig att planera mitt projekt. Förr så har alltid projekten känts stora och matiga men denna gången var det mycket lättare att bara ta en funktion i taget.
Utöver detta var det också roligt att få arbeta i Tailwind. Jag har tidiagare arbetat med Boostrap som ger en mer färdiga komponenter jämfört med Tailwind. Jag var förvånad själv över hur mycket css som jag fortfarande kom ihåg.
Jag hade helst velat ha bättre bilder till landskorten som kanske visar landskap ifrån länderna. Det är nog den enda skillnaden jag hade gjort.
