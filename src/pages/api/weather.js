// pages/api/weather.js

export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.error("Missing API key");
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!weatherRes.ok) {
      const error = await weatherRes.json();
      return res
        .status(weatherRes.status)
        .json({ error: error.message || "City not found" });
    }

    const data = await weatherRes.json();

    res.status(200).json({
      city: data.name,
      country: data.sys.country,
      main: data.weather[0].main,
      temperature: data.main.temp,
      description: data.weather[0].description,
      feel: data.main.feels_like,
      icon: data.weather[0].icon,
    });

    // console.log(data);
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
