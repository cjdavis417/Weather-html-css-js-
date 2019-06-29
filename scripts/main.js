
var curLoc = document.getElementById('location');
var curTime = document.getElementById('curTime');
var curTemp = document.getElementById('curTemp');
var curCond = document.getElementById('curCond');
var curHum = document.getElementById('curHum');
var curWind = document.getElementById('curWind');
var curDirection = document.getElementById('curDirection');
var outlookTag = document.getElementById('outlook');

function checkRefresh(zip) {
    if (fiveDays.hasChildNodes()) {
        console.log(outlookTag.children.length);
        //location.reload();  
    } 
}

var form = document.getElementById('MyLocation');
var submitButton = document.getElementById('submit');
form.addEventListener('submit', function (e) {
    console.log("submit value: ", submit.value)
    if (submit.value == 'new') {
        e.preventDefault()
        var zipcode = document.getElementById('myLoc').value;
        getWeather(zipcode);
        submit.innerHTML = "Reset"
        submit.value = "off";
    }
});

function getWeather(zip) {
    checkRefresh(zip);
    const URL = 'https://api.openweathermap.org/data/2.5/forecast'
    var requestURL = URL + '?zip=' + zip + ',us&APPID=6fb8c30fb929a4320dd57f04a61b8837';

    fetch(requestURL)
        .then(response => response.json())
        .then(function (myJson) {

            var data = [];
            myJson.list.forEach( e => data.push(e));
            outlook(data);

            curLoc.innerHTML = myJson.city.name + ', ' + myJson.city.country;
            curCond.innerHTML = myJson.list[0].weather[0].description;
            curTemp.innerHTML = kel2far(myJson.list[0].main.temp);
            curHum.innerHTML = myJson.list[0].main.humidity;
            curWind.innerHTML = myJson.list[0].wind.speed;
            curDirection.innerHTML = compassDir(myJson.list[0].wind.deg);
            curTime.innerHTML = epochDate(myJson.list[0].dt);

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
    var hours = [];
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

function pageState() {
    location.reload();
}