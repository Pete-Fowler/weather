const weather = {}

const processForecast = (object) => {
  console.log(object);
}

const processWeather = (object) => {
  console.log(object);
}

const getLatLon = async (search) => {
  const response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?query=${search}&key=AiOvouOlhdmW8YH-PSBnwW4MHdU654a580GdTnm2UJjFLjFFNaVGWndcsoZIC1r8`, {mode: 'cors'});
  const data = await response.json();
  const {coordinates} = data.resourceSets[0].resources[0].point;
  return coordinates;
}

// switch to NWS
const getWeather = async (coordinates) => {
  const response = await fetch(`https://api.weather.gov/points/${coordinates[0]},${coordinates[1]}`, { mode: 'cors'});
  const data = await response.json();
  // console.log(data);
  const stations = await fetch(data.properties.observationStations);
  const stationsData = await stations.json();
  const observations = await fetch(`${stationsData.observationStations[0]}/observations/latest`);
  const observationsData = await observations.json();
  console.log(observationsData);


  // const station = data.properties.cwa;
  // const observations = await fetch (`https://api.weather.gov/stations/${station}/observations/latest`, { mode: 'cors' });
  // const obsData = await observations.json();
  // console.log(obsData);
  // processWeather(data);

  // /stations/{stationId}/observations/latest

}

const getForecast = async (coordinates) => {
    const response = await fetch(`https://api.weather.gov/points/${coordinates[0]},${coordinates[1]}`, { mode: 'cors'});
    const data = await response.json();
    const forecast = await fetch(data.properties.forecast);
    const forecastJSON = await forecast.json();
    processForecast(forecastJSON);
}


// Code shows how to use getLatLon()
// let a = getLatLon('Denver, CO').then(data => getForecast(data));
// console.log(a);

// code for testing
getWeather([39.684765, -105.129866]);
// getForecast([39.684765, -105.129866]);