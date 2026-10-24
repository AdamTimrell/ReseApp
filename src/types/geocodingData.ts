export interface GeocodingData {
  results?: {
    name: string;
    latitude: number;
    longitude: number;
    country_code: string;
    country: string;
  }[];
}
