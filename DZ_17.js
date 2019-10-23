$(function(){

    // const ACCESS_KEY = "85a21c4011a4bdf785a05dba537dfe51"; // значение ключа доступа после регистрации
    // makeAPICall("http://api.weatherstack.com/current?access_key=" + ACCESS_KEY + "&query=Minsk&unit=m&callback=test");
    // createAPI(getWeather());
    ACCESS_KEY = "d26f0110b607b404c6ab58c4a721067b"; //ключ для опенвезермэп
    makeAPICall("http://api.openweathermap.org/data/2.5/weather?q=Vitebsk&units=Metric&appid=" + ACCESS_KEY);
    
    function getWeather()
    {
        const result = {
            "request": {
                "type": "City",
                "query": "San Francisco, United States of America",
                "language": "en",
                "unit": "m"
            },
            "location": {
                "name": "San Francisco",
                "country": "United States of America",
                "region": "California",
                "lat": "37.775",
                "lon": "-122.418",
                "timezone_id": "America/Los_Angeles",
                "localtime": "2019-09-03 05:35",
                "localtime_epoch": 1567488900,
                "utc_offset": "-7.0"
            },
            "current": {
                "observation_time": "12:35 PM",
                "temparature": 16,
                "weather_code": 122,
                "weather_icons": [
                    "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
                ],
                "weather_descriptions": [
                    "Overcast"
                ],
            "wind_speed": 17,
            "wind_degree": 260,
            "wind_dir": "W",
            "pressure": 1016,
            "precip": 0,
            "humidity": 87,
            "cloudcover": 100,
            "feelslike": 16,
            "uv_index": 0,
            "visibility": 16
            }
        }
        return JSON.stringify(result);
    }

    function createAPI(response){

    
    const weatherFullData =  // вызываем параметры удобными для нас названиями
    {
        city: response.name,
        country: response.sys.country,
        time: new Date(response.dt*1000),
        icon: "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png",
        iconDescription: response.weather[0].description,
        temparature: response.main.temp,
        wind: response.wind.speed,
        humidity: response.main.humidity,
        pressure: response.main.pressure
    }
    // console.log(weatherFullData);


    $("<div id='main'>").appendTo("body");

    $("<div id='main1'>").appendTo("#main");
    $("<div id='nameCity'>").text(weatherFullData.city + ", " + weatherFullData.country).appendTo("#main1");
    $("<div id='date'>").text(weatherFullData.time).appendTo("#main1");

    $("<div id='main2'>").appendTo("#main");
    $("<div id='main2_1'>").appendTo("#main2");
    $("<div id='icon'>").appendTo("#main2_1");
    $("<img id='img' src='" + weatherFullData.icon + "' />").appendTo("#icon");

    $("<div id='iconDesc'>").text(weatherFullData.iconDescription).appendTo("#main2_1");

    $("<div id='main2_2'>").appendTo("#main2");
    $("<div id='temp'>").text(weatherFullData.temparature + " ℃").appendTo("#main2_2");

    $("<div id='main2_3'>").appendTo("#main2");
    $("<div id='wind'>").text("wind: " + weatherFullData.wind + " kph").appendTo("#main2_3");
    $("<div id='precip'>").text("humidity: " + weatherFullData.humidity + " mm").appendTo("#main2_3");
    $("<div id='pressure'>").text("pressure: " + weatherFullData.pressure + " mb").appendTo("#main2_3");
    }

   function makeAPICall(url){
      $.ajax({
    //     // async: true, //true или false тру под дефолту
    //     // contentType: "application/json",
    //     // dataFilter: ,
        dataType: "json",
    //     // timeout:  10000,
        // type: "GET",
        // crossDomain: true,
        url: url,
    //     beforeSend: function(){
    //         // функция перед отправкой
    //     },
        success: function(resp){
        createAPI(resp);
        }, 
        error: function (err, status){

        }
        // function(){}, // действие если успешный запрос
    //     errror: function(){}, // действие если ошибка
    //     complete: function(){}, // действие после запроса
    });  
   }
   

})