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
  let apiKey = "9ba75f9bf64d65ecbfcf60t3o5b4f10a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${name.innerHTML}&key=${apiKey}&units=metric`;

 console.log(apiUrl)
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

function formatDay(timestamp) {
  let date=new Date(timestamp*1000);
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let day= date.getDay();
  
  return days[day];
} 


function displayForecast(response){
  let forecast=response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML= `<div class="row">`;
  
  forecast.forEach(function(forecastDay,index){
    
  if(index<6){
    forecastHTML = forecastHTML + `
    <div class="col-2">
    <div class="card">
        <div class="card-body">

        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        
            <img
        src= ${forecastDay.condition.icon_url}
        alt="Clear"
        height="42"

        />
        <div class ="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}/</span>
        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}</span>
        </div>       
        </div>
        </div>
        </div>`;
  };
  });
  forecastHTML= forecastHTML + `</div>`;
  forecastElement.innerHTML= forecastHTML;

}

function getForecast(coordinates){
  console.log(coordinates);
  apiKey="9ba75f9bf64d65ecbfcf60t3o5b4f10a";
  apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

}
  
  

  






function showTemperature(response) {
  let temperature = document.querySelector("#temp-degrees");
  temperature = Math.round(response.data.temperature.current);
  let h1 = document.querySelector("#temp-degrees");
  h1.innerHTML = temperature;
  celsiusTemperature = response.data.temperature.current;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let pressure = document.querySelector("#pressure");

  pressure.innerHTML = `Pressure: ${response.data.temperature.pressure}hPa`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let dateElement = document.querySelector("#data");
  

  let currentDate = formatDate(response.data.time * 1000);
  dateElement.innerHTML = currentDate;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`${response.data.condition.icon_url} `);
  iconElement.setAttribute("alt",response.data.condition.icon);
 let name2 = document.querySelector("h2");
  name2.innerHTML = response.data.city;
  getForecast(response.data.coordinates);
 

  }


function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature =(celsiusTemperature*9)/5+32;
let temperatureElement=document.querySelector("#temp-degrees");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink =document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);
function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement=document.querySelector("#temp-degrees");
  temperatureElement.innerHTML =Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);

let celsiusTemperature = null;


function showPosition(position) {

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;


  let apiKey = "9ba75f9bf64d65ecbfcf60t3o5b4f10a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
 axios.get(apiUrl).then(showTemperature);
 
}


function showCurPosition() {
  
  let name1 = document.querySelector("h2");
   name1.innerHTML = "";
   navigator.geolocation.getCurrentPosition(showPosition);
 
 }


navigator.geolocation.getCurrentPosition(showPosition);

let button = document.querySelector("#current-button");
button.addEventListener("click", showPosition);
