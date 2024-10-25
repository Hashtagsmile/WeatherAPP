import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; // API Key stored in environment variables
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// Interface for current weather data
export interface WeatherData {
    name: string,
    coord: {
        lon: number,
        lat: number
    },
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        humidity: number,
    },
    weather: {
        id: number,
        main: string
        description: string,
        icon: string,
    }[],
    wind: {
        speed: number,
        deg: number,
    },
    dt: number,
    sys: {
        sunrise: number,
        sunset: number
    },
    timezone: number
}


export interface WeatherDataForecast {
    dt: number; // Forecast date (Unix timestamp)
    timezone: number,
    main: {
        temp_max: number; // Maximum temperature of the day
    };
    weather: {
        description: string; // Weather condition description (clear sky, few clouds, etc.)
        icon: string; // Weather icon ID
    }[];
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric"
            }
        });
        console.log("FetchWeaterData: ", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data');
    }
}

export const fetchWeatherForecast = async (lat: number, lon: number): Promise<WeatherDataForecast[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY,
                units: "metric"
            }
        });
        console.log("FetchWeaterDataForecast: ", response.data.list);
        return response.data.list; // Assuming the forecast data is in 'list'
    } catch (error) {
        throw new Error('Error fetching weather forecast data');
    }
}