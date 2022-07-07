const weather = {}

// needs updating
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

const getLatLon = async (search) => {
  const response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?query=${search}&key=AiOvouOlhdmW8YH-PSBnwW4MHdU654a580GdTnm2UJjFLjFFNaVGWndcsoZIC1r8`, {mode: 'cors'});
  const data = await response.json();
  const coordinates = data.resourceSets[0].resources[0].point.coordinates;
  return coordinates;
}

// switch to NWS
const getWeather = (location) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1d251f3ea86291b4dd946b1949e21ad8&units=imperial`, {mode: 'cors'})
  .then((data) => data.json())
  .then((data) => processWeather(data))
  .catch(err => console.log(err));
}

const getForecast = async (coordinates) => {
    const response = await fetch(`https://api.weather.gov/points/${coordinates[0]},${coordinates[1]}`, { mode: 'cors'})
    const data = await response.json();
    const forecast = await fetch(data.properties.forecast);
    const forecastJSON = await forecast.json();
    processForecast(forecastJSON);
}


// Fwd search bing maps
// http://dev.virtualearth.net/REST/v1/Locations?query={locationQuery}&key={AiOvouOlhdmW8YH-PSBnwW4MHdU654a580GdTnm2UJjFLjFFNaVGWndcsoZIC1r8}

// Code shows how to use getCoordinates()
getLatLon('Denver, CO').then(data => console.log(data));


// code for testing
// getWeather('Denver');
// getForecast([39.684765, -105.129866]);