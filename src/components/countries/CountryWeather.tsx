import type { CountryDetails } from "@/types/countryDetails";
import { useGeocodingData } from "@/hooks/useGeocodingData";
import { useWeather } from "@/hooks/useWeather";
import {
  getWeatherDescription,
  getWeatherIconComponent,
} from "@/utils/weatherCode";
import { Button } from "@/components/ui/button";
import { CloudSun, Droplets, Wind, CircleHelp } from "lucide-react";
import { createElement } from "react";

interface CountryWeatherProps {
  country: CountryDetails;
}

export function CountryWeather({ country }: CountryWeatherProps) {
  // GEOKODNING: Söker huvudstadens koordinater med landets tvåbokstavskod
  const {
    data: geocodingData,
    isPending: isGeocodingPending,
    error: geocodingError,
    refetch: refetchGeocoding,
  } = useGeocodingData(country.capital ?? "", country.alpha2Code);
  const matchingLocation = geocodingData?.results?.[0];

  // KOORDINATER: Väntar på geokodning och använder landets koordinater som reserv
  const shouldWaitForGeocoding =
    Boolean(country.capital?.trim()) && isGeocodingPending;

  const latitude = shouldWaitForGeocoding
    ? undefined
    : (matchingLocation?.latitude ?? country.latlng?.[0]);

  const longitude = shouldWaitForGeocoding
    ? undefined
    : (matchingLocation?.longitude ?? country.latlng?.[1]);
  const hasCoordinates = latitude !== undefined && longitude !== undefined;

  // VÄDER: Hämtar väderdata baserat på valda koordinater
  const {
    data: weatherData,
    isPending: isWeatherPending,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeather(latitude, longitude);
  const weatherCode = weatherData?.current.weather_code;
  const WeatherIcon =
    weatherCode != null ? getWeatherIconComponent(weatherCode) : CircleHelp;
  return (
    <section className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center gap-2">
        <CloudSun
          className="h-6 w-6 shrink-0 text-teal-700"
          aria-hidden="true"
        />
        <h2 className="text-xl font-bold text-slate-900">
          Vädret i {country.capital || country.name}
        </h2>
      </div>

      {/* VÄDERSTATUS: Hanterar saknade koordinater, laddning och fel med nytt försök */}
      {!shouldWaitForGeocoding && !hasCoordinates ? (
        geocodingError ? (
          <div className="space-y-4">
            <p role="alert" className="text-slate-600">
              Kunde inte hämta koordinater för väderinformationen.
            </p>
            <Button type="button" onClick={() => refetchGeocoding()}>
              Försök igen
            </Button>
          </div>
        ) : (
          <p className="text-slate-600">
            Väderinformation är inte tillgänglig för detta land.
          </p>
        )
      ) : shouldWaitForGeocoding || isWeatherPending ? (
        <div role="status" className="flex items-center gap-3 text-slate-600">
          <div
            className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700"
            aria-hidden="true"
          />
          <p>Laddar väder...</p>
        </div>
      ) : weatherError ? (
        <div className="space-y-4">
          <p role="alert" className="text-slate-600">
            Kunde inte ladda väder.
          </p>
          <Button type="button" onClick={() => refetchWeather()}>
            Försök igen
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* VÄDER: Visar aktuell temperatur, väderikon och väderbeskrivning */}
          <div className="rounded-xl bg-teal-50 p-5">
            <div className="flex items-center gap-4">
              {createElement(WeatherIcon, {
                className: "h-12 w-12 shrink-0 text-teal-700",
                "aria-hidden": true,
              })}

              <div>
                <p className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  {weatherData?.current.temperature_2m != null
                    ? `${weatherData.current.temperature_2m}°C`
                    : "Ej tillgängligt"}
                </p>

                <p className="mt-2 text-slate-600">
                  {weatherData?.current.weather_code != null
                    ? getWeatherDescription(weatherData.current.weather_code)
                    : "Ej tillgängligt"}
                </p>
              </div>
            </div>
          </div>

          {/* VÄDERDATA: Visar luftfuktighet och vindhastighet */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <Droplets
                className="mb-3 h-5 w-5 text-teal-700"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-500">Luftfuktighet</p>
              <p className="mt-1 font-semibold text-slate-900">
                {weatherData?.current.relative_humidity_2m != null
                  ? `${weatherData.current.relative_humidity_2m}%`
                  : "Ej tillgängligt"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <Wind className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
              <p className="text-sm text-slate-500">Vindhastighet</p>
              <p className="mt-1 font-semibold text-slate-900">
                {weatherData?.current.wind_speed_10m != null
                  ? `${weatherData.current.wind_speed_10m} km/h`
                  : "Ej tillgängligt"}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
