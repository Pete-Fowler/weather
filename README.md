<a href="" >Live page</a>

This is a basic weather app done as an exercise to practice writing asynchronous code. I started out
using recommended openweathermap.org API, and then switched to the nws.gov API once I discovered you
cannot get a real daily forecast from the first option without a paid subscription. I quickly
realized the nws.gov API is far less counterintuitive and its documentation poorly written, but was
able to get things working.

I am favoring the async / await syntax over the regular promise syntax, as it seems a bit easier to
understand, and it is newer. However, I realize the importance of understanding promises since 
async / await is just syntactic sugar for the promise syntax. In this project, I learned about how
to use .then after calling an async function in order to do something after the function was complete.

It was difficult to figure out how to chain together the getLatLon() geocoding function to get 
coordinates, followed by the getForecast() and getWeather functions, and then asynchronously
following all that with another function to add the data to the DOM. It ended up looking like this:

  getLatLon(query).then((data) => {
      getForecast(data);
      getWeather(data)
      .then(() => displayWeather());
    });