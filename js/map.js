let googleMap = function () {

    window.initMap = function () {
        let initialLoc = { lat: issPosition.lat, lng: issPosition.lng };

        var image = './images/iss.png';
        let marker = new google.maps.Marker({
            position: { lat: issPosition.lat, lng: issPosition.lng },
            map: map,
            icon: image
        })

        setInterval(function () {
            marker.setPosition(new google.maps.LatLng(issPosition.lat, issPosition.lng))
            marker.setMap(map)
            map.panTo(marker.position)
        }, 5000);

        var map = new google.maps.Map(document.querySelector('#map'), {
            zoom: 3,
            center: initialLoc,
            disableDefaultUI: true,
            styles: mapStyles
        });
    };
};