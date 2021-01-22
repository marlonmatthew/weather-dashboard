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

                // Display UV Index Color
                if (uvIndex < 3) {
                    var greenURL = `uvi-low.jpg`;
                    var green = $(`<img>`).attr(`src`, greenURL);
                    green.addClass("color")
                    $("#uvIndex").append(green)
                } else if (uvIndex < 6) {
                    var yellowURL = `uvi-moderate.jpg`;
                    var yellow = $(`<img>`).attr(`src`, yellowURL);
                    yellow.addClass("color")
                    $("#uvIndex").append(yellow)
                } else if (uvIndex < 8) {
                    var orangeURL = `uvi-high.jpg`;
                    var orange = $(`<img>`).attr(`src`, orangeURL);
                    orange.addClass("color")
                    $("#uvIndex").append(orange)
                } else if (uvIndex < 11) {
                    var redURL = `uvi-veryhigh.jpg`;
                    var red = $(`<img>`).attr(`src`, redURL);
                    red.addClass("color")
                    $("#uvIndex").append(red)
                } else {
                    var purpleURL = `uvi-extreme.jpg`;
                    var purple = $(`<img>`).attr(`src`, purpleURL);
                    purple.addClass("color")
                    $("#uvIndex").append(purple)
                };

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
                $("#city").append(currentCity);

                // Display the condition
                var icon = response.weather[0].icon;
                var iconURL = `http://openweathermap.org/img/w/${icon}.png`;
                var icon_ = $('<img>').attr('src', iconURL);
                $("#condition").append(icon_);
                var condition = response.weather[0].main;
                $("#condition").append(` ${condition}`);

                // Display the temp
                var temp = response.main.temp;
                $("#temp").append(`Temperature: ${temp} °F`);

                // Display the humidity
                var humidity = response.main.humidity;
                $("#humidity").append(`Humidity: ${humidity}% `);

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
                var date1 = response.list[4].dt_txt;
                var date2 = response.list[12].dt_txt;
                var date3 = response.list[20].dt_txt;
                var date4 = response.list[28].dt_txt;
                var date5 = response.list[36].dt_txt;
                $("#date1").append(date1);
                $("#date2").append(date2);
                $("#date3").append(date3);
                $("#date4").append(date4);
                $("#date5").append(date5);

                //Display the weather
                var weather1 = response.list[4].weather[0].main;
                var weather2 = response.list[12].weather[0].main;
                var weather3 = response.list[20].weather[0].main;
                var weather4 = response.list[28].weather[0].main;
                var weather5 = response.list[36].weather[0].main;
                $("#weather1").append(weather1);
                $("#weather2").append(weather2);
                $("#weather3").append(weather3);
                $("#weather4").append(weather4);
                $("#weather5").append(weather5);

                // Display the icon
                var icon1 = response.list[4].weather[0].icon;
                var icon1URL = `http://openweathermap.org/img/w/${icon1}.png`;
                var icon_1 = $('<img>').attr('src', icon1URL);
                $("#icon1").append(icon_1);
                var icon2 = response.list[12].weather[0].icon;
                var icon2URL = `http://openweathermap.org/img/w/${icon2}.png`;
                var icon_2 = $('<img>').attr('src', icon2URL);
                $("#icon2").append(icon_2);
                var icon3 = response.list[20].weather[0].icon;
                var icon3URL = `http://openweathermap.org/img/w/${icon3}.png`;
                var icon_3 = $('<img>').attr('src', icon3URL);
                $("#icon3").append(icon_3);
                var icon4 = response.list[28].weather[0].icon;
                var icon4URL = `http://openweathermap.org/img/w/${icon4}.png`;
                var icon_4 = $('<img>').attr('src', icon4URL);
                $("#icon4").append(icon_4);
                var icon5 = response.list[36].weather[0].icon;
                var icon5URL = `http://openweathermap.org/img/w/${icon5}.png`;
                var icon_5 = $('<img>').attr('src', icon5URL);
                $("#icon5").append(icon_5);

                // Display the temp
                var temp1 = response.list[4].main.temp;
                var temp2 = response.list[12].main.temp;
                var temp3 = response.list[20].main.temp;
                var temp4 = response.list[28].main.temp;
                var temp5 = response.list[36].main.temp;
                $("#temp1").append(`Temp: ${temp1} °F`);
                $("#temp2").append(`Temp: ${temp2} °F`);
                $("#temp3").append(`Temp: ${temp3} °F`);
                $("#temp4").append(`Temp: ${temp4} °F`);
                $("#temp5").append(`Temp: ${temp5} °F`);

                // Display the humidity
                var humidity1 = response.list[4].main.humidity;
                var humidity2 = response.list[12].main.humidity;
                var humidity3 = response.list[20].main.humidity;
                var humidity4 = response.list[28].main.humidity;
                var humidity5 = response.list[36].main.humidity;
                $("#humidity1").append(`Humidity: ${humidity1}%`);
                $("#humidity2").append(`Humidity: ${humidity2}%`);
                $("#humidity3").append(`Humidity: ${humidity3}%`);
                $("#humidity4").append(`Humidity: ${humidity4}%`);
                $("#humidity5").append(`Humidity: ${humidity5}%`);

            });

    };

    function storeCities() {

        // Stringify and set cities key to cities array
        localStorage.setItem("cities", JSON.stringify(cities));

    };

    function clearData() {

        // Clear all data
        $("#city").empty();
        $("#condition").empty();
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