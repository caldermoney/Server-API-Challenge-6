$(document).ready(function() {

    function updateSearchButtons() {
        var searches = JSON.parse(localStorage.getItem('searches')) || [];
        var savedCitiesContainer = $('#savedCitiesContainer');
        savedCitiesContainer.empty();
        searches.forEach(function(search) {
            var button = $('<button>').text(search);
            button.click(function() {
                $('input[type="text"]').val(search);
                $('button').click();
            });
            savedCitiesContainer.append(button);
        });
    }
    updateSearchButtons();


    // When the button is clicked
    $('button').click(function() {
        // Get the entered city name
        var cityName = $('input[type="text"]').val();

    if (cityName) {
        var searches = JSON.parse(localStorage.getItem('searches')) || [];
        // Add the new search to the beginning of the array
        searches.unshift(cityName);
        // Remove duplicates
        searches = Array.from(new Set(searches));
        // Keep only the last 5 searches
        searches = searches.slice(0, 5);
        // Save the updated searches to local storage
        localStorage.setItem('searches', JSON.stringify(searches));

        updateSearchButtons();
    }

        var apiKey = '7b300d672c57ffad22d9822779ecd22c';

        // Make an AJAX call to get coordinates of the entered city
        $.ajax({
            url: 'http://api.openweathermap.org/geo/1.0/direct',
            method: 'GET',
            data: {
                q: cityName,
                limit: 1,
                appid: apiKey
            },
            success: function(responseCoordinates) {
                var latitude = responseCoordinates[0].lat;
                var longitude = responseCoordinates[0].lon;
                console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);

                // Make another AJAX call to get current weather details using the coordinates
                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
                    method: 'GET',
                    success: function(responseWeather) {
                        console.log(responseWeather);
                        var temp = responseWeather.main.temp;
                        var wind = responseWeather.wind.speed;
                        var humidity = responseWeather.main.humidity;
                        console.log('temp:' + temp + 'wind:' + wind + 'humidity:' + humidity);

                        // Set the weather details to respective elements
                        document.getElementById('city').textContent = cityName;
                        document.getElementById('temp').textContent = 'Temperature: ' + temp;
                        document.getElementById('wind').textContent = 'Wind: ' + wind;
                        document.getElementById('humidity').textContent = 'Humidity: ' + humidity;

                        // Make a third AJAX call to get a 5-day forecast using the coordinates
                        $.ajax({
                            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&cnt=40`,
                            method: 'GET',
                            success: function(weatherForecast) {
                                // Extract data for each of the 5 days and set to elements
                                var dayOne = weatherForecast.list[3];
                                var dayTwo = weatherForecast.list[11];
                                var dayThree = weatherForecast.list[19];
                                var dayFour = weatherForecast.list[27];
                                var dayFive = weatherForecast.list[35];

                                // Indicators extraction Day 1
                                var datePartOne = dayOne.dt_txt.split(' ')[0];
                                var tempPartOne = dayOne.main.temp;
                                var windPartOne = dayOne.wind.speed;
                                var humidityPartOne = dayOne.main.humidity;

                                 // Indicators extraction Day 2
                                 var datePartTwo = dayTwo.dt_txt.split(' ')[0];
                                 var tempPartTwo = dayTwo.main.temp;
                                 var windPartTwo = dayTwo.wind.speed;
                                 var humidityPartTwo = dayTwo.main.humidity;

                                  // Indicators extraction Day 3
                                var datePartThree = dayThree.dt_txt.split(' ')[0];
                                var tempPartThree = dayThree.main.temp;
                                var windPartThree = dayThree.wind.speed;
                                var humidityPartThree = dayThree.main.humidity;

                                 // Indicators extraction Day 4
                                 var datePartFour = dayFour.dt_txt.split(' ')[0];
                                 var tempPartFour = dayFour.main.temp;
                                 var windPartFour = dayFour.wind.speed;
                                 var humidityPartFour = dayFour.main.humidity;

                                  // Indicators extraction Day 5
                                var datePartFive = dayFive.dt_txt.split(' ')[0];
                                var tempPartFive = dayFive.main.temp;
                                var windPartFive = dayFive.wind.speed;
                                var humidityPartFive = dayFive.main.humidity;


                                // Set the forecast details to respective elements for each day
                                document.getElementById('dayOneDate').textContent = 'Date: ' + datePartOne;
                                document.getElementById('dayOneTemp').textContent = 'Temperature: ' + tempPartOne + ' C';
                                document.getElementById('dayOneWind').textContent = 'Wind Speed: ' + windPartOne;
                                document.getElementById('dayOneHumidity').textContent = 'Humidity: ' + humidityPartOne;

                                document.getElementById('dayTwoDate').textContent = 'Date: ' + datePartTwo;
                                document.getElementById('dayTwoTemp').textContent = 'Temperature: ' + tempPartTwo + ' C';
                                document.getElementById('dayTwoWind').textContent = 'Wind Speed: ' + windPartTwo;
                                document.getElementById('dayTwoHumidity').textContent = 'Humidity: ' + humidityPartTwo;

                                document.getElementById('dayThreeDate').textContent = 'Date: ' + datePartThree;
                                document.getElementById('dayThreeTemp').textContent = 'Temperature: ' + tempPartThree + ' C';
                                document.getElementById('dayThreeWind').textContent = 'Wind: ' + windPartThree;
                                document.getElementById('dayThreeHumidity').textContent = 'Hunidity: ' + humidityPartThree;

                                document.getElementById('dayFourDate').textContent = 'Date: ' + datePartFour;
                                document.getElementById('dayFourTemp').textContent = 'Temperature: ' + tempPartFour + ' C';
                                document.getElementById('dayFourWind').textContent = 'Wind Speed: ' + windPartFour;
                                document.getElementById('dayFourHumidity').textContent = 'Humidity: ' + humidityPartFour;

                                document.getElementById('dayFiveDate').textContent = 'Date: ' + datePartFive;
                                document.getElementById('dayFiveTemp').textContent = 'Temperature: ' + tempPartFive + ' C';
                                document.getElementById('dayFiveWind').textContent = 'Wind: ' + windPartFive;
                                document.getElementById('dayFiveHumidity').textContent = 'Humidity: + ' + humidityPartFive;


                                // Display the forecast elements
                                $("#dayOneDate, #dayOneTemp, #dayOneWind, #dayOneHumidity").parent().show();
                                $("#dayTwoDate, #dayTwoTemp, #dayTwoWind, #dayTwoHumidity").parent().show();
                                $("#dayThreeDate, #dayThreeTemp, #dayThreeWind, #dayThreeHumidity").parent().show();
                                $("#dayFourDate, #dayFourTemp, #dayFourWind, #dayFourHumidity").parent().show();
                                $("#dayFiveDate, #dayFiveTemp, #dayFiveWind, #dayFiveHumidity").parent().show();
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        });
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
                
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
})
