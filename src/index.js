function displayWeatherData(response) {
  let temperatureElement = document.querySelector("#weather-app-current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-search-input");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

let searchInputElement = document.querySelector("#search-input");
searchInputElement.addEventListener("submit", handleSearchForm);

searchCity("Malaga");
