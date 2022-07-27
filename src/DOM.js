import { weather, getLatLon, getWeather } from "./logic";

//  Helper function to create forecast date label, called in displayForecast
const getDateLabel = (obj) => {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const day = days[obj.getDay()];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[obj.getMonth()];
  const date = obj.getDate();

  return `${day}, ${month} ${date}`;
}

// Adds forecast data to DOM
const displayForecast = () => {
  const forecastBox = document.querySelector('#forecast-box');
  forecastBox.textContent = '';

  weather.forecast.forEach((obj, index, array) =>{
    const period = document.createElement('div');
    period.className = 'period';
    
    // Add day and time of forecast 
    const time = document.createElement('div');
    time.id = 'f-time';
    time.className = 'forecast-data';
    if (index === 0) {
      time.textContent = 'Today';
    } else {
    const date = new Date(obj.dt * 1000);
    time.textContent = getDateLabel(date);
    }
    period.appendChild(time);
    
    // Description
    const description = document.createElement('div');
    description.id = 'f-description';
    description.className = 'forecast-data';
    description.textContent = obj.weather[0].description;
    period.appendChild(description);

    // High temp
    const high = document.createElement('div');
    high.id = 'f-high';
    high.className = 'forecast-data';
    high.textContent = `${obj.temp.max} F high`;
    period.appendChild(high);

    // Low temp
    const low = document.createElement('div');
    low.id = 'f-low';
    low.className = 'forecast-data';
    low.textContent = `${obj.temp.min} F low`;
    period.appendChild(low);

    // Cloud cover
    const clouds = document.createElement('div');
    clouds.id = 'f-clouds';
    clouds.className = 'forecast-data';
    clouds.textContent = `${obj.clouds}% cloud cover`;
    period.appendChild(clouds);

    // Probability of precipitation (POP)
    const pop = document.createElement('div');
    pop.id = 'f-pop';
    pop.className = 'forecast-data';
    pop.textContent = `${Math.round((obj.pop * 100) * 10) / 10}% chance precip.`;
    period.appendChild(pop);

    // Wind
    const wind = document.createElement('div');
    wind.id = 'f-wind';
    wind.className = 'forecast-data';
    wind.textContent = `${obj.wind_speed}mph winds`;
    period.appendChild(wind);
    
    forecastBox.appendChild(period);
  });
  }

// Helper function used in displayWeather(), appends values to DOM
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
  displayValue(wind, `${weather.current.wind} mph wind`);
  displayValue(humidity, `${weather.current.humidity}% humidity`);

  // Add icon
  const icon = document.createElement('img');
  icon.src = weather.current.icon;
  current.append(icon);
}

// Handle click to search for weather
const submit = (evt) => {
  evt.preventDefault();
  const input = document.querySelector('#location');
  const query = input.value;
  getLatLon(query).then((data) => {
    getWeather(data)
    .then(() => displayWeather())
    .then(() => displayForecast()); 
  });
}

// Submit button event listener
const listen = (() => {
  const form = document.querySelector('#form');
  form.addEventListener('submit', submit);
})();

