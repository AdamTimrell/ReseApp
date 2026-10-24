import { useParams } from "react-router";
import { useCountryDetails } from "../hooks/useCountryDetails";
import { useGeocodingData } from "@/hooks/useGeocoding";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherDescription } from "@/utils/weatherCode";
import { useWikipediaData } from "@/hooks/useWikipediaData";

export function CountryDetailsPage() {
  const { alpha3Code } = useParams();
  const {
    data: country,
    isPending,
    error,
  } = useCountryDetails(alpha3Code ?? "");

  //Weather handling
  const { data: geocodingData } = useGeocodingData(country?.capital ?? "");
  const matchingLocation = geocodingData?.results?.find(
    (result) => result.country === country?.name,
  );
  const latitude = matchingLocation?.latitude ?? country?.latlng?.[0];
  const longitude = matchingLocation?.longitude ?? country?.latlng?.[1];
  //Weather error handling
  const {
    data: weatherData,
    isPending: isWeatherPending,
    error: weatherError,
  } = useWeather(latitude, longitude);

  //wikipedia error handling
  const {
    data: wikipediaData,
    isPending: isWikipediaPending,
    error: wikipediaError,
  } = useWikipediaData(country?.name ?? "");
  {
    //error handling
    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!country) {
      return (
        <main>
          <p>Country not found.</p>
        </main>
      );
    }

    return (
      <main>
        <h1>{country.name}</h1>
        <p>Native Name: {country.nativeName ?? "Not Available"}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name}`} />
        <p>Capital: {country.capital ?? "Not Available"}</p>
        <p>Region: {country.region ?? "Not Available"}</p>
        <p>Subregion: {country.subregion ?? "Not Available"}</p>
        <p>
          Area:{" "}
          {country.area != null
            ? country.area.toLocaleString() + " km²"
            : "Not Available"}
        </p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>
          Languages:{" "}
          {country.languages != null && country.languages.length > 0
            ? country.languages.map((lang) => lang.name).join(", ")
            : "Not Available"}
        </p>
        <p>
          Currencies:{" "}
          {country.currencies != null && country.currencies.length > 0
            ? country.currencies.map((currency) => currency.name).join(", ")
            : "Not Available"}
        </p>
        <section>
          <h2>Weather</h2>
          {isWeatherPending ? (
            <p>Loading Weather...</p>
          ) : weatherError ? (
            <p>Could not load Weather.</p>
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
        <p>
          Description:{" "}
          {isWikipediaPending ? (
            <span>Loading Description...</span>
          ) : wikipediaError ? (
            <span>Could not load Description.</span>
          ) : wikipediaData?.extract != null ? (
            <span>{wikipediaData.extract}</span>
          ) : (
            "Not Available"
          )}
        </p>
        {wikipediaData && (
          <a
            href={wikipediaData.content_urls.desktop.page}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on Wikipedia →
          </a>
        )}
      </main>
    );
  }
}
