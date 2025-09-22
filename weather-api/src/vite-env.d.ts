/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_WEATHER_API_KEY: string;
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
