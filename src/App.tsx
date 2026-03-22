import { useEffect, useState } from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { WeatherDisplay } from './components/WeatherDisplay';
import type { Theme, WeatherData } from './types/Weather';

type GeoLocation = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};

type OpenWeatherResponse = {
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
};

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [query, setQuery] = useState<string>('');
  const [searchCity, setSearchCity] = useState<string>('Recife');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!searchCity.trim()) return;

    let cancelled = false;

    const fetchWeather = async () => {
      if (!API_KEY) {
        setError('Erro ao encontrar a chave da API.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            searchCity
          )}&limit=1&appid=${API_KEY}`
        );

        if (!geoResponse.ok) {
          throw new Error('Erro ao buscar a localização da cidade.');
        }

        const geoData: GeoLocation[] = await geoResponse.json();

        if (geoData.length === 0) {
          throw new Error('Cidade não encontrada.');
        }

        const location = geoData[0];

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=pt_br`
        );

        if (!weatherResponse.ok) {
          throw new Error('Erro ao buscar os dados meteorológicos.');
        }

        const weatherData: OpenWeatherResponse = await weatherResponse.json();

        const formattedWeather: WeatherData = {
          city: location.state
            ? `${location.name}, ${location.state}`
            : location.name,
          country: location.country,
          temperature: weatherData.main.temp,
          feelsLike: weatherData.main.feels_like,
          tempMin: weatherData.main.temp_min,
          tempMax: weatherData.main.temp_max,
          humidity: weatherData.main.humidity,
          windSpeed: weatherData.wind.speed,
          description:
            weatherData.weather[0]?.description ?? 'Sem descrição disponível',
        };

        if (!cancelled) {
          setWeather(formattedWeather);
        }
      } catch (err) {
        if (!cancelled) {
          setWeather(null);
          setError(
            err instanceof Error ? err.message : 'Ocorreu um erro inesperado.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [searchCity]);

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError('Digite o nome de uma cidade.');
      return;
    }

    setSearchCity(trimmedQuery);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <main className={`app ${theme}`}>
      <div className="container">
        <header className="header">
          <div>
            <h1>Painel Meteorológico</h1>
            <p>Consulte o clima atual de qualquer cidade.</p>
          </div>

          <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
        </header>

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        <WeatherDisplay weather={weather} loading={loading} error={error} />
      </div>
    </main>
  );
}

export default App;