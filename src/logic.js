

const getWeather = (location) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1d251f3ea86291b4dd946b1949e21ad8`, {mode: 'cors'})
  .then((data) => console.log(data));
}

getWeather('Denver');