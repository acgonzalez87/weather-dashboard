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
var forecastTitle = document.getElementById("forecast-title");

const apiKey = "759947496ba0f47c031beafe72e85c1c";

var getCityWeather = function (city) {
  var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

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
    getFiveDays(city);
    cities.unshift({ city });
    cityInput.value = "";
  } else {
    alert("Please enter a city to search!");
  }

  savedSearch();
  searchHistory(city);
};

var savedSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
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

  uvIndexInfo(lat, lon);
};

var lat = weather.coord.lat;
var lon = weather.coord.lon;

var uvIndexInfo = function (lat, lon) {
  var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
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

var getFiveDays = function (city) {
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayFiveDays(data);
    });
  });
};

var displayFiveDays = function (weather) {
  fiveDayContainer.textContent = "";
  forecastTitle.textContent = "Five Day Forecast: ";

  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var forecastCard = document.createElement("div");
    forecastCard.classList = "card bg-primary text-light m-2";

    var forecastDate = document.createElement("h5");
    forecastDate.textContent = moment
      .unix(dailyForecast.dt)
      .format("MMM D, YYYY");
    forecastDate.classList = "card-header text-center";
    forecastCard.appendChild(forecastDate);

    var weatherImage = document.createElement("img");
    weatherImage.classList = "card-body text-center";
    weatherImage.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`
    );

    forecastCard.appendChild(weatherImage);

    var forecastTemp = document.createElement("span");
    forecastTemp.classList = "card-body text-center";
    forecastTemp.textContent = dailyForecast.main.temp + " °F";

    forecastCard.appendChild(forecastTemp);

    var forecastHumidity = document.createElement("span");
    forecastHumidity.classList = "card-body text-center";
    forecastHumidity.textContent = dailyForecast.main.humidity + " %";

    forecastCard.appendChild(forecastHumidity);

    fiveDayContainer.appendChild(forecastCard);
  }
};

var searchHistory = function (searchHistory) {
  pastSearch = document.createElement("button");
  pastSearch.textContent = pastSearch;
  pastSearch.classList = "d-flex w-100 btn-light border p-2";
  pastSearch.setAttribute("data-city", searchHistory);
  pastSearch.setAttribute("type", "submit");

  pastSearches.prepend(pastSearch);
};

var searchHistoryHandler = function (event) {
  var city = event.target.getAttribute("data-city");
  if (city) {
    getCityWeather(city);
    getFiveDays(city);
  }
};

citySearch.addEventListener("submit", formSubmit);
pastSearches.addEventListener("click", searchHistoryHandler);
