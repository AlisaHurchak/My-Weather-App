function handleSearchForm(event) {
  event.preventDefault();
  let searchData = document.querySelector("#search-form");
  let cityElement = document.querySelector("#city-search-input");
  cityElement.innerHTML = searchData.value;
}

let searchInputElement = document.querySelector("#search-input");
searchInputElement.addEventListener("submit", handleSearchForm);
