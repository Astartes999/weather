$(function(){

    // const ACCESS_KEY = "85a21c4011a4bdf785a05dba537dfe51"; // значение ключа доступа после регистрации
    // makeAPICall("http://api.weatherstack.com/current?access_key=" + ACCESS_KEY + "&query=Minsk&unit=m&callback=test");
    // createAPI(getWeather());
    ACCESS_KEY = "d26f0110b607b404c6ab58c4a721067b"; //ключ для опенвезермэп
    makeAPICall("http://api.openweathermap.org/data/2.5/weather?q=Vitebsk&units=Metric&appid=" + ACCESS_KEY, false);
    makeAPICall("http://api.openweathermap.org/data/2.5/forecast?q=Vitebsk&units=Metric&appid=" + ACCESS_KEY, true); // запрос для скольки-то дней

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

    function createAPI1(response)
    {
    const  weatherFullData1 = 
        {
            day_1: response.list[0].dt,
            day_2: response.list[8].dt,
            day_3: response.list[16].dt,
            day_4: response.list[24].dt,
            day_5: response.list[32].dt,
    
            temp_1: response.list[0].main.temp,
            temp_2: response.list[8].main.temp,
            temp_3: response.list[16].main.temp,
            temp_4: response.list[24].main.temp,
            temp_5: response.list[32].main.temp,
            
            icon_1: "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png",
            icon_2: "http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + "@2x.png",
            icon_3: "http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + "@2x.png",
            icon_4: "http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + "@2x.png",
            icon_5: "http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + "@2x.png",
        
        }

        $("<div id='day_1'>").appendTo("#main");
        $("<div id='day_1_1'>").text(weatherFullData1.day_1).appendTo("#day_1");
        $("<div id='day_1_2'>").text(weatherFullData1.temp_1).appendTo("#day_1");
        $("<img id='img_1' src='" + weatherFullData1.icon_1 + "' />").appendTo("#day_1");
        
        
    }

   function makeAPICall(url, isForecast){
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
            if (isForecast)
            {
                createAPI1(resp);
            }
            else
            {
                createAPI(resp);
            }
            
        }, 
        error: function (err, status){

        }
        // function(){}, // действие если успешный запрос
    //     errror: function(){}, // действие если ошибка
    //     complete: function(){}, // действие после запроса
    });  
   }
   

})