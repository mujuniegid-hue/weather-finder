const input = document.getElementById("city-input");
const button = document.getElementById("search-button");
const statusBox = document.getElementById("status");
const result = document.getElementById("result");

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("The weather service had a problem. Please try again later.");
  }

  return await response.json();
}

async function getWeather(name) {
  statusBox.className = "";
  statusBox.textContent = "Loading...";
  result.innerHTML = "";

  try {
    if (name === "") {
      throw new Error("Please type a city name first.");
    }

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`;
    const geo = await fetchJson(geoUrl);

    if (!geo.results || geo.results.length === 0) {
      throw new Error(`Sorry, we couldn't find a place called "${name}". Check the spelling and try again.`);
    }

    const place = geo.results[0];

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m`;
    const weather = await fetchJson(weatherUrl);

    showWeather(place, weather.current, weather.current_units);
  } catch (error) {
    console.error(error);
    statusBox.className = "error";

    if (error.name === "TypeError") {
      statusBox.textContent = "Could not reach the weather service. Check your connection and try again.";
    } else {
      statusBox.textContent = error.message;
    }
  } finally {
    if (statusBox.textContent === "Loading...") {
      statusBox.textContent = "";
    }
  }
}

function showWeather(place, current, units) {
  result.innerHTML = `
    <div class="card">
      <h2>${place.name}, ${place.country}</h2>
      <p class="temp">${current.temperature_2m}${units.temperature_2m}</p>
      <p><strong>Feels like:</strong> ${current.apparent_temperature}${units.apparent_temperature}</p>
      <p><strong>Humidity:</strong> ${current.relative_humidity_2m}${units.relative_humidity_2m}</p>
      <p><strong>Wind:</strong> ${current.wind_speed_10m} ${units.wind_speed_10m}</p>
    </div>
  `;
}

button.addEventListener("click", function () {
  const name = input.value.trim();
  getWeather(name);
});