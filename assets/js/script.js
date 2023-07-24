$(document).ready(function() {

    $('button').click(function() {
        var cityName = $('input[type="text"]').val();
        var apiKey = '7b300d672c57ffad22d9822779ecd22c';
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

                    $.ajax({
                        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
                        method: 'GET',
                        success: function(responseWeather) {
                            console.log(responseWeather);
                            var temp = responseWeather.main.temp;
                            var wind = responseWeather.wind.speed;
                            var humidity = responseWeather.main.humidity;
                            console.log('temp:' + temp + 'wind:' + wind + 'humidity:' + humidity);

                            document.getElementById('city').textContent = cityName;
                            document.getElementById('temp').textContent = 'Temperature: ' + temp;
                            document.getElementById('wind').textContent = 'Wind: ' + wind;
                            document.getElementById('humidity').textContent = 'Humidity: ' + humidity;

                            $.ajax({
                                url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=40`,
                                method: 'GET',
                                success: function(weatherForecast) {
                                    var dayOne = weatherForecast.list[3];
                                    var dayTwo = weatherForecast.list[11];
                                    var dayThree = weatherForecast.list[19];
                                    var dayFour = weatherForecast.list[27];
                                    var dayFive = weatherForecast.list[35];

                                    var datePartOne = dayOne.dt_txt.split(' ')[0];
                                    var datePartTwo = dayTwo.dt_txt.split(' ')[0];
                                    var datePartThree = dayThree.dt_txt.split(' ')[0];
                                    var datePartFour = dayFour.dt_txt.split(' ')[0];
                                    var datePartFive = dayFive.dt_txt.split(' ')[0];

                                    document.getElementById('dayOneDate').textContent = datePartOne;
                                    document.getElementById('dayOneTemp').textContent = 'Temperature: ' + dayOne.main.temp;
                                    document.getElementById('dayOneWind').textContent = 'Wind Speed: ' + dayOne.wind.speed;
                                    document.getElementById('dayOneHumidity').textContent = 'Humidity: ' + dayOne.main.humidity;

                                    document.getElementById('dayTwoDate').textContent = datePartTwo;
                                    document.getElementById('dayTwoTemp').textContent = 'Temperature: ' + dayTwo.main.temp;
                                    document.getElementById('dayTwoWind').textContent = 'Wind Speed: ' + dayTwo.wind.speed;
                                    document.getElementById('dayTwoHumidity').textContent = 'Humidity: ' + dayTwo.main.humidity;

                                    document.getElementById('dayThreeDate').textContent = datePartThree;
                                    document.getElementById('dayThreeTemp').textContent = 'Temperature: ' + dayThree.main.temp;
                                    document.getElementById('dayThreeWind').textContent = 'Wind Speed: ' + dayThree.wind.speed;
                                    document.getElementById('dayThreeHumidity').textContent = 'Humidity: ' + dayThree.main.humidity;

                                    document.getElementById('dayFourDate').textContent = datePartFour;
                                    document.getElementById('dayFourTemp').textContent = 'Temperature: ' + dayFour.main.temp;
                                    document.getElementById('dayFourWind').textContent = 'Wind Speed: ' + dayFour.wind.speed;
                                    document.getElementById('dayFourHumidity').textContent = 'Humidity: ' + dayFour.main.humidity;

                                    document.getElementById('dayFiveDate').textContent = datePartFive;
                                    document.getElementById('dayFiveTemp').textContent = 'Temperature: ' + dayFour.main.temp;
                                    document.getElementById('dayFiveWind').textContent = 'Wind Speed: ' + dayFour.wind.speed;
                                    document.getElementById('dayFiveHumidity').textContent = 'Humidity: ' + dayFour.main.humidity;
                                    
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

            
        var savedCities = JSON.parse(localStorage.getItem('savedCity')) || [];
        savedCities.push(cityName);
        localStorage.setItem('savedCity', JSON.stringify(savedCities));

        var savedCitiesContainer = document.getElementById('savedCitiesContainer');
        savedCitiesContainer.innerHTML = '';
        savedCities.forEach(function(city) {
            var li = document.createElement('li');
            li.textContent = city;
            savedCitiesContainer.appendChild(li);  
        })
    });
});