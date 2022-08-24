<a href="https://pete-fowler.github.io/weather/">Live page</a>

This is a basic weather app done with some asynchronous code to access an external API.

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
   
Due to the nature of the API data, I discovered Unix time is number of seconds from epoch, whereas the 
JavaScript timestamp is number of milliseconds since epoch, so converting unix time to JS time requires 
multiplying by 1,000.
