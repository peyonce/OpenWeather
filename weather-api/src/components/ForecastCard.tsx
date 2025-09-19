import type { ForecastData } from "../types/type";
//@ts-ignore
import ReactAnimatedWeather from "react-animated-weather";
import "../index.css";

interface Props {
    data: ForecastData;
}

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

const ForecastCard: React.FC<Props> = ({ data }) => {
    const date = new Date(data.dt_txt);


    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });


    const hour = date.toLocaleString("en-US", { hour: "numeric", hour12: true });

    const weatherIcon = iconMap[data.weather[0].description] || "CLOUDY";

    return (
        <div className="card">
            <h3>{dayName}</h3>
            <p>{hour}</p>

            <ReactAnimatedWeather
                icon={weatherIcon}
                color="#1E90FF"
                size={48}
                animate={true}
            />

            <p>{Math.round(data.main.temp)}°C</p>
            <p>💧 {data.main.humidity}%</p>
            <p>💨 {data.wind.speed.toFixed(1)} m/s</p>
        </div>
    );
};

export default ForecastCard;
