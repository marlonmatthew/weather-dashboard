$(document).ready(function () {

    var cityInput = $("#inputCity");
    var cityList = $("#cityList");

    // Array to contain locally stored cities
    var cities = [];
    console.log(cities);

    // API key
    var APIKey = "52f5fdf4f2018b9b93edd0214f3284c9";

    // Initialize stored cities
    init();

    function apiOneCall(lat, lon) {

        // URL we need to query the database
        var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;

        // AJAX call to the OpenWeatherMap OneCall API
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                // Log the response
                console.log(response);

                // Display the UV Index
                var uvIndex = response.current.uvi;
                $("#uvIndex").append(`UV Index: ${uvIndex}`);

            });

    };

    function apiCallCurrent(userCity) {

        // URL we need to query the database
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${APIKey}`;

        // AJAX call to the OpenWeatherMap Current Weather Data API
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // Retrieved data goes inside the object "response"
            .then(function (response) {

                // Log the response
                console.log(response);

                // Display the city
                var currentCity = response.name;
                $("#city").append(`City: ${currentCity}`);

                // Display the temp
                var temp = response.main.temp;
                $("#temp").append(`Temperature: ${temp} °F`);

                // Display the humidity
                var humidity = response.main.humidity;
                $("#humidity").append(`Humidity: ${humidity}%`);

                // Display the wind speed
                var windSpeed = response.wind.speed;
                $("#windSpeed").append(`Wind Speed: ${windSpeed} MPH`);

                // Send coordinates to One Call API for the UV Index
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                apiOneCall(lat, lon);

            });

    };

    function apiCall5Day(userCity) {

        // URL we need to query the database
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=imperial&appid=${APIKey}`;

        // AJAX call to the OpenWeatherMap 5 Day API
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // Retrieved data goes inside the object "response"
            .then(function (response) {

                // Log the response
                console.log(response);

                // Display the date
                var date1 = response.list[3].dt_txt;
                var date2 = response.list[11].dt_txt;
                var date3 = response.list[19].dt_txt;
                var date4 = response.list[27].dt_txt;
                var date5 = response.list[35].dt_txt;
                $("#date1").append(`Date: ${date1}`);
                $("#date2").append(`Date: ${date2}`);
                $("#date3").append(`Date: ${date3}`);
                $("#date4").append(`Date: ${date4}`);
                $("#date5").append(`Date: ${date5}`);

                //Display the weather
                var weather1 = response.list[3].weather[0].main;
                var weather2 = response.list[11].weather[0].main;
                var weather3 = response.list[19].weather[0].main;
                var weather4 = response.list[27].weather[0].main;
                var weather5 = response.list[35].weather[0].main;
                $("#weather1").append(`Weather: ${weather1}`);
                $("#weather2").append(`Weather: ${weather2}`);
                $("#weather3").append(`Weather: ${weather3}`);
                $("#weather4").append(`Weather: ${weather4}`);
                $("#weather5").append(`Weather: ${weather5}`);

                // Display the icon
                var icon1 = response.list[3].weather[0].icon;
                var iconURL = `http://openweathermap.org/img/w/${icon1}.png`;
                var icon_1 = $('<img>').attr('src', iconURL);
                $("#icon1").append(icon_1);
                var icon2 = response.list[11].weather[0].icon;
                var iconURL = `http://openweathermap.org/img/w/${icon2}.png`;
                var icon_2 = $('<img>').attr('src', iconURL);
                $("#icon2").append(icon_2);
                var icon3 = response.list[19].weather[0].icon;
                var iconURL = `http://openweathermap.org/img/w/${icon3}.png`;
                var icon_3 = $('<img>').attr('src', iconURL);
                $("#icon3").append(icon_3);
                var icon4 = response.list[27].weather[0].icon;
                var iconURL = `http://openweathermap.org/img/w/${icon4}.png`;
                var icon_4 = $('<img>').attr('src', iconURL);
                $("#icon4").append(icon_4);
                var icon5 = response.list[35].weather[0].icon;
                var iconURL = `http://openweathermap.org/img/w/${icon5}.png`;
                var icon_5 = $('<img>').attr('src', iconURL);
                $("#icon5").append(icon_5);

                // Display the temp
                var temp1 = response.list[3].main.temp;
                var temp2 = response.list[11].main.temp;
                var temp3 = response.list[19].main.temp;
                var temp4 = response.list[27].main.temp;
                var temp5 = response.list[35].main.temp;
                $("#temp1").append(`Temperature: ${temp1}°F`);
                $("#temp2").append(`Temperature: ${temp2}°F`);
                $("#temp3").append(`Temperature: ${temp3}°F`);
                $("#temp4").append(`Temperature: ${temp4}°F`);
                $("#temp5").append(`Temperature: ${temp5}°F`);

                // Display the humidity
                var humidity1 = response.list[3].main.humidity;
                var humidity2 = response.list[11].main.humidity;
                var humidity3 = response.list[19].main.humidity;
                var humidity4 = response.list[27].main.humidity;
                var humidity5 = response.list[35].main.humidity;
                $("#humidity1").append(`Humidity: ${humidity1}`);
                $("#humidity2").append(`Humidity: ${humidity2}`);
                $("#humidity3").append(`Humidity: ${humidity3}`);
                $("#humidity4").append(`Humidity: ${humidity4}`);
                $("#humidity5").append(`Humidity: ${humidity5}`);

            });

    };

    function storeCities() {

        // Stringify and set cities key to cities array
        localStorage.setItem("cities", JSON.stringify(cities));

    };

    function clearData() {

        // Clear all data
        $("#city").empty();
        $("#temp").empty();
        $("#humidity").empty();
        $("#windSpeed").empty();
        $("#uvIndex").empty();
        $("#date1").empty();
        $("#date2").empty();
        $("#date3").empty();
        $("#date4").empty();
        $("#date5").empty();
        $("#weather1").empty();
        $("#weather2").empty();
        $("#weather3").empty();
        $("#weather4").empty();
        $("#weather5").empty();
        $("#icon1").empty();
        $("#icon2").empty();
        $("#icon3").empty();
        $("#icon4").empty();
        $("#icon5").empty();
        $("#temp1").empty();
        $("#temp2").empty();
        $("#temp3").empty();
        $("#temp4").empty();
        $("#temp5").empty();
        $("#humidity1").empty();
        $("#humidity2").empty();
        $("#humidity3").empty();
        $("#humidity4").empty();
        $("#humidity5").empty();

    };

    $("#searchForm").submit(function (e) {

        // Prevent page refresh
        e.preventDefault();

        // Clear all data
        clearData();

        // The inputted city name stored in a new variable
        var userCity = cityInput.val().trim();

        // Return if input is blank
        if (userCity === "") {
            return;
        };

        // Add new city to cities array
        cities.push(userCity);

        // Clear input
        cityInput.value = "";

        // Store cities in localStorage
        storeCities();

        // Re-render cities
        renderCities();

        // API call for Current Weather
        apiCallCurrent(userCity);

        // API call for 5 day forecast
        apiCall5Day(userCity);

    });

    $(".cityListItem").on("click", function () {

        var userCity = $(this).val();
        console.log(userCity);
        console.log(this);

        // Clear all data
        clearData();

        // API call for Current Weather
        apiCallCurrent(userCity);

        // API call for 5 day forecast
        apiCall5Day(userCity);

    });

    $("#clearButton").on("click", function () {

        // Clear localStorage
        localStorage.clear();

        // Clear city list
        cityList.empty();

    });

    function renderCities() {

        // Clear city list
        cityList.html("");

        // Render cities
        for (var i = 0; i < cities.length; i++) {

            var city = cities[i];
            var newButton = $(`<button class="cityListItem" value="${city}">`);
            newButton.text(city);
            cityList.append(newButton);

        };

    };

    function init() {

        // Retieve stored cities from localStorage
        // Parse JSON string to an object
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        if (storedCities !== null) {
            cities = storedCities;
        }

        // Render cities
        renderCities();

    };

});