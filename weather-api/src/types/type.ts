export interface WeatherData {
    name: string;
    weather: { description: string; icon: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
}

export interface ForecastData {
    dt_txt: string;
    main: { temp: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number };
}
