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

// MAP 

(function () {

    window.initMap = function () {
        var initialLoc = data[0].coords;

        setInterval(function () {
            let marker = new google.maps.Marker({
                position: { lat: issPosition.lat, lng: issPosition.lng },
                map: map,
            })
            marker.setPosition(new google.maps.LatLng( issPosition.lat, issPosition.lng ))
            map.panTo(marker.position);
        }, 5000);

        var map = new google.maps.Map(document.querySelector('#map'), {
            zoom: 4,
          center: initialLoc,
          disableDefaultUI: true,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8ec3b9"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1a3646"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#64779e"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#334e87"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#6f9ba5"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3C7680"
                }
              ]
            },
            {
              "featureType": "road",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#304a7d"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2c6675"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#255763"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#b0d5ce"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3a4762"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#0e1626"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#4e6d70"
                }
              ]
            }
          ]
      });
  }; 

})();