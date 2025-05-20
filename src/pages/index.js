/* eslint-disable @next/next/no-img-element */
// pages/index.js
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    if (!city.trim()) {
      setError("Please enter a city name.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Could not fetch weather");
      }
      const data = await res.json();

      setWeather(data);
      setCity(""); // Clear input after successful fetch
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return "/backgrounds/clear.jpg";
      case "Clouds":
        return "/backgrounds/clouds.jpg";
      case "Rain":
        return "/backgrounds/rain.jpg";
      case "Snow":
        return "/backgrounds/snow.jpg";
      case "Haze":
        return "/backgrounds/haze.jpg";
      case "Thunderstorm":
        return "/backgrounds/thunderstorm.jpg";
      case "Drizzle":
        return "/backgrounds/drizzle.jpg";
      case "Mist":
        return "/backgrounds/mist.jpg";
      case "Smoke":
        return "/backgrounds/smoke.jpg";
      case "Fog":
        return "/backgrounds/fog.jpg";
      case "Sand":
        return "/backgrounds/sand.jpg";
      case "Tornado":
        return "/backgrounds/tornado.jpg";
      default:
        return "/backgrounds/clear.jpg"; // fallback image
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: weather
          ? `url(${getBackgroundImage(weather.main)})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Weather Info App</h1>

        <input
          type="text"
          className={styles.input}
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
        />
        <button
          className={styles.button}
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {weather && (
          <div className={styles.weatherBox}>
            <h2 className={styles.weatherTitle}>
              {weather.city}, {weather.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              className={styles.weatherIcon}
            />
            <p className={styles.weatherTemperature}>
              {weather.temperature} °C
            </p>
            <p className={styles.weatherDescription}>
              Feels like <strong>{weather.feel} °C</strong> . <br />
              <strong>{weather.main}</strong> ➡️ {weather.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
