const weather = {}

const processWeather = (object) => {
  weather.main = object.main;
  weather.description = object.weather[0].description;
  weather.wind = object.wind;
  console.log(object);
  console.log(weather);
}

const getWeather = (location) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1d251f3ea86291b4dd946b1949e21ad8&units=imperial`, {mode: 'cors'})
  .then((data) => data.json())
  .then((data) => processWeather(data))
  .catch(err => console.log(err));
}

getWeather('Denver');