# Projektplan – Atlas

## Mål och gräns

Bygg själv en svensk reseapp för grundkraven i JavaScript 3. Startversionen innehåller
bara utvecklingsmiljö, providers, tomma mappar och texten "Atlas — Project ready". Inga VG-funktioner
eller extra formulär ingår. Arbeta i små steg och förklara varje lösning med egna ord.

## Föreslagen ordning

1. Definiera själv `Country` och skapa mockdata. Bygg sedan navbar, layout,
   HomePage, CountryList, CountryCard och grundläggande routes.
2. Implementera lokal sökning mot mockdata och kontrollera gränsfall.
3. Lägg till regionfilter, sedan sidindelning. Testa även tillfälliga data från fler regioner.
4. Synkronisera listans tillstånd med URL-parametrar och testa bakåt/framåt.
5. Undersök land-API:ets kontrakt, normalisera till `Country`, bygg tjänst och query-hook.
6. Koppla listan till query-hooken och hantera laddning, fel, tomt resultat och nytt försök.
7. Hämta ett land på detaljrouten och visa fakta med samma tillståndshantering.
8. Undersök huvudstadskoordinater/geokodning och anslut Open-Meteo.
9. Undersök Wikipedias språk, titlar och saknade artiklar; anslut introduktionen.
10. Granska mobilvy, tangentbord, kontrast, responsiva layouter och dokumentation.

## Ansvar

UI-komponenter visar data och användarval. Hooks hanterar serverdata med TanStack Query.
Tjänster ansvarar för HTTP och API-normalisering. Rena hjälpfunktioner hanterar
filtrering och formatering. Inför nya abstraktioner först när ett konkret behov finns.

## Klart för inlämning senare

Alla grundkrav fungerar, API-fel går att återhämta sig från, URL:er går att dela,
sidor fungerar på mobil och med tangentbord, och build/lint passerar. Kontrollera
alltid detta mot lärarens fullständiga uppgiftsbeskrivning. Gör egna commits när du vill.
