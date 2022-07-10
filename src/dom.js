import { weather, getLatLon, getForecast, getWeather } from "./logic";

const displayValue = (element, value) => {
  const el = element;
  if (value === 'Null') {
    el.textContent = 'Data unavailable';
  } else {
  el.textContent = value;
  }
}

// Displays current weather
const displayWeather = () => {
  // Cache DOM elements
  const name = document.querySelector('#name');
  const description = document.querySelector('#description');
  const temp = document.querySelector('#temp');
  const wind = document.querySelector('#wind');
  const humidity = document.querySelector('#humidity');

  // name.textContent = weather.location;
  displayValue(name, weather.location);
  displayValue(description, weather.current.description);
  displayValue(temp, `${weather.current.temp} C`)
  displayValue(wind, `${weather.current.wind} km/h`);
  displayValue(humidity, `${Math.round(weather.current.humidity)} % humidity`);

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

