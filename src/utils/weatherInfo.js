export function getWeatherInfo(code) {
    if (code === 0) return { label: 'Clear sky', icon: '☀️', theme: 'sunny' };
    if (code <= 3) return { label: 'Partly cloudy', icon: '⛅', theme: 'cloudy' };
    if (code <= 48) return { label: 'Foggy', icon: '🌫️', theme: 'foggy' };
    if (code <= 67) return { label: 'Rainy', icon: '🌧️', theme: 'rainy' };
    if (code <= 77) return { label: 'Snowy', icon: '❄️', theme: 'snowy' };
    if (code <= 82) return { label: 'Rain showers', icon: '🌦️', theme: 'rainy' };
    if (code <= 99) return { label: 'Thunderstorm', icon: '⛈️', theme: 'stormy' };
    return { label: 'Unknown', icon: '🌡️', theme: 'default' };
}