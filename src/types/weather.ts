export interface WeatherData {
  current: {
    temperature_2m: number | null;
    relative_humidity_2m: number | null;
    apparent_temperature: number | null;
    weather_code: number | null;
    wind_speed_10m: number | null;
  };
  daily: {
    time: string[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    weather_code: (number | null)[];
    precipitation_probability_max: (number | null)[];
  };
}
