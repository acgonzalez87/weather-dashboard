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

const apiKey = "759947496ba0f47c031beafe72e85c1c";

var getCityWeather = function (city) {
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

var displayWeather = function (weather, citySearch) {
  cityCurrentWeather.textContent = "";
  searchedCity.textContent = citySearch;

  console.log(weather);
};
