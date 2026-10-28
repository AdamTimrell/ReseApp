import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CircleHelp,
} from "lucide-react";

// VÄDERKODER: Översätter väderkod till svensk beskrivning
export function getWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return "Klart väder";
    case 1:
      return "Mestadels klart";
    case 2:
      return "Delvis molnigt";
    case 3:
      return "Mulet";
    case 45:
      return "Dimma";
    case 48:
      return "Dimma med rimfrost";
    case 51:
      return "Lätt duggregn";
    case 53:
      return "Måttligt duggregn";
    case 55:
      return "Kraftigt duggregn";
    case 56:
      return "Lätt underkylt duggregn";
    case 57:
      return "Kraftigt underkylt duggregn";
    case 61:
      return "Lätt regn";
    case 63:
      return "Måttligt regn";
    case 65:
      return "Kraftigt regn";
    case 66:
      return "Lätt underkylt regn";
    case 67:
      return "Kraftigt underkylt regn";
    case 71:
      return "Lätt snöfall";
    case 73:
      return "Måttligt snöfall";
    case 75:
      return "Kraftigt snöfall";
    case 77:
      return "Snökorn";
    case 80:
      return "Lätta regnskurar";
    case 81:
      return "Måttliga regnskurar";
    case 82:
      return "Kraftiga regnskurar";
    case 85:
      return "Lätta snöbyar";
    case 86:
      return "Kraftiga snöbyar";
    case 95:
      return "Åskväder";
    case 96:
      return "Åskväder med lätt hagel";
    case 99:
      return "Åskväder med kraftigt hagel";
    default:
      return "Okänt väderförhållande";
  }
}

// VÄDERIKONER: Väljer Lucide-ikon utifrån väderkod
export function getWeatherIconComponent(code: number) {
  switch (code) {
    case 0:
      return Sun;

    case 1:
    case 2:
      return CloudSun;

    case 3:
      return Cloud;

    case 45:
    case 48:
      return CloudFog;

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return CloudDrizzle;

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return CloudRain;

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return CloudSnow;

    case 95:
    case 96:
    case 99:
      return CloudLightning;

    default:
      return CircleHelp;
  }
}
