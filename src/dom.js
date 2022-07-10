import { weather, getLatLon, getForecast, getWeather } from "./logic";

const submit = (evt) => {
  evt.preventDefault();
  const input = document.querySelector('#location');
  const query = input.value;
  getLatLon(query).then((data) => {
    getForecast(data);
    getWeather(data);
  });
}



const listen = (() => {
  const form = document.querySelector('#form');
  form.addEventListener('submit', submit);
})();

