var cities = [];

var citySearch = document.getElementById("city-search");
var cityInput = document.getElementById("city-input");
var pastSearches = document.getElementById("past-searches");
var currentForecast = document.getElementById("current-forecast");
var searchedCity = document.getElementById("searched-city");
var cityCurrentWeather = document.getElementById("city-current-weather");
var fiveDayForecast = document.getElementById("five-day-forecast");
var forecast = document.getElementById("forecast");
var fiveDayContainer = document.getElementById("five-day-container");

var getCityWeather = function (city) {
  var apiKey = "bf57feecdaa505ef2a8d3e03515ca737";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayWeather(data, city);
    });
  });
};

var formSubmit = function (event) {
  event.preventDefault();
  var city = cityInput.ariaValueMax.trim();
  if (city) {
    getCityWeather(city);
    get5day(city);
    cities.unshift({ city });
    cityInput.value = "";
  } else {
    alert("Please enter a city to search!");
  }
};
