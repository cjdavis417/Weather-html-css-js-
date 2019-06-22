const apiKey = '6fb8c30fb929a4320dd57f04a61b8837';

const URL = 'https://api.openweathermap.org/data/2.5/forecast'
var zip = '40204';

var requestURL = URL + '?zip=' + zip + ',us&APPID=6fb8c30fb929a4320dd57f04a61b8837';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
console.log(requestURL);
document.getElementById('location').innerHTML = zip;
var curTime = document.getElementById('curTime');
var curTemp = document.getElementById('curTemp');
var curCond = document.getElementById('curCond');
var curHum = document.getElementById('curHum');
var curWind = document.getElementById('curWind');
var curDirection = document.getElementById('curDirection')

fetch(requestURL)
    .then(response => response.json())
    .then(function (myJson) {
        curTime.innerHTML = epochDate(myJson.list[0].dt);
        curTemp.innerHTML = kel2far(myJson.list[0].main.temp);
        curCond.innerHTML = myJson.list[0].weather[0].description;
        curHum.innerHTML = myJson.list[0].main.humidity;
        curWind.innerHTML = myJson.list[0].wind.speed;
        curDirection.innerHTML = compassDir(myJson.list[0].wind.deg);
    })
        
        
        //myJson => curTime.innerHTML = epochDate(myJson.list[0].dt));


// converting functions    
function epochDate(epoch) {
    var d = new Date(0);
    return Date(epoch);
}

function kel2far(kelvin) {
    return Math.round((kelvin - 273.15)*9/5+32)
}

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