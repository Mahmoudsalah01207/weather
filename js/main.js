    // Function to fetch weather data from the API
    async function fetchWeatherData(place) {
      const apiKey = '2b57e8df13ac49598a482741230408';
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${place}&days=3`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log('Error:', error);
      }
    }

    // Function to update the HTML elements with weather information
    function updateWeatherInfo(data) {
      // Day 1
      const date1 = new Date(data.forecast.forecastday[0].date);
      const dayOfWeek = date1.toLocaleString('en-US', { weekday: 'long' });
      const day = date1.toLocaleString('en-US', { day: 'numeric' });
      const month = date1.toLocaleString('en-US', { month: 'long' });

      document.getElementById('date1').textContent = `${dayOfWeek}`;
      document.getElementById('date2').textContent = ` ${day} ${month}`;

      document.getElementById('place-name').textContent = data.location.name;
      document.getElementById('temperature').innerHTML =`${ data.current.temp_c}<sub>o</sub>C`;
      document.getElementById('condition').textContent = data.current.condition.text;
      document.getElementById('icon').setAttribute("src", ` https://${data.current.condition.icon}` ) ;

      // Day 2
      const day2 = new Date(data.forecast.forecastday[1].date).toLocaleString('en-US', { weekday: 'long' });
      document.getElementById('day2').textContent = day2;
      document.getElementById('max-temperature').innerHTML = data.forecast.forecastday[1].day.maxtemp_c 
      document.getElementById('min-temperature').textContent = data.forecast.forecastday[1].day.mintemp_c;
      document.getElementById('condition2').textContent = data.forecast.forecastday[1].day.condition.text;
      document.getElementById('icon2').setAttribute ( "src" , ` https://${data.forecast.forecastday[1].day.condition.icon}`) ;

      // Day 3
      const day3 = new Date(data.forecast.forecastday[2].date).toLocaleString('en-US', { weekday: 'long' });
      document.getElementById('day3').textContent = day3;
      document.getElementById('max-temperature2').textContent = data.forecast.forecastday[2].day.maxtemp_c;
      document.getElementById('min-temperature2').textContent = data.forecast.forecastday[2].day.mintemp_c;
      document.getElementById('condition3').textContent = data.forecast.forecastday[2].day.condition.text;
      document.getElementById('icon3').setAttribute( "src" , ` https://${data.forecast.forecastday[2].day.condition.icon}`) ;
    }

    // Function to set the default place value to "London"
    function setDefaultPlace() {
      const placeInput = document.getElementById('place-input');
      placeInput.value = 'London';
    }

    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault();
      const placeInput = document.getElementById('place-input');
      const place = placeInput.value.trim();

      if (place !== '') {
        fetchWeatherData(place)
          .then(data => {
            updateWeatherInfo(data);
          });

        placeInput.value = '';
      }
    }

    // Add event listener to the form
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', handleFormSubmit);

    // Set default place value on page load
    setDefaultPlace();

    // Fetch weather data for the default place
    fetchWeatherData('London')
      .then(data => {
        updateWeatherInfo(data);
      });