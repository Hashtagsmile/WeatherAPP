import { useState, useEffect } from 'react';
import { fetchWeatherForecast, WeatherDataForecast } from '../api/weatherApi';


const useForecast = (lat: number, lon: number) => {
    const [forecast, setForecast] = useState<WeatherDataForecast[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getForecast = async () => {
            setLoading(true);
            try {
                const response = await fetchWeatherForecast(lat, lon);
                console.log("UseForecast hook response", response);
                setForecast(response);
                setError(null);
            } catch (error) {
                setError("Failed to fetc forecast data");
            } finally {
                setLoading(false);
            }
        };
        if(lat && lon) {
            getForecast();
        }
        getForecast();
    }, [lat, lon]);

    return { forecast, loading, error };

}

export default useForecast;