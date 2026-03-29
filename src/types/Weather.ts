export type Theme = 'light' | 'dark';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export interface GeoLocation {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface OpenWeatherResponse {
  weather: Array<{
    description: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}