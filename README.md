# Weather Finder

A simple web page that shows the current weather for any city, using live data from a public API.

## What it does

- Type a city name and click **Search**
- Shows "Loading..." while the data is being fetched
- Displays the temperature, feels-like temperature, humidity and wind speed
- Shows a clear error message if the city is not found, the box is empty, or the service can't be reached

## Built with

- HTML, CSS and JavaScript (no libraries)
- `fetch()` with `async/await`
- [Open-Meteo](https://open-meteo.com/) geocoding and forecast APIs (no API key needed)

## How to run it

1. Download or clone this repository.
2. Open the folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**
   (or open `index.html` directly in your browser).

## How it works

1. The page asks the geocoding API for the coordinates of the city.
2. It then asks the forecast API for the current weather at those coordinates.
3. The result is shown on the page, or an error message if anything goes wrong.

## What I learned

- Making API requests with `fetch()` and `async/await`
- Updating the page with DOM manipulation
- Handling loading and error states with `try/catch/finally`
- Why CORS can block browser requests (my first API choice, REST Countries, was blocked, so I switched to Open-Meteo)