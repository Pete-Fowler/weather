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

const getCoordinates = (search) => {
  fetch(`http://dev.virtualearth.net/REST/v1/Locations?query=${search}&key=AiOvouOlhdmW8YH-PSBnwW4MHdU654a580GdTnm2UJjFLjFFNaVGWndcsoZIC1r8`, {mode: 'cors'})
  .then(data => data.json())
  .then(data => data.resourceSets[0].resources[0].point.coordinates)
  .then(data => console.log(`${data[0]}, ${data[1]}`));
}

const getWeather = (location) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1d251f3ea86291b4dd946b1949e21ad8&units=imperial`, {mode: 'cors'})
  .then((data) => data.json())
  .then((data) => processWeather(data))
  .catch(err => console.log(err));
}

const getForecast = (lat, lon) => {
    // fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=1d251f3ea86291b4dd946b1949e21ad8&cnt=5&units=imperial`, {mode: 'cors'})
    fetch(`https://api.weather.gov/points/${lat},${lon}`, { mode: 'cors'})
    .then((data) => data.json())
    .then((data) => fetch(data.properties.forecast))
    .then((data) => data.json())
    .then((data) => processForecast(data))
    .catch(err => console.log(err));
}


// Fwd search bing maps
// http://dev.virtualearth.net/REST/v1/Locations?query={locationQuery}&key={AiOvouOlhdmW8YH-PSBnwW4MHdU654a580GdTnm2UJjFLjFFNaVGWndcsoZIC1r8}

getCoordinates('Denver, CO');
// getWeather('Denver');
// getForecast(39.684765, -105.129866);