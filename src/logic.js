const weather = {};

const processWeather = (obj) => {
  weather.current = {
    clouds: obj.current.clouds,
    description: obj.current.weather[0].description,
    humidity: obj.current.humidity,
    icon: obj.current.weather[0].icon,
    temp: obj.current.temp,
    wind: obj.current.wind_speed,
  };
  weather.forecast = obj.daily;

  console.log(weather)
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
    `https://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=1d251f3ea86291b4dd946b1949e21ad8`,
    { mode: "cors" }
  );
  const data = await response.json();
  processWeather(data);
};

// /zones/forecast/{zoneId}/observations

// Example calls work
// getLatLon('Denver, CO').then(data => getForecast(data));
// getLatLon("Denver, CO").then((data) => getWeather(data));

export {weather, getLatLon, getWeather}