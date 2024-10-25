import useWeather from "../hooks/useWeather";
import useWeatherDetails from "../hooks/useWeatherDetails";
import {
  getBackgroundById,
  roundTemperature
} from "../utils/helpers";
import { WeatherIcon } from "./WeatherIcon";

interface WeatherCardProps {
  city: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  // custom hook
  const { weather, loading, error } = useWeather(city);
  // custom hook
  const {
    weatherId,
    localCurrentTime,
    localSunriseTime,
    localSunsetTime,
    isItNight,
  } = useWeatherDetails(weather);

  if (loading) return <p>Loading weather for {city}...</p>;
  if (error) return <p>{error}</p>;

  const backgroundStyle = {
    background: getBackgroundById(
      weatherId, isItNight
    ),
    color: !isItNight ? "black" : "white", // Ensure text is readable
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return weather ? (
    <div className={`card text-start`} style={{ ...backgroundStyle }}>
      <div className="card-header">
        <h3 className="card-title d-flex justify-content-between">
          {city} {isItNight && <i className="bi bi-moon-fill"/>}
        </h3>
        <p className="h6">
          <i className="bi bi-clock me-1"/>{localCurrentTime}
        </p>
      </div>
      <div className="card-body">
        <div className="container d-flex justify-content-center mb-4 mt-1">
          <WeatherIcon weatherIcon={weather.weather[0].icon} color="white" size={70} animate={true}/>
        </div>
        <div className="row row d-flex align-items-center mt-2">
          <div className="col">
            <p>
              <i className="bi bi-thermometer-low me-1"></i> {roundTemperature(weather.main.temp)}{" "}
              °C
            </p>
          </div>
          <div className="col">
            <p>
              <i className="bi bi-wind me-1"></i> {weather.wind.speed} m/s
            </p>
          </div>
        </div>
        <div className="row row d-flex align-items-center mt-3">
          <div className="col">
            {" "}
            <p>
              <i className="bi bi-sunrise me-1"></i> {localSunriseTime}
            </p>
          </div>
          <div className="col">
            <p>
              <i className="bi bi-sunset me-1"></i> {localSunsetTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
