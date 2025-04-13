 

    function getWeather() {
        const apiKey = '461e00fe917bf00cee24982a71e204f7';

      const city = document.getElementById('city').value;
      if (!city) return alert('Please enter a city');

      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      fetch(currentWeatherUrl)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch(err => alert('City not found'));

      fetch(forecastUrl)
        .then(res => res.json())
        .then(data => displayHourlyForecast(data.list));
    }

    function displayWeather(data) {
      const tempDiv = document.getElementById('temp-div');
      const infoDiv = document.getElementById('weather-info');
      const iconImg = document.getElementById('weather-icon');
      const detailsDiv = document.getElementById('weather-details');

      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      iconImg.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
      iconImg.style.display = 'block';

      tempDiv.innerHTML = `<h2>${Math.round(temp)}°C</h2>`;
      infoDiv.innerHTML = `<h3>${data.weather[0].main}</h3>`;
      detailsDiv.innerHTML = `
        <p><strong>Precipitation:</strong> 0%</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind:</strong> ${speed} km/h</p>
        <p><strong>${new Date().toLocaleDateString('en-US', { weekday: 'long' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></p>
      `;
    }

    function displayHourlyForecast(data) {
      const hourlyDiv = document.getElementById('hourly-forecast');
      hourlyDiv.innerHTML = '';

      data.slice(0, 24).forEach(item => {
        const hour = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', hour12: true });
        hourlyDiv.innerHTML += `
          <div class="hourly-item">
            <p>${hour}</p>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="" />
            <p>${Math.round(item.main.temp)}°C</p>
          </div>
        `;
      });
    }