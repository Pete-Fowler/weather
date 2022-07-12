const weather = {};

const processForecast = (object) => {
  let arr = object.properties.periods;
  let mapped = arr.map((obj, index, array) => {
    if(index === 0 && obj.isDaytime === false) {
      return obj;
    }
    if (obj.isDaytime === true && index < array.length - 1) {
    return [obj, array[index + 1]]
    } 
    if (obj.isDaytime === true) {
      return obj;
    }
  });
  weather.forecast = mapped.filter((obj) => obj !== undefined);
};

const processWeather = (object) => {
  weather.current = {
    description: object.properties.textDescription,
    humidity: object.properties.relativeHumidity.value,
    temp: object.properties.temperature.value,
    time: object.properties.timestamp,
    wind: object.properties.windSpeed.value,
  };
  console.log(weather.current);
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
    `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=1d251f3ea86291b4dd946b1949e21ad8`,
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data);
  processWeather(observationsData);
};

const getForecast = async (coord) => {
  const response = await fetch(
    `api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=1d251f3ea86291b4dd946b1949e21ad8`,
    { mode: "cors" }
  );
  
  processForecast(forecastJSON);
};

// /zones/forecast/{zoneId}/observations

// Example calls work
// getLatLon('Denver, CO').then(data => getForecast(data));
// getLatLon("Denver, CO").then((data) => getWeather(data));

export {weather, getLatLon, getForecast, getWeather}