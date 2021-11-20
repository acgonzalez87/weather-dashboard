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

  var currentDate = document.createElement("span");
  currentDate.textContent =
    " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  var weatherArt = document.createElement("img");
  weatherArt.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  citySearchInputEl.appendChild(weatherArt);

  var tempInfo = document.createElement("span");
  tempInfo.textContent = "Temperature: " + weather.main.temp + " °F";
  tempInfo.classList = "list-group-item";

  cityCurrentWeather.appendChild(tempInfo);

  var humidityInfo = document.createElement("span");
  humidityInfo.textContent = "Humidity: " + weather.main.humidity + " %";
  humidityInfo.classList = "list-group-item";

  cityCurrentWeather.appendChild(humidityInfo);

  var windSpeed = document.createElement("span");
  windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windSpeed.classList = "list-group-item";

  cityCurrentWeather.appendChild(windSpeed);

  uvIndexInfo(latitude, longitude);
};

var latitude = weather.coord.lat;
var longitude = weather.coord.lon;

var uvIndexInfo = function (latitude, longitude) {
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayUvIndexInfo(data);
    });
  });
};

var displayUvIndexInfo = function (index) {
  var uvIndex = document.createElement("div");
  uvIndex.textContent = "UV Index: ";
  uvIndex.classList = "list-group-item";

  uvIndexValue = document.createElement("span");
  uvIndexValue.textContent = index.value;

  if (index.value <= 2) {
    uvIndexValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate";
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe";
  }

  uvIndex.appendChild(uvIndexValue);

  cityCurrentWeather.appendChild(uvIndex);
};

var fiveDays = function (city) {
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayFiveDays(data);
    });
  });
};
