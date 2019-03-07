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