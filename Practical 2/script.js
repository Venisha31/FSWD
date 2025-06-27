// Hardcoded weather data
const weatherData = {
  "new york": "22°C",
  "london": "18°C",
  "tokyo": "26°C",
  "paris": "20°C",
  "mumbai": "32°C"
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("weatherResult");

  if (weatherData[city]) {
    resultDiv.textContent = `The temperature in ${city.charAt(0).toUpperCase() + city.slice(1)} is ${weatherData[city]}.`;
  } else {
    resultDiv.textContent = "Weather data for this city is not available.";
  }
});
