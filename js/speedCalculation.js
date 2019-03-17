// convert from degrees to radians
const deg2rad = function(deg) { 
    return (deg * Math.PI / 180.0); 
};

const speedFromCoords = function (lat1, lng1, t1, lat2, lng2, t2) {
    const R = 6371.008+430; // radius of Earth + avg altitude of ISS [km]
    let dLat = deg2rad(lat2-lat1);
    let dLng = deg2rad(lng2-lng1);
    
    // haversine formula (same is used in geolocation-utils package)
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
        Math.sin(dLng / 2) * Math.sin(dLng / 2)*
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2));
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    let time = t2-t1; // [s]
    issSpeed = (distance/time).toFixed(3);
}

let speedFromGeolib = function(lat1, lng1, t1, lat2, lng2, t2) {

    let distance = geolib.getDistance(
      {latitude: lat1, longitude: lng1},
      {latitude: lat2, longitude: lng2}
    );
    let time = t2-t1;
    issSpeedGeolib = ((distance/1000) / time).toFixed(3);
  }