$(document).ready(function() {
    $('button').click(function() {
        var cityName = $('input[type="text"]').val();
        var apiKey = '7b300d672c57ffad22d9822779ecd22c'
        $.ajax({
            url: 'http://api.openweathermap.org/geo/1.0/direct',
            method: 'GET',
            data: {
                q: cityName,
                limit: 5,
                appid: apiKey
            },
            success: function(response) {
                var latitude = response[0].lat;
                var longitude = response[0].lon;
                console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);
            },
            error: function(error) {
                console.log('An error ocurred:' + error);
            }
        });

    });
});