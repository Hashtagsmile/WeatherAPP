import { useState, useEffect } from 'react';
import { fetchWeatherData, WeatherData } from '../api/weatherApi';

const useWeather = (city: string) => {
    const[weather, setWeather] = useState<WeatherData | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                setLoading(true);
                const data = await fetchWeatherData(city);
                setWeather(data);
                setLastUpdated(new Date());
            } catch (error) {
                setError("Failed to fetch weather data");
            }
            finally {
                setLoading(false);
            }
        };

        getWeather();
    },[city]);

    return { weather, loading, error, lastUpdated };
}

export default useWeather;