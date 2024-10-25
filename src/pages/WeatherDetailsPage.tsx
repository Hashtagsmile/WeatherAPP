import { useParams } from "react-router-dom";
import useWeather from "../hooks/useWeather";
import useWeatherDetails from "../hooks/useWeatherDetails";
import MapComponent from "../components/MapComponent";
import {
  getWindDirection,
  getDayOfWeek,
  getLastUpdatedMessage,
  roundTemperature,
} from "../utils/helpers";
import { WeatherIcon } from "../components/WeatherIcon";
import useForecast from "../hooks/useForecast";
import ForecastComponent from "../components/ForeCastComponent";

export const WeatherDetailPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const { weather, loading, error, lastUpdated } = useWeather(city || "");
  const {
    forecast,
    loading: forecastLoading,
    error: forecastError,
  } = useForecast(weather?.coord.lat, weather?.coord.lon);

  const { localCurrentTime, localSunriseTime, localSunsetTime, isItNight } =
    useWeatherDetails(weather);

  const capitalizeWords = (description: string) => {
    const words = description.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return capitalizedWords.join(" ");
  };

  const day = getDayOfWeek(weather?.dt, weather?.timezone);
  

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return weather ? (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          {/* Card header container */}
          <div className="container d-flex justify-content-between mb-2 align-items-center">
            <div>
              <h2 className="card-title d-flex flex-start pb-2">
                {weather.name}
              </h2>
              <h6 className="card-subtitle mb-2 text-body-secondary d-flex flex-start">
                <p className="card-subtitle me-2">
                  {day}
                </p>
                <p className="card-subtitle">
                  {localCurrentTime}
                  <span className="ms-2 me-2 text-black text-opacity-25">
                    |
                  </span>
                </p>
                {isItNight ? (
                  <p className="card-subtitle">
                    {" "}
                    Night-time
                    <i className="bi bi-moon-fill ms-2" />
                  </p>
                ) : (
                  <p className="card-subtitle">
                    Day-time <i className="bi bi-sun-fill ms-2" />{" "}
                  </p>
                )}
                <p className="card-subtitle me-2">
                  <span className="ms-2 me-2 text-black text-opacity-25">
                    |
                  </span>
                  <i className="bi bi-sunrise me-1" /> {localSunriseTime}
                </p>
                <p className="card-subtitle">
                  <span className="ms-2 me-2 text-black text-opacity-25">
                    |
                  </span>
                  <i className="bi bi-sunset me-1" /> {localSunsetTime}
                </p>
              </h6>
            </div>
          </div>

          {/* Card body container */}
          <div className="container text-start ms-2">
            <div className="row">
              <div className="col d-flex flex-column justify-content-center">
                <div className="d-flex gap-3 align-items-center">
                  <WeatherIcon
                    weatherIcon={weather.weather[0].icon}
                    size={40}
                    animate={true}
                    color="black"
                  />
                  <p className="h2 text-center">
                  {roundTemperature(weather.main.temp)}
                  <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>
                    °C
                  </span>
                  </p>
                </div>
                <h6 className="card-subtitle text-body-secondary mb-4 mt-2">
                  Feels like {roundTemperature(weather.main.feels_like)}{" "}
                  <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>
                    °C
                  </span>
                  {capitalizeWords(weather.weather[0].description)}{" "}
                </h6>
                <div className="border-3 border-start border-primary ps-3">
                  <p className="card-text text-body-secondary">
                    Highest temp:{" "}
                    <span className="text-black">
                      {roundTemperature(weather.main.temp_max)} °C
                    </span>{" "}
                  </p>
                  <p className="card-text text-body-secondary">
                    Lowest temp:{" "}
                    <span className="text-black">
                      {roundTemperature(weather.main.temp_min)} °C
                    </span>{" "}
                  </p>
                  <p className="card-text text-body-secondary">
                    Humidity:{" "}
                    <span className="text-black">{weather.main.humidity}%</span>
                  </p>
                  <p className="card-text text-body-secondary">
                    Wind Speed:{" "}
                    <span className="text-black">
                      {weather.wind.speed} m/s{" "}
                      {getWindDirection(weather.wind.deg)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col">
                <MapComponent
                  lat={weather.coord.lat}
                  lon={weather.coord.lon}
                  city={weather.name}
                />
              </div>
            </div>
            <div className="container mt-5 mb-4">
              <p> 5 day forecast </p>
              <div className="d-flex">
              {forecastLoading && <p>Loading forecast...</p>}
              {forecastError && !forecast && <p> {forecastError}</p>}
              {forecast &&
                <ForecastComponent forecast={forecast} currentDay={day} dayTime={weather.dt} timezone={weather.timezone} />}
                </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <small className="text-body-secondary">
            {getLastUpdatedMessage(lastUpdated)}
          </small>
        </div>
      </div>
    </div>
  ) : null;
};
