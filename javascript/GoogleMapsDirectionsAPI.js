var pos;
var GoogleAPIKey = "AIzaSyBRSdoZacWWmoazbfG4tJit38vbOI-t6ww";
var map;

function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: { lat: 39.7392, lng: -104.9903 },
    zoom: 12
  });

  function myLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        infoWindow = new google.maps.InfoWindow({ map: map });
        pos = { lat: position.coords.latitude, lng: position.coords.longitude };
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          "Your location <br />Lat : " +
            position.coords.latitude +
            " </br>Lang :" +
            position.coords.longitude
        );
        map.panTo(pos);
        console.log("lat", typeof position.coords.latitude);
        console.log("lng", typeof position.coords.longitude);
        console.log("Position", pos);
        getDirections();
      });
    } else {
      console.log("Browser doesn't support geolocation!");
    }
  }

  myLocation();

  //Location of Breweries
  const breweryLocation = { lat: 39.7583143, lng: -105.0072502 };

  //The markers for the breweries
  var mk2 = new google.maps.Marker({ position: breweryLocation, map: map });

  let directionsService = new google.maps.DirectionsService();
  console.log(directionsService);
  let directionsRenderer = new google.maps.DirectionsRenderer();
  console.log(directionsRenderer);
  directionsRenderer.setMap(map); // Existing map object displays directions
  // Create route from existing points used for markers
  function getDirections() {
    const route = {
      origin: pos, //LAT, LONG
      destination: breweryLocation, //LAT, LONG
      travelMode: "DRIVING" //DRIVING | BICYCLING | TRANSIT | WALKING
    };

    directionsService.route(route, function(response, status) {
      // anonymous function to capture directions
      if (status !== "OK") {
        window.alert("Directions request failed due to " + status);
        return;
      } else {
        directionsRenderer.setDirections(response); // Add route to the map
        console.log(response);
        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        console.log(directionsData);

        if (!directionsData) {
          window.alert("Directions request failed");
          return;
        } else {
          document.getElementById("msg").innerHTML +=
            " Driving distance is " +
            directionsData.distance.text +
            " (" +
            directionsData.duration.text +
            ").";
        }
      }
    });
  }
}
