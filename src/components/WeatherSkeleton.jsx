function WeatherSkeleton() {
    return (
        <div className="weather-card">
            <div className="skeleton skeleton-text-sm"></div>
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-text-lg"></div>
            <div className="skeleton skeleton-text-sm"></div>
        </div>
    );
}

export default WeatherSkeleton;