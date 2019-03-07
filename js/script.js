var issSpeed = 0;
var issDistance = 0;
var issPosition = { lat: 0, lng: 0 };

$.getJSON('http://api.open-notify.org/iss-now.json', function(data) {
    console.log(data);
    console.log(issPosition.lat);
});

const data = [
    {
        coords: { lat: 51.189, lng: 17.015 }
    },
    {
        coords: { lat: 37.788, lng: 20.666 }
    }
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