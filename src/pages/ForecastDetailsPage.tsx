import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { useFetch } from '../hooks/useFetch';
import type {
  GeoLocation,
  OpenWeatherResponse,
  WeatherData,
} from '../types/Weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function ForecastDetailsPage() {
  const { city } = useParams<{ city: string }>();

  const decodedCity = city ? decodeURIComponent(city) : '';

  const geoUrl = decodedCity
    ? `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        decodedCity
      )}&limit=1&appid=${API_KEY}`
    : null;

  const {
    data: geoData,
    isLoading: isGeoLoading,
    error: geoError,
  } = useFetch<GeoLocation[]>(geoUrl);

  const selectedLocation = geoData && geoData.length > 0 ? geoData[0] : null;

  const weatherUrl = selectedLocation
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&appid=${API_KEY}&units=metric&lang=pt_br`
    : null;

  const {
    data: weatherResponse,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useFetch<OpenWeatherResponse>(weatherUrl);

  const weather = useMemo<WeatherData | null>(() => {
    if (!selectedLocation || !weatherResponse) return null;

    return {
      city: selectedLocation.state
        ? `${selectedLocation.name}, ${selectedLocation.state}`
        : selectedLocation.name,
      country: selectedLocation.country,
      temperature: weatherResponse.main.temp,
      feelsLike: weatherResponse.main.feels_like,
      tempMin: weatherResponse.main.temp_min,
      tempMax: weatherResponse.main.temp_max,
      humidity: weatherResponse.main.humidity,
      windSpeed: weatherResponse.wind.speed,
      description:
        weatherResponse.weather[0]?.description ?? 'Sem descrição disponível',
    };
  }, [selectedLocation, weatherResponse]);

  const error =
    geoError ||
    weatherError ||
    (geoData && geoData.length === 0 ? 'Cidade não encontrada.' : '');

  const isLoading = isGeoLoading || isWeatherLoading;

  return (
    <section>
      <h1>Detalhes da previsão</h1>
      <p>Cidade pesquisada: {decodedCity || 'não informada'}</p>

      <WeatherDisplay weather={weather} isLoading={isLoading} error={error} />
    </section>
  );
}