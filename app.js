//DOM
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".icon");
const temperatureElement = document.querySelector(".temperature p");

//for changing temperature from kelvin to celsius
const kelvin = 273.15;

//get and check if browser support geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>Navigateur ne supporte pas la géolocation</p>`;
}

//get latitude and longtitude of user
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  getWeather(lat, long);
}

//show error message if failed to get position of user
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//get weather api from openweathermap
let key = "enter your api key";

async function getWeather(lat, long) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

  let response = await fetch(api);
  let data = await response.json();

  displayWeather(data);
}

//display weather in browser
function displayWeather(data) {
  let temp = Math.floor(data.main.temp - kelvin);

  locationElement.innerHTML = `<p>${data.name}, ${data.sys.country}</p>`;
  iconElement.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' />`;
  temperatureElement.innerHTML = `<p>${temp} °C</p>`;
}
