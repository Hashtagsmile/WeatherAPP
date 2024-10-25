import ReactAnimatedWeather from "react-animated-weather";

interface WeatherIconProps {
  weatherIcon: string;
  size: number;
  animate: boolean;
  color: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  weatherIcon,
  size,
  animate,
  color,
}) => {
  const codeMapping: Record<string, string> = {
    "01d": "CLEAR_DAY",
    "01n": "CLEAR_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "03d": "PARTLY_CLOUDY_DAY",
    "03n": "PARTLY_CLOUDY_NIGHT",
    "04d": "CLOUDY",
    "04n": "CLOUDY",
    "09d": "RAIN",
    "09n": "RAIN",
    "10d": "RAIN",
    "10n": "RAIN",
    "11d": "RAIN",
    "11n": "RAIN",
    "13d": "SNOW",
    "13n": "SNOW",
    "50d": "FOG",
    "50n": "FOG",
  };

  // Fallback if weatherIcon is not found
  const iconCode = codeMapping[weatherIcon] || "CLEAR_DAY";

  return (
    <ReactAnimatedWeather
      icon={iconCode}
      size={size}
      animate={animate}
      color={color}
    />
  );
};
