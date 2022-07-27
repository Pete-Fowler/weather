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

    // Icon
    let url = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@4x.png`;
    period.style.backgroundImage = `url(${url})`;

    // Temp
    const temp = document.createElement('div');
    temp.id = 'f-temp';
    temp.className = 'forecast-data';
    temp.textContent = `${parseInt(obj.temp.max)} / ${parseInt(obj.temp.min)} F\xB0`;
    period.appendChild(temp);

    // Probability of precipitation (POP)
    const pop = document.createElement('div');
    pop.id = 'f-pop';
    pop.className = 'forecast-data';
    pop.textContent = `${Math.round((obj.pop * 100) * 10) / 10}% chance precip.`;
    period.appendChild(pop);
    
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
  name.className = 'current-data';
  const nameValue = weather.location.charAt(0).toUpperCase() + 
  weather.location.slice(1);
  
  const description = document.createElement('div');
  description.id = 'description';
  description.className = 'current-data';
  const descriptionValue = weather.current.description.charAt(0).toUpperCase() + 
  weather.current.description.slice(1);
  
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
  displayValue(name, `Current conditions in ${nameValue}`);
  displayValue(description, descriptionValue);
  displayValue(temp, `${weather.current.temp} F\xB0`);
  displayValue(wind, `${parseInt(weather.current.wind)} mph wind`);
  displayValue(humidity, `${weather.current.humidity}% humidity`);

  // Add weather icon
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

const slider = (() => {
  const input = document.querySelector('#slider-input');

  input.addEventListener('change', () => {
    const currentTemp = document.querySelector('#temp');
    const forecastTemp = document.querySelectorAll('#f-temp');

    if(input.checked === true) {
      currentTemp.textContent = `${parseInt((weather.current.temp - 32) * (5/9))} C\xB0`;
      forecastTemp.forEach((el, i) => {
        el.textContent = `${parseInt((weather.forecast[i].temp.max - 32) * (5/9))} / 
        ${parseInt((weather.forecast[i].temp.min - 32) * (5/9))} C\xB0`;
      });
    } else {
      currentTemp.textContent = `${parseInt((weather.current.temp))} F\xB0`;
      forecastTemp.forEach((el, i) => {
        el.textContent = `${parseInt(weather.forecast[i].temp.max)} / 
        ${parseInt(weather.forecast[i].temp.min)} F\xB0`;
      });
    }
  });
})();
