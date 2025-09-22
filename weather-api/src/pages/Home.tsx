 import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import type { WeatherData, ForecastData } from "../types/type";
import "../index.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home: React.FC = () => {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [viewMode, setViewMode] = useState<"hourly" | "daily">("hourly");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (location: string) => {
    const trimmed = location.trim();
    if (!trimmed) {
      alert("Please enter a valid city name!");
      return;
    }

    if (!API_KEY) {
      console.error("Weather API key is missing");
      alert("API key is not set up. Please configure it correctly.");
      return;
    }

    const cleanLocation = encodeURIComponent(trimmed);

    setLoading(true);

    try {
       
      const resCurrent = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: API_KEY,
            q: cleanLocation,
            aqi: "no",
          },
 
          validateStatus: status => status < 500,
        }
      );

       
      if (resCurrent.status >= 400) {
        const msg = resCurrent.data?.error?.message || `Error ${resCurrent.status}`;
        alert(`Error fetching current weather: ${msg}`);
        return;
      }

       
      if (resCurrent.data.error) {
        alert(`Error: ${resCurrent.data.error.message}`);
        return;
      }

      
      const curr = resCurrent.data;
      const name = curr.location?.name;
      const condition = curr.current?.condition;
      if (!name || !condition) {
        alert("Unexpected API response format for current weather.");
        return;
      }

      setWeather({
        name: name,
        main: {
          temp: unit === "C" ? curr.current.temp_c : curr.current.temp_f,
          humidity: curr.current.humidity,
        },
        wind: {
          speed:
            unit === "C"
              ? curr.current.wind_kph / 3.6
              : curr.current.wind_mph * 0.44704,
        },
        weather: [
          {
            description: curr.current.condition.text,
            icon: curr.current.condition.icon,
          },
        ],
      });

       
      const resForecast = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        {
          params: {
            key: API_KEY,
            q: cleanLocation,
            days: 3,
            aqi: "no",
            alerts: "no",
          },
          validateStatus: status => status < 500,
        }
      );

      if (resForecast.status >= 400) {
        const msg2 = resForecast.data?.error?.message || `Error ${resForecast.status}`;
        alert(`Error fetching forecast: ${msg2}`);
        return;
      }

      if (resForecast.data.error) {
        alert(`Forecast Error: ${resForecast.data.error.message}`);
        return;
      }

      const forecastData: ForecastData[] = [];
      resForecast.data.forecast.forecastday.forEach((day: any) => {
        day.hour.forEach((hour: any) => {
          forecastData.push({
            dt_txt: hour.time,
            main: {
              temp: unit === "C" ? hour.temp_c : hour.temp_f,
              humidity: hour.humidity,
            },
            wind: {
              speed:
                unit === "C"
                  ? hour.wind_kph / 3.6
                  : hour.wind_mph * 0.44704,
            },
            weather: [
              {
                description: hour.condition.text,
                icon: hour.condition.icon,
              },
            ],
          });
        });
      });

       
      const filteredForecast =
        viewMode === "daily"
          ? forecastData.filter((_: any, i: number) => i % 24 === 0)
          : forecastData;

      setForecast(filteredForecast);
    } catch (err) {
      console.error("Network or unexpected error fetching weather:", err);
      alert("Network error or invalid API request!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
     
  }, [city, viewMode, unit]);

  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  return (
    <div className={`home-container ${themeClass}`}>
      <div className="clouds"></div>

      <h1 className="dashboard-title">Weather Dashboard</h1>

      <div className="settings-bar">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
          °{unit === "C" ? "F" : "C"}
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>

      <div className="toggle-buttons">
        <button
          className={viewMode === "hourly" ? "active" : ""}
          onClick={() => setViewMode("hourly")}
        >
          Hourly
        </button>
        <button
          className={viewMode === "daily" ? "active" : ""}
          onClick={() => setViewMode("daily")}
        >
          Daily
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        weather && <WeatherCard data={weather} />
      )}

      <div className="forecast-grid">
        {forecast.map((item) => (
          <ForecastCard key={item.dt_txt} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
