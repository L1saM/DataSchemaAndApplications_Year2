//Weather JS

//Adding my specific api key
const api = {
  key: "793769e7926a4bf2131e3bf791ec2aa2",
  base: "https://api.openweathermap.org/data/2.5/"
}

//checks when user hits enter button in search
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery); //set up an event listener on the searchbox for when enter is pressed

//set up setQuery function. This code is triggered when enter(key 13) is pressed. 
function setQuery(evt) { //passing the event through
  if (evt.keyCode == 13) { //13 refers to the keycode value of enter.
    getWeather(searchbox.value); //search.value is the query
  }
}

//Fetch request it then run after setQuery
function getWeather(query) { //passing through a query
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) //gets the api.base above, and attaches weather. The passes through query from search box value
    .then(weather => { //^^ sets units to metric output and then sets appid which is = to api key.
      return weather.json(); //Returns weather output and converts to json
    }).then(displayOutput); //passes json through to results named as weather
}

function displayOutput(weather) {
  let city = document.querySelector('.location .city'); // get the city elements
  city.innerText = `${weather.name}, ${weather.sys.country}`; //String with weather and city name

  let now = new Date();
  let date = document.querySelector('.location .date'); // get the date elements. Passes through location/date
  date.innerText = dateOutput(now); //creates the date outputted

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`; //Math round makes number a whole number

  let weather_el = document.querySelector('.current .weather'); // get the current weather elements
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low'); // get the high-low temp elements
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`; //Math round makes number a whole number
}

//Date output function passing through date(dt)
function dateOutput(dt) {
  //Array containing months of the year
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //Array containing days of the week
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[dt.getDay()];
  let date = dt.getDate();
  let month = months[dt.getMonth()];
  let year = dt.getFullYear();

  //Produces citys current weather
  return `${day} ${date} ${month} ${year}`;
}