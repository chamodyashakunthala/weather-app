import { useMemo } from 'react';

function WeatherBackground({ theme }) {
    // Generate random positions/timings once per theme change, not on every render
    const drops = useMemo(() => {
        return Array.from({ length: 40 }, () => ({
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 0.6 + Math.random() * 0.6,
        }));
    }, [theme]);

    const clouds = useMemo(() => {
        return Array.from({ length: 4 }, () => ({
            top: 5 + Math.random() * 35,
            delay: Math.random() * 15,
            duration: 25 + Math.random() * 15,
        }));
    }, [theme]);

    if (theme === 'rainy' || theme === 'stormy') {
        return (
            <div className="weather-bg">
                {drops.map((d, i) => (
                    <span
                        key={i}
                        className="raindrop"
                        style={{
                            left: `${d.left}%`,
                            animationDelay: `${d.delay}s`,
                            animationDuration: `${d.duration}s`,
                        }}
                    ></span>
                ))}
                {theme === 'stormy' && <div className="lightning-flash"></div>}
            </div>
        );
    }

    if (theme === 'snowy') {
        return (
            <div className="weather-bg">
                {drops.slice(0, 25).map((d, i) => (
                    <span
                        key={i}
                        className="snowflake"
                        style={{
                            left: `${d.left}%`,
                            animationDelay: `${d.delay}s`,
                            animationDuration: `${2.5 + d.duration}s`,
                        }}
                    >❄</span>
                ))}
            </div>
        );
    }

    if (theme === 'sunny') {
        return (
            <div className="weather-bg">
                <div className="sun-glow"></div>
            </div>
        );
    }

    if (theme === 'cloudy' || theme === 'foggy') {
        return (
            <div className="weather-bg">
                {clouds.map((c, i) => (
                    <span
                        key={i}
                        className="drifting-cloud"
                        style={{
                            top: `${c.top}%`,
                            animationDelay: `${c.delay}s`,
                            animationDuration: `${c.duration}s`,
                        }}
                    >☁️</span>
                ))}
            </div>
        );
    }

    return null;
}

export default WeatherBackground;