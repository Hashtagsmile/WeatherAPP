import { convertToLocalTime, isNight } from "../utils/helpers";


interface WeatherDetails {
    weatherId: number,
    localCurrentTime: string;
    localSunriseTime: string;
    localSunsetTime: string;
    isItNight: boolean;

}

// Custom hook to extract and process weather details
const useWeatherDetails = (weather: any): WeatherDetails  => {
  const weatherId = weather ? weather.weather[0].id : 800;
  const currentTime = weather?.dt || 0; // Current time in Unix timestamp
  const sunriseTime = weather?.sys.sunrise || 0; // Sunrise in Unix timestamp
  const sunsetTime = weather?.sys.sunset || 0; // Sunset in Unix timestamp
  const timezone = weather?.timezone || 0;

  // Convert the times using the helper function
  const localCurrentTime = convertToLocalTime(currentTime, timezone);
  const localSunriseTime = convertToLocalTime(sunriseTime, timezone);
  const localSunsetTime = convertToLocalTime(sunsetTime, timezone);

  // Check if it is night
  const isItNight = isNight(currentTime, sunriseTime, sunsetTime);

  return {
    weatherId,
    localCurrentTime,
    localSunriseTime,
    localSunsetTime,
    isItNight,
  };
}

export default useWeatherDetails;