import React from "react";
import type { WeatherData } from "../types/type";
//@ts-ignore
import ReactAnimatedWeather from "react-animated-weather";
import "../index.css";

interface Props {
  data: WeatherData;
}

const iconMap: Record<string, string> = {
  "sunny": "CLEAR_DAY",
  "clear": "CLEAR_DAY",
  "clear night": "CLEAR_NIGHT",
  "partly cloudy": "PARTLY_CLOUDY_DAY",
  "partly cloudy night": "PARTLY_CLOUDY_NIGHT",
  "cloudy": "CLOUDY",
  "overcast": "CLOUDY",
  "mist": "FOG",
  "fog": "FOG",
  "patchy rain possible": "RAIN",
  "patchy snow possible": "SNOW",
  "patchy sleet possible": "SLEET",
  "patchy freezing drizzle possible": "SLEET",
  "thundery outbreaks possible": "SLEET",
  "blowing snow": "SNOW",
  "blizzard": "SNOW",
  "freezing fog": "FOG",
  "patchy light drizzle": "RAIN",
  "light drizzle": "RAIN",
  "freezing drizzle": "SLEET",
  "heavy freezing drizzle": "SLEET",
  "patchy light rain": "RAIN",
  "light rain": "RAIN",
  "moderate rain at times": "RAIN",
  "moderate rain": "RAIN",
  "heavy rain at times": "RAIN",
  "heavy rain": "RAIN",
  "light snow": "SNOW",
  "moderate snow": "SNOW",
  "heavy snow": "SNOW",
  "ice pellets": "SLEET",
  "light sleet": "SLEET",
  "moderate or heavy sleet": "SLEET",
  "patchy light snow": "SNOW",
  "light snow showers": "SNOW",
  "moderate or heavy snow showers": "SNOW",
  "patchy light rain with thunder": "RAIN",
  "moderate or heavy rain with thunder": "RAIN",
};

const WeatherCard: React.FC<Props> = ({ data }) => {
  if (!data || !data.weather || !data.weather[0] || !data.main) {
    return <div className="weather-card card">Data not available</div>;
  }

  const weatherType = data.weather[0].description.toLowerCase();
  const weatherIcon = iconMap[weatherType] || "CLOUDY"; // Fallback to "CLOUDY" if no match

  return (
    <div className="weather-card card">
      <h2>{data.name}</h2>
      <div className="weather-icon">
        <ReactAnimatedWeather
          icon={weatherIcon}
          color="#1E90FF"
          size={72}
          animate={true}
        />
        {weatherType.includes("rain") && <div className="rain"></div>}
        {weatherType.includes("snow") && <div className="snow"></div>}
        {weatherType.includes("clear") && <div className="sun-rays"></div>}
      </div>
      <p className="temperature">{Math.round(data.main.temp)}°C</p>
      <p className="description">{data.weather[0].description}</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>💨 Wind: {data.wind.speed.toFixed(1)} m/s</p>
    </div>
  );
};

export default WeatherCard;
