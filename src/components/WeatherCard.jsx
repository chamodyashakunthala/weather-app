import { getWeatherInfo } from '../utils/weatherInfo';

function WeatherCard({ data, city }) {
    const { label, icon } = getWeatherInfo(data.weather_code);

    return (
        <div className="fade-in bg-white rounded-3xl px-8 py-10 shadow-xl shadow-slate-900/10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {city}
            </p>

            <p className="text-6xl mb-3 drop-shadow-sm">{icon}</p>

            <p
                className="text-6xl font-extrabold text-slate-900 leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
                {Math.round(data.temperature_2m)}°
                <span className="text-2xl font-semibold text-slate-400 align-top">C</span>
            </p>

            <span className="inline-block mt-4 px-4 py-1.5 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full tracking-wide">
                {label}
            </span>
        </div>
    );
}

export default WeatherCard;