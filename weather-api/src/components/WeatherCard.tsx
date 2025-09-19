import React from "react";
import type { WeatherData } from "../types/type";
//@ts-ignore
import ReactAnimatedWeather from "react-animated-weather";
import "../index.css";

interface Props {
    data: WeatherData;
}

// Map WeatherAPI descriptions to ReactAnimatedWeather icons
const iconMap: Record<string, string> = {
    "Sunny": "CLEAR_DAY",
    "Clear": "CLEAR_DAY",
    "Clear night": "CLEAR_NIGHT",
    "Partly cloudy": "PARTLY_CLOUDY_DAY",
    "Partly cloudy night": "PARTLY_CLOUDY_NIGHT",
    "Cloudy": "CLOUDY",
    "Overcast": "CLOUDY",
    "Mist": "FOG",
    "Fog": "FOG",
    "Patchy rain possible": "RAIN",
    "Patchy snow possible": "SNOW",
    "Patchy sleet possible": "SLEET",
    "Patchy freezing drizzle possible": "SLEET",
    "Thundery outbreaks possible": "SLEET",
    "Blowing snow": "SNOW",
    "Blizzard": "SNOW",
    "Freezing fog": "FOG",
    "Patchy light drizzle": "RAIN",
    "Light drizzle": "RAIN",
    "Freezing drizzle": "SLEET",
    "Heavy freezing drizzle": "SLEET",
    "Patchy light rain": "RAIN",
    "Light rain": "RAIN",
    "Moderate rain at times": "RAIN",
    "Moderate rain": "RAIN",
    "Heavy rain at times": "RAIN",
    "Heavy rain": "RAIN",
    "Light snow": "SNOW",
    "Moderate snow": "SNOW",
    "Heavy snow": "SNOW",
    "Ice pellets": "SLEET",
    "Light sleet": "SLEET",
    "Moderate or heavy sleet": "SLEET",
    "Patchy light snow": "SNOW",
    "Light snow showers": "SNOW",
    "Moderate or heavy snow showers": "SNOW",
    "Patchy light rain with thunder": "RAIN",
    "Moderate or heavy rain with thunder": "RAIN",
};


const WeatherCard: React.FC<Props> = ({ data }) => {
    const weatherType = data.weather[0].description.toLowerCase();
    const weatherIcon = iconMap[weatherType] || "CLOUDY";

    return (
        <div className="weather-card card">
            <h2>{data.name}</h2>
            <div className="weather-icon">
                <ReactAnimatedWeather icon={weatherIcon} color="#1E90FF" size={72} animate={true} />
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
