function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-now");
  let name = document.querySelector("h2");
  name.innerHTML = `${cityInput.value}`;
  getIt();
}

let searchButtonInput = document.querySelector("#search-now");

searchButtonInput.addEventListener("click", showCity);

function getIt() {
  let cityInput = document.querySelector("#city-now");
  let name = document.querySelector("h2");
  let apiKey = "be60748992fab0f5da8162563fb21245";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name.innerHTML}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours<10){
    hours=`0${hours}`;
  }
  let minutes = date.getMinutes();
  if(minutes<10){
    minutes=`0${minutes}`;
  }
  
  
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  return`${day} ${hours}:${minutes}`;

}

function showTemperature(response) {
  let temperature = document.querySelector("#temp-degrees");
  temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temp-degrees");
  h1.innerHTML = temperature;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let pressure = document.querySelector("#pressure");

  pressure.innerHTML = `Pressure: ${response.data.main.pressure}hPa`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} meter/sec`;
  let dateElement = document.querySelector("#data");
  

  let currentDate = formatDate(response.data.dt * 1000);
  dateElement.innerHTML = currentDate;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);
  
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "be60748992fab0f5da8162563fb21245";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

let button = document.querySelector("#current-button");
button.addEventListener("click", showPosition);
