const weather = {};

const processForecast = (obj) => {
  weather.forecast = {
    array: obj.list,
    timezone: obj.city.timezone,
  }
  console.log(weather.forecast);
};

const processWeather = (obj) => {
  weather.current = {
    description: obj.weather[0].description,
    humidity: obj.main.humidity,
    pressure: obj.main.pressure,
    sunrise: obj.sys.sunrise,
    sunset: obj.sys.sunset,
    temp: obj.main.temp,
    tempFeels: obj.main.feels_like,
    tempMax: obj.main.temp_max,
    tempMin: obj.main.temp_min,
    wind: obj.wind.speed,
  };
};

const getLatLon = async (search) => {
  weather.location = search;
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=1d251f3ea86291b4dd946b1949e21ad8`,
    { mode: "cors" }
  );
  const data = await response.json();
  const coord = {
    lat: data[0].lat,
    lon: data[0].lon,
  };
  return coord;
};

const getWeather = async (coord) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=1d251f3ea86291b4dd946b1949e21ad8`,
    { mode: "cors" }
  );
  const data = await response.json();
  processWeather(data);
};

const getForecast = async (coord) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=1d251f3ea86291b4dd946b1949e21ad8`,
    { mode: "cors" }
  );
  const data = await response.json();
  processForecast(data);
};

// /zones/forecast/{zoneId}/observations

// Example calls work
// getLatLon('Denver, CO').then(data => getForecast(data));
// getLatLon("Denver, CO").then((data) => getWeather(data));

export {weather, getLatLon, getForecast, getWeather}