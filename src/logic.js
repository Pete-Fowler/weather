const weather = {}

const processWeather = (object) => {
  weather.current = {
    main: object.main,
    description: object.weather[0].description,
    wind: object.wind.speed,
  }
  // console.log(object);
  // console.log(weather);
  }
  


const processForecast = (object) => {
  console.log(object);
}

const getWeather = (location) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1d251f3ea86291b4dd946b1949e21ad8&units=imperial`, {mode: 'cors'})
  .then((data) => data.json())
  .then((data) => processWeather(data))
  .catch(err => console.log(err));
}

const getForecast = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=1d251f3ea86291b4dd946b1949e21ad8&units=imperial`, {mode: 'cors'})
    .then((data) => data.json())
    .then((data) => processForecast(data))
    .catch(err => console.log(err));
}

getWeather('Denver');
getForecast('Denver');