import type { WeatherData } from '../types/Weather';

type WeatherDisplayProps = {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string;
};

export function WeatherDisplay({
  weather,
  isLoading,
  error,
}: WeatherDisplayProps) {
  if (isLoading) {
    return <div className="card">Carregando dados meteorológicos...</div>;
  }

  if (error) {
    return <div className="card error-message">{error}</div>;
  }

  if (!weather) {
    return <div className="card">Nenhum dado meteorológico disponível.</div>;
  }

  return (
    <section className="card">
      <h2>
        {weather.city}, {weather.country}
      </h2>

      <p className="weather-description">{weather.description}</p>

      <div className="weather-grid">
        <div>
          <strong>Temperatura</strong>
          <p>{Math.round(weather.temperature)}°C</p>
        </div>

        <div>
          <strong>Sensação térmica</strong>
          <p>{Math.round(weather.feelsLike)}°C</p>
        </div>

        <div>
          <strong>Mínima</strong>
          <p>{Math.round(weather.tempMin)}°C</p>
        </div>

        <div>
          <strong>Máxima</strong>
          <p>{Math.round(weather.tempMax)}°C</p>
        </div>

        <div>
          <strong>Umidade</strong>
          <p>{weather.humidity}%</p>
        </div>

        <div>
          <strong>Vento</strong>
          <p>{weather.windSpeed} m/s</p>
        </div>
      </div>
    </section>
  );
}