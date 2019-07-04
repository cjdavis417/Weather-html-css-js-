
var curLoc = document.getElementById('location');
var curTime = document.getElementById('curTime');
var curTemp = document.getElementById('curTemp');
var curTempColor = document.getElementById('curTempColor');
var curCond = document.getElementById('curCond');
var curHum = document.getElementById('curHum');
var curWind = document.getElementById('curWind');
var curDirection = document.getElementById('curDirection');
var outlookTag = document.getElementById('outlook');
var sunrise = document.getElementById('sunrise');
var sunset = document.getElementById('sunset');

var form = document.getElementById('MyLocation');
var submitButton = document.getElementById('submit');
form.addEventListener('submit', function (e) {
    console.log("submit value: ", submit.value)
    if (submit.value == 'new') {
        e.preventDefault()
        var zipcode = document.getElementById('myLoc').value;
        getWeather(zipcode);
        getForcast(zipcode);
        submit.innerHTML = "Reset"
        submit.value = "off";
    }
});

function getWeather(zip) {
    const URL = 'https://api.openweathermap.org/data/2.5/weather'
    var requestURL = URL + '?zip=' + zip + ',us&APPID=6fb8c30fb929a4320dd57f04a61b8837';

    fetch(requestURL)
        .then(response => response.json())
        .then(function (myJson) {
            var temp = kel2far(myJson.main.temp);
            curLoc.innerHTML = myJson.name + ', ' + myJson.sys.country;
            curCond.innerHTML = myJson.weather[0].main + ': ' + myJson.weather[0].description + ', ' + myJson.clouds.all + '% cloud cover';
            curTemp.innerHTML = temp;
            curTempColor.style.color = tempColor(temp);
            curHum.innerHTML = myJson.main.humidity;
            curWind.innerHTML = myJson.wind.speed;
            curDirection.innerHTML = compassDir(myJson.wind.deg);
            curTime.innerHTML = epochDate(myJson.dt) + ', ' + epochTime(myJson.dt);
            sunrise.innerHTML = epochTime(myJson.sys.sunrise)
            sunset.innerHTML = epochTime(myJson.sys.sunset)

        })
}

function tempColor(temp) {
    var color = '';
    switch(true) {
        case (temp >= 100):
            color = 'darkred';
            break;
        case (temp >= 90):
            color = 'red';
            break;
        case (temp >= 80):
            color = 'scarlet';
            break;
        case (temp >= 70):
            color = 'orange';
            break;
        case (temp >= 60):
            color = 'yellow';
            break;
        case (temp >= 50):
            color = 'richgreen';
            break;
        case (temp >= 40):
            color = 'green';
            break;
        case (temp >= 30):
            color = 'skyblue';
            break;
        case (temp >= 20):
            color = 'blue';
            break;
        case (temp >= 10):
            color = 'purple';
            break;
        case (temp >= 0):
            color = 'pinkypurple';
            break;
        case (temp < 0):
            color = 'magenta'
            break;
    }
    return color;
}

function getForcast(zip) {
    const URL = 'https://api.openweathermap.org/data/2.5/forecast'
    var requestURL = URL + '?zip=' + zip + ',us&APPID=6fb8c30fb929a4320dd57f04a61b8837';

    fetch(requestURL)
        .then(response => response.json())
        .then(function (myJson) {
            var data = [];
            myJson.list.forEach( e => data.push(e));
            outlook(data);
        })
}

function outlook(data) {
    var outlook = [];
    for (var i = 1; i < data.length; i++) {
        
        var forcast = new OutlookDay() 
        forcast.date = data[i].dt,
        forcast.temp = data[i].main.temp,
        forcast.description = data[i].weather[0].description;
        
        outlook.push(forcast);
    }
    console.log(outlook);

    var slimOutlook = [];
    outlook.forEach(function(e) {
        var date = new Date(e.date * 1000);
        
        if (date.getHours() == 14) {
            slimOutlook.push(e);
        }
    })

    var fiveDays = document.getElementById('fiveDays');
    var slimHTML = [];
    slimHTML = slimOutlook.map(e => 
        "<div class='card m-3 p-2 shadow-sm'>" +
            "<div class='card-body>" +
                "<h5 class='card-title'>" + epochDate(e.date) + "</h5>" +
                "<p>" + epochTime(e.date) + "</p>" +
                "<h6 class='card-subtitle'>" + e.description + "</h6>" +
                "<h4>High: " + kel2far(e.temp) + "</h4>" +
            "</div>" +
        "</div>");
        var cardString = '';
    for (var i = 0; i < slimHTML.length; i++) {
        cardString += slimHTML[i];
    }
    fiveDays.innerHTML = cardString;

    
    console.log("slimHTML: ", slimHTML);
}



// converts epoch to regular date   
function epochDate(epoch) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var newdate = new Date(epoch * 1000);
    var dateString = daysOfWeek[newdate.getDay()] + ", " + months[newdate.getMonth()] + " " + newdate.getUTCDate();
    return dateString;
}

function epochTime(epoch) {
    var newdate = new Date(epoch * 1000);
    var hour = 0;
    var ampm = "am";
    if (newdate.getHours() > 12) {
        hour = newdate.getHours() - 12;
        ampm = "pm";
    } else {
        hour = newdate.getHours();
    }
    
    var minute = 0;
    if (newdate.getMinutes() == 0) {
        minute = '00';
    } else if (newdate.getMinutes() < 10) {
        minute = '0' + newdate.getMinutes();
    } else {
        minute = newdate.getMinutes();
    }
    var timeString = hour + ":" + minute + ampm;
    return timeString;
}

// convert K to F
function kel2far(kelvin) {
    return Math.round((kelvin - 273.15)*9/5+32)
}

// convert degrees to compass direction
function compassDir(degrees) {
    if (degrees == 360) {
        return 'N';
    } else if (degrees >= 337.5) {
        return 'NNW';
    } else if (degrees >= 315) {
        return 'NW';
    } else if (degrees >= 292.5) {
        return 'WNW';
    } else if (degrees >= 270) {
        return 'W';
    } else if (degrees >= 247.5) {
        return 'WSW'
    } else if (degrees >= 225) {
        return 'SW';
    } else if (degrees >= 202.5) {
        return 'SSW';
    } else if (degrees >= 160) {
        return 'S';
    } else if (degrees >= 157.5) {
        return 'SSE';
    } else if (degrees >= 135) {
        return 'SE';
    } else if (degrees >= 112.5) {
        return 'ESE';
    } else if (degrees >= 90) {
        return 'E';
    } else if (degrees >= 67.5) {
        return 'ENE';
    } else if (degrees >= 45) {
        return 'NE';
    } else if (degrees >= 22.5) {
        return 'NNE';
    } else {
        return 'N';
    }
}

class OutlookDay {
    constructor (outDay, outTemp, outDescription) {
        var outDay = outDay;
        var outTemp = outTemp;
        var outDescription = outDescription;
    }
}

