import { weather, getLatLon, getForecast, getWeather } from "./logic";



// Adds forecast data to DOM, called inside displayWeather()
const displayForecast = () => {
  const forecastBox = document.querySelector('#forecast-box');
  forecastBox.textContent = '';

  weather.forecast.forEach((val, index, array) => {
    const period = document.createElement('div');
    period.className = 'period';

    // If true, val is an object and not an array, so it is a period and not day/night pair
    if(array[index][0] === undefined) {     
      const name = document.createElement('div');     
      name.className = 'name';
      name.textContent = val.name;
      period.appendChild(name);

      const forecast = document.createElement('div');
      forecast.className = 'forecast';
      forecast.textContent = val.detailedForecast;
      period.appendChild(forecast);

    // Handles arrays of day/night pairs
    } else {                                            
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = val[0].name;
      period.appendChild(name);

      const high = document.createElement('div');
      high.className = 'high';
      high.textContent = `High ${val[0].temperature} F`;
      period.appendChild(high);

      const low = document.createElement('div');
      low.className = 'low';
      low.textContent = `Low ${val[1].temperature} F`;
      period.appendChild(low);

      const wind = document.createElement('div');
      wind.className = 'wind';
      wind.textContent = `${val[0].windSpeed} winds`;
      period.appendChild(wind);

      const forecast = document.createElement('div');
      forecast.className = 'forecast';
      forecast.textContent = val[0].shortForecast;
      period.appendChild(forecast);
    }
    forecastBox.appendChild(period);
  });
}

// Helper function used in displayWeather()
const displayValue = (element, value) => {
  const currentBox = document.querySelector('#current-box');
  const el = element;
  if (value === null) {
    return;
  }
  currentBox.appendChild(el);
  el.textContent = value;
  }

// Adds current weather data to DOM
const displayWeather = () => {
  // Create DOM elements
  const current = document.querySelector('#current');
  current.textContent = '';
  
  const currentBox = document.createElement('div');
  currentBox.id = 'current-box';
  current.appendChild(currentBox);
  
  const name = document.createElement('div');
  name.id = 'name';
  name.className = 'current-data'
  const description = document.createElement('div');
  description.id = 'description';
  description.className = 'current-data'
  const temp = document.createElement('div');
  temp.id = 'temp';
  temp.className = 'current-data';
  const highLow = document.createElement('div');
  highLow.id = 'high-low';
  highLow.className = 'current-data';
  const wind = document.createElement('div');
  wind.id = 'wind';
  wind.className = 'current-data';
  const humidity = document.createElement('div');
  humidity.id = 'humidity';
  humidity.className = 'current-data';

  // Change text content of DOM elements to display current weather values
  displayValue(name, `Current conditions in ${weather.location}`);
  displayValue(description, weather.current.description);
  displayValue(temp, `${weather.current.temp} F`);
  displayValue(highLow, `${weather.current.tempMax} F High / ${weather.current.tempMin} F Low`);
  displayValue(wind, `${weather.current.wind} mph wind`);
  displayValue(humidity, `${weather.current.humidity}% humidity`);
}

// Handle click to search for weather
const submit = (evt) => {
  evt.preventDefault();
  const input = document.querySelector('#location');
  const query = input.value;
  getLatLon(query).then((data) => {
    getForecast(data)
    .then(() => displayForecast());
    getWeather(data)
    .then(() => displayWeather()); 
  });
}

// Submit button event listener
const listen = (() => {
  const form = document.querySelector('#form');
  form.addEventListener('submit', submit);
})();

