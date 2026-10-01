import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherSkeleton from '../components/WeatherSkeleton';
import WeatherBackground from '../components/WeatherBackground';
import { getWeatherInfo } from '../utils/weatherInfo';

function saveToHistory(cityName, temperature, icon) {
    const existing = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    const filtered = existing.filter((item) => item.city !== cityName);
    const updated = [{ city: cityName, temperature, icon, time: Date.now() }, ...filtered];
    localStorage.setItem('weatherHistory', JSON.stringify(updated.slice(0, 8)));
}

function Home() {
    const [searchParams] = useSearchParams();
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

            const { icon } = getWeatherInfo(weatherData.current.weather_code);
            saveToHistory(name, Math.round(weatherData.current.temperature_2m), icon);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setLoading(false);
    }

    // On load, check if a city was passed via URL (?city=...) from the History page
    useEffect(() => {
        const cityFromUrl = searchParams.get('city');
        fetchWeather(cityFromUrl || city);
    }, []);

    const theme = weather ? getWeatherInfo(weather.weather_code).theme : 'default';

    return (
        <div className={`page theme-${theme}`}>
            <WeatherBackground theme={theme} />
            <div className="app">
                <div className="mb-8">
                   <h1 className="sky-text text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                   SkyCast
                   </h1>
                 <p className="text-sm text-slate-500 mt-1">Live weather, anywhere in the world.</p>
                 </div>
                <SearchBar onSearch={fetchWeather} />

                {loading && <WeatherSkeleton />}
                {error && <p className="text-sm text-red-600 mt-5">{error}</p>}
                {!loading && !error && weather && (
                    <WeatherCard data={weather} city={city} />
                )}
            </div>
        </div>
    );
}

export default Home;