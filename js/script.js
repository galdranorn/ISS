let issSpeed = 'App is calculating...';
let issDistance = 'please wait...';
let issAvgSpeed = 7.66; // taken from wikipedia.com (en)
let issInitialTimestamp = 911630999; // 1998-11-21 06:49:59 taken from isstracker.com
let issPosition = { lat: 0, lng: 0, t: 0 };
let issPastPosition = { lat: 0, lng: 0, t: 0 };

document.getElementById('speed').innerHTML = issSpeed;

// get initial state
$.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
    issPosition = {
        lat: Number(data.iss_position.latitude),
        lng: Number(data.iss_position.longitude),
        t: data.timestamp
    }
    issDistance = (issPosition.t - issInitialTimestamp) * issAvgSpeed;
    document.getElementById('distance').innerHTML = issDistance;
    console.log('initial: '+issDistance);
});

// - - - - SPEED CALCULATION

// update data with interval of 5s
setInterval(function(){
    document.getElementById('speed').innerHTML = issSpeed + ' km per second';
    document.getElementById('distance').innerHTML = issDistance +' K kilometers';
    
    issDistance = (((issPosition.t - issInitialTimestamp) * issAvgSpeed)/1000).toFixed(2);
    console.log('interval: '+issDistance);

    issPastPosition.lat = issPosition.lat;
    issPastPosition.lng = issPosition.lng;
    issPastPosition.t = issPosition.t;

    $.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
        issPosition = {
            lat: Number(data.iss_position.latitude),
            lng: Number(data.iss_position.longitude),
            t: data.timestamp
        }
        issPosition = {
            lat: Number(data.iss_position.latitude),
            lng: Number(data.iss_position.longitude),
            t: data.timestamp
        }
        dataReady();
    });
    
}, 5000);

function dataReady() {
 console.log(issPosition);
 console.log(issPastPosition);
 console.log(issSpeed);
 speedFromCoords(issPastPosition.lat, issPastPosition.lng, issPastPosition.t, issPosition.lat, issPosition.lng, issPosition.t)
}

// convert from degrees to radians
const deg2rad = function(deg) { 
    return (deg * Math.PI / 180.0); 
};

const speedFromCoords = function (lat1, lng1, t1, lat2, lng2, t2) {
    const R = 6371.008+430; // radius of Earth + avg altitude of ISS [km]
    let dLat = deg2rad(lat2-lat1);
    let dLng = deg2rad(lng2-lng1);
    
    // haversine formula
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
        Math.sin(dLng / 2) * Math.sin(dLng / 2)*
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2));
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    let time = t2-t1; // [s]
    issSpeed = (distance/time).toFixed(5);
}

let data = [
    { coords: { lat: 51.189, lng: 17.015 }}
];