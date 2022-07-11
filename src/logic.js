const weather = {};

const processForecast = (object) => {
  let arr = object.properties.periods;
  console.log(arr);
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
  console.log(weather.forecast);
};

const processWeather = (object) => {
  weather.current = {
    description: object.properties.textDescription,
    humidity: object.properties.relativeHumidity.value,
    temp: object.properties.temperature.value,
    time: object.properties.timestamp,
    wind: object.properties.windSpeed.value,
  };
};

const getLatLon = async (search) => {
  weather.location = search;
  const response = await fetch(
    `http://dev.virtualearth.net/REST/v1/Locations?query=${search}&key=AiOvouOlhdmW8YH-PSBnwW4MHdU654a580GdTnm2UJjFLjFFNaVGWndcsoZIC1r8`,
    { mode: "cors" }
  );
  const data = await response.json();
  const { coordinates } = data.resourceSets[0].resources[0].point;
  return coordinates;
};

const getWeather = async (coordinates) => {
  const response = await fetch(
    `https://api.weather.gov/points/${coordinates[0]},${coordinates[1]}`,
    { mode: "cors" }
  );
  const data = await response.json();
  const stations = await fetch(data.properties.observationStations);
  const stationsData = await stations.json();
  const observations = await fetch(
    `${stationsData.observationStations[0]}/observations/latest`
  );
  const observationsData = await observations.json();
  processWeather(observationsData);
};

const getForecast = async (coordinates) => {
  const response = await fetch(
    `https://api.weather.gov/points/${coordinates[0]},${coordinates[1]}`,
    { mode: "cors" }
  );
  const data = await response.json();
  const forecast = await fetch(data.properties.forecast);
  const forecastJSON = await forecast.json();
  processForecast(forecastJSON);
};

// /zones/forecast/{zoneId}/observations

// Example calls work
// getLatLon('Denver, CO').then(data => getForecast(data));
// getLatLon("Denver, CO").then((data) => getWeather(data));

export {weather, getLatLon, getForecast, getWeather}