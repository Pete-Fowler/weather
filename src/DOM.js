import { weather, getLatLon, getForecast, getWeather } from "./logic";

const getDayTime = (obj) => {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const day = days[obj.getDay()];
  let time = obj.getHours();
  if (time === 0) {
    return `${day} 12AM`;
  } 
  if (time > 12) {
    time -= 12;
    time = `${time.toString()}PM`;
  } else {
    time = `${time.toString()}AM`;
  }
  return `${day} ${time}`;
}

// Adds forecast data to DOM
const displayForecast = () => {
  const forecastBox = document.querySelector('#forecast-box');
  forecastBox.textContent = '';

  weather.forecast.array.forEach((val, index, array) =>{
    const period = document.createElement('div');
    period.className = 'period';
    
    // Add day and time of forecast 
    const time = document.createElement('div');
    time.id = 'time';
    time.className = 'forecast-data';
    const date = new Date(val.dt * 1000);
    time.textContent = getDayTime(date);
    period.appendChild(time);
    
    // Description
    const description = document.createElement('div');
    description.id = 'f-description';
    description.className = 'forecast-data';
    description.textContent = val.weather[0].description;
    period.appendChild(description);

    // Temp
    const temp = document.createElement('div');
    temp.id = 'f-temp';
    temp.className = 'forecast-data';
    temp.textContent = `${val.main.temp} F`;
    period.appendChild(temp);

    // Cloud cover
    const clouds = document.createElement('div');
    clouds.id = 'f-clouds';
    clouds.className = 'forecast-data';
    clouds.textContent = `${val.clouds.all}% cloud cover`;
    period.appendChild(clouds);

    // Probability of precipitation (POP)
    const pop = document.createElement('div');
    pop.id = 'f-pop';
    pop.className = 'forecast-data';
    pop.textContent = `${Math.round((val.pop * 100) * 10) / 10}% chance precip.`;
    period.appendChild(pop);

    // Wind
    const wind = document.createElement('div');
    wind.id = 'f-wind';
    wind.className = 'forecast-data';
    wind.textContent = `${val.wind.speed}mph winds`;
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

