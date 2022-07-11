import { weather, getLatLon, getForecast, getWeather } from "./logic";

// Helper function 
const displayValue = (element, value) => {
  const el = element;
  if (value == null) {
    el.textContent = 'Data unavailable';
  } else {
  el.textContent = value;
  }
}

// Adds forecast data to DOM, called inside displayWeather()
const displayForecast = () => {
  const forecastBox = document.querySelector('#forecast-box');
  
  weather.forecast.forEach((obj, index, array) => {
    const period = document.createElement('div');
    period.className = 'period';

    const name = document.createElement('div');
    name.className = 'name'
    name.textContent = obj.name;
    period.appendChild(name);

    const detailed = document.createElement('div');
    detailed.textContent = obj.detailedForecast
    period.appendChild(detailed);
 
    // Add some code so that if it is day, put the next i underneath in the same period
    if (obj.isDaytime === true) {
      const nightName = document.createElement('div');
      nightName.className = 'name';
      nightName.textContent = array[index + 1].name;
      period.appendChild(nightName);
    }

    forecastBox.appendChild(period);
  });
}

// Adds current weather data to DOM
const displayWeather = () => {
  // Cache DOM elements
  const name = document.querySelector('#name');
  const description = document.querySelector('#description');
  const temp = document.querySelector('#temp');
  const wind = document.querySelector('#wind');
  const humidity = document.querySelector('#humidity');

  // Change text content of DOM elements to display current weather values
  displayValue(name, weather.location);
  displayValue(description, weather.current.description);
  displayValue(temp, `${Math.round((weather.current.temp * 9 / 5 + 32) * 10) / 10} F`)
  displayValue(wind, `${Math.round((weather.current.wind * 0.62137) * 10) / 10} mph`);
  displayValue(humidity, `${Math.round(weather.current.humidity)} % humidity`);

  displayForecast();
}

// Handle click to search for weather
const submit = (evt) => {
  evt.preventDefault();
  const input = document.querySelector('#location');
  const query = input.value;
  getLatLon(query).then((data) => {
    getForecast(data);
    getWeather(data)
    .then(() => displayWeather());
  });
}

// Submit button event listener
const listen = (() => {
  const form = document.querySelector('#form');
  form.addEventListener('submit', submit);
})();

