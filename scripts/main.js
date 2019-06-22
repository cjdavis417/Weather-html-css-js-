
var curLoc = document.getElementById('location');
var curTime = document.getElementById('curTime');
var curTemp = document.getElementById('curTemp');
var curCond = document.getElementById('curCond');
var curHum = document.getElementById('curHum');
var curWind = document.getElementById('curWind');
var curDirection = document.getElementById('curDirection')



function getWeather(zip) {
    const URL = 'https://api.openweathermap.org/data/2.5/forecast'
    var requestURL = URL + '?zip=' + zip + ',us&APPID=6fb8c30fb929a4320dd57f04a61b8837';

    fetch(requestURL)
        .then(response => response.json())
        .then(function (myJson) {

            var data = [];
            myJson.list.forEach( e => data.push(e));
            outlook(data);

            curLoc.innerHTML = myJson.city.name + ', ' + myJson.city.country;
            curTime.innerHTML = epochDate(myJson.list[0].dt);
            curTemp.innerHTML = kel2far(myJson.list[0].main.temp);
            curCond.innerHTML = myJson.list[0].weather[0].description;
            curHum.innerHTML = myJson.list[0].main.humidity;
            curWind.innerHTML = myJson.list[0].wind.speed;
            curDirection.innerHTML = compassDir(myJson.list[0].wind.deg);

        })
}

var form = document.getElementById('MyLocation');
form.addEventListener('submit', function (e) {
    e.preventDefault()
    var zipcode = document.getElementById('myLoc').value;
    getWeather(zipcode);
});

function outlook(data) {
    console.log(data);
    var outlookTag = document.getElementById('outlook');
    for (var i = 1; i < data.length; i++) {
        var listElement = document.createElement("li");
        var lidiv = document.createElement("div");
        listElement.appendChild(lidiv);

        var h2El = document.createElement("h2");
        var h2Text = document.createTextNode(kel2far(data[i].main.temp));
        h2El.appendChild(h2Text);
        lidiv.appendChild(h2El);

        var h4El = document.createElement("h4");
        var h4Text = document.createTextNode(data[i].weather[0].description);
        h4El.appendChild(h4Text);
        lidiv.appendChild(h4El);

        var listText = document.createTextNode(epochDate(data[i].dt));
        listElement.appendChild(listText);
        outlookTag.appendChild(listElement);
    }

}


// converts epoch to regular date   
function epochDate(epoch) {
    var newdate = new Date(epoch * 1000);
    return newdate;
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