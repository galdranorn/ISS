let issSpeed = 'App is calculating...';
let issSpeedGeolib = 'App is calculating...';
let issDistance;
let issPosition = { lat: 0, lng: 0, t: 0 };
let issPastPosition = { lat: 0, lng: 0, t: 0 };

const loading = document.getElementById('loading');

document.getElementById('speed').innerHTML = issSpeed;
document.getElementById('speedGeo').innerHTML = issSpeedGeolib;
googleMap();

// get initial state
$.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
    issPosition = {
        lat: Number(data.iss_position.latitude),
        lng: Number(data.iss_position.longitude),
        t: data.timestamp
    }
    distanceCalc(issPosition.t);
    document.getElementById('distance').innerHTML = issDistance;
    console.log('initial: '+issDistance);
});

// update data with interval of 5s
setInterval(function(){
    document.getElementById('speed').innerHTML = issSpeed;
    document.getElementById('speedGeo').innerHTML = issSpeedGeolib;
    document.getElementById('distance').innerHTML = issDistance;
    
    distanceCalc(issPosition.t);

    // set current position as past position
    issPastPosition.lat = issPosition.lat;
    issPastPosition.lng = issPosition.lng;
    issPastPosition.t = issPosition.t;

    // get new current position
    $.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
        issPosition = {
            lat: Number(data.iss_position.latitude),
            lng: Number(data.iss_position.longitude),
            t: data.timestamp
        }
        // calculate speed
        speedFromCoords(issPastPosition.lat, issPastPosition.lng, issPastPosition.t, issPosition.lat, issPosition.lng, issPosition.t);
        speedFromGeolib(issPastPosition.lat, issPastPosition.lng, issPastPosition.t, issPosition.lat, issPosition.lng, issPosition.t);

        loading.classList.add('invisible');
    });
    
}, 5000);


let data = [
    { coords: { lat: 51.189, lng: 17.015 }}
];

