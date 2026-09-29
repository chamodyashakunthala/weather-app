import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherSkeleton from './components/WeatherSkeleton';
import WeatherBackground from './components/WeatherBackground';
import { getWeatherInfo } from './utils/weatherInfo';
import './App.css';

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Colombo');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function fetchWeather(cityName) {
        setLoading(true);
        setError('');

        try {
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
            );
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                setError(`Could not find "${cityName}".`);
                setWeather(null);
                setLoading(false);
                return;
            }

            const { latitude, longitude, name } = geoData.results[0];

            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
            );
            const weatherData = await weatherRes.json();

            setWeather(weatherData.current);
            setCity(name);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const theme = weather ? getWeatherInfo(weather.weather_code).theme : 'default';

    return (
        <div className={`page theme-${theme}`}>
            <WeatherBackground theme={theme} />

            <div className="app">
                <h1>Weather</h1>
                <SearchBar onSearch={fetchWeather} />

                {loading && <WeatherSkeleton />}
                {error && <p className="status-text error">{error}</p>}
                {!loading && !error && weather && (
                    <WeatherCard data={weather} city={city} />
                )}
            </div>
        </div>
    );
}

export default App;