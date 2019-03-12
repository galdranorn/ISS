let issSpeed = 'please wait';
let issDistance = 0;
let issPosition = { lat: 0, lng: 0, t: 0 };
let issPastPosition = { lat: 0, lng: 0, t: 0 };

// get initial state
$.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
    issPosition = {
        lat: Number(data.iss_position.latitude),
        lng: Number(data.iss_position.longitude),
        t: data.timestamp
    }
});

// update data with interval of 5s
setInterval(function(){
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
    issSpeed = distance/time;
}

let data = [
    { coords: { lat: 51.189, lng: 17.015 }}
];

(function(){ 
    	
    window.initMap = function() { 
      var initialLoc = data[0].coords;
      
      var map = new google.maps.Map(document.querySelector('#map'), {
          zoom: 4,
          center: initialLoc
      });
  }; 

})();