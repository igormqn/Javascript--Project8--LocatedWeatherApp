let selectedCity;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition((position) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='
        + position.coords.latitude + '&lon='
        + position.coords.longitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
    
    let request = new XMLHttpRequest(); // Create a request object
    request.open('GET', url); // Fetch data
    request.responseType = 'json'; // Expect JSON
    request.send(); // Send request

    // Handle the response
    request.onload = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          let response = request.response;
          let temperature = response.main.temp;
          let city = response.name;
          document.querySelector('#temperature_label').textContent = temperature;
          document.querySelector('#city').textContent = city;
        }
        else {
          alert('There was a problem, please try again later.');
        }
      }
    }
  }, handleError, options);
  
  var options = {
    enableHighAccuracy: true
  }
}
else {
  selectedCity = "Saint-Saulve";
  getTemperature(selectedCity);
}

let changeCityButton = document.querySelector('#change-city');
changeCityButton.addEventListener('click', () => {
  selectedCity = prompt('Which city would you like to see?');
  getTemperature(selectedCity);
});

function handleError() {
  selectedCity = "Saint-Saulve";
  getTemperature(selectedCity);
}

function getTemperature(city) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

  let request = new XMLHttpRequest(); // Create a request object
  request.open('GET', url); // Fetch data
  request.responseType = 'json'; // Expect JSON
  request.send(); // Send request

  // Handle the response
  request.onload = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        let response = request.response;
        let temperature = response.main.temp;
        let city = response.name;
        document.querySelector('#temperature_label').textContent = temperature;
        document.querySelector('#city').textContent = city;
      }
      else {
        alert('There was a problem, please try again later.');
      }
    }
  } 
}
