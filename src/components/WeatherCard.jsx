import { getWeatherInfo } from '../utils/weatherInfo';

function WeatherCard({ data, city }) {
    const { label, icon } = getWeatherInfo(data.weather_code);

    return (
        <div className="weather-card fade-in">
            <p className="city-name">{city}</p>
            <p className="weather-icon">{icon}</p>
            <p className="temperature">{Math.round(data.temperature_2m)}°C</p>
            <p className="weather-label">{label}</p>
        </div>
    );
}

export default WeatherCard;