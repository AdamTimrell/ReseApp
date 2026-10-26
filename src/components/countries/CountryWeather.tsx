import type { CountryDetails } from "@/types/countryDetails";
import { useGeocodingData } from "@/hooks/useGeocoding";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherDescription } from "@/utils/weatherCode";
import { Button } from "@/components/ui/button";

interface CountryWeatherProps {
  country: CountryDetails;
}

export function CountryWeather({ country }: CountryWeatherProps) {
  //Weather handling
  const { data: geocodingData } = useGeocodingData(country.capital ?? "");
  const matchingLocation = geocodingData?.results?.find(
    (result) => result.country === country.name,
  );
  const latitude = matchingLocation?.latitude ?? country.latlng?.[0];
  const longitude = matchingLocation?.longitude ?? country.latlng?.[1];
  //Weather error handling
  const {
    data: weatherData,
    isPending: isWeatherPending,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeather(latitude, longitude);

  return (
    <section>
      <h2>Weather</h2>
      {isWeatherPending ? (
        <p>Loading Weather...</p>
      ) : weatherError ? (
        <div>
          <p>Could not load Weather.</p>
          <Button type="button" onClick={() => refetchWeather()}>
            Refetch Weather
          </Button>
        </div>
      ) : (
        <div>
          <p>
            Temperature:{""}
            {weatherData?.current.temperature_2m != null ? (
              <span>{weatherData?.current.temperature_2m}°C</span>
            ) : (
              <span>Not Available</span>
            )}
          </p>
          <p>
            Weather Description:{" "}
            {weatherData?.current.weather_code != null ? (
              <span>
                {getWeatherDescription(weatherData.current.weather_code)}
              </span>
            ) : (
              "Not Available"
            )}
          </p>
          <p>
            Humidity:{" "}
            {weatherData?.current.relative_humidity_2m != null
              ? `${weatherData.current.relative_humidity_2m}%`
              : "Not Available"}
          </p>
          <p>
            Wind Speed:{" "}
            {weatherData?.current.wind_speed_10m != null
              ? `${weatherData.current.wind_speed_10m} km/h`
              : "Not Available"}
          </p>
        </div>
      )}
    </section>
  );
}
