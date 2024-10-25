import { WeatherDataForecast } from "../api/weatherApi";
import { getDayOfWeek, roundTemperature } from "../utils/helpers";
import { WeatherIcon } from "./WeatherIcon";

interface ForecastComponentProps {
  forecast: WeatherDataForecast[];
  currentDay: string;
  dayTime: number;
  timezone: number;
}

const ForecastComponent: React.FC<ForecastComponentProps> = ({
  forecast,
  currentDay,
  timezone,
}) => {
  // Helper to group the forecast data by day and get the highest temperature
  const groupForecastByDay = (forecast: WeatherDataForecast[]) => {
    const grouped: { [key: string]: WeatherDataForecast[] } = {};

    forecast.forEach((entry) => {
      const dayFormat = getDayOfWeek(entry.dt, timezone); // Get the day for each of the 8 timestamps per day
      if (!grouped[dayFormat]) {
        grouped[dayFormat] = [];
      }
      grouped[dayFormat].push(entry);
    });
    console.log(grouped);
    return grouped;
  };

  // Get the highest temperature of the day
  const getHighestTemp = (dayData: WeatherDataForecast[]) => {
    return roundTemperature(
      Math.max(...dayData.map((entry) => entry.main.temp_max))
    );
  };

  // Filter out today's forecast and only include forecasts from tomorrow onwards
  const filteredForecast = (grouped: {
    [key: string]: WeatherDataForecast[];
  }) => {
    return Object.fromEntries(
      Object.entries(grouped).filter(([day, data]) => {
        console.log("day", day);
        console.log("data", data);
        return day !== currentDay; // Only include dates that are not today
      })
    ); // Return an object without today's forecast
  };

  const groupedForecast = groupForecastByDay(forecast);
  const forecastForNextFiveDays = filteredForecast(groupedForecast);

  return (
    <div className="d-flex flex-row justify-content-evenly flex-grow-1 gap-4">
      {Object.entries(forecastForNextFiveDays).map(([day, dayData], index) => (
        <div key={index} className="container text-center">
          <strong>{day}</strong>
          <p className="pt-3">{getHighestTemp(dayData)} °C</p>
          <WeatherIcon
            weatherIcon={dayData[0].weather[0].icon}
            size={30}
            animate={true}
            color={"grey"}
          />
          <p>{dayData[0].weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastComponent;
