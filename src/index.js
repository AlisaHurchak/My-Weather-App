function displayWeatherData(response) {
  let temperatureElement = document.querySelector("#weather-app-current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-search-input");
  let descriptionElement = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity-status");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind-status");
  let wind = response.data.wind.speed;
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#weather-app-icon");
  iconElement.innerHTML = `<img  src="${response.data.condition.icon_url}" class="weather-app-emoji"/>`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  getForecastData(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "cbc74oa354dba2dbcf0te4ef1b7eef0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherData);
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchData = document.querySelector("#search-form");
  searchCity(searchData.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecastData(city) {
  let apiKey = "cbc74oa354dba2dbcf0te4ef1b7eef0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastData);
}

function displayForecastData(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-one">
            <div class="forecast-day-first">${formatDay(day.time)}</div>
            <div><img class="forecast-emoji" src="${
              day.condition.icon_url
            }"></div>
            <div class="forecast-temperature">
              <span class="forecast-weather-temps">
                <strong> ${Math.round(day.temperature.maximum)}°C </strong>
              </span> 
              <span class="weather-forecast-temps">${Math.round(
                day.temperature.minimum
              )}°C</span>
            </div>
          </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchInputElement = document.querySelector("#search-input");
searchInputElement.addEventListener("submit", handleSearchForm);

searchCity("Malaga");
