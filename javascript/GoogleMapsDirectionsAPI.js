var pos;
var GoogleAPIKey = "AIzaSyBRSdoZacWWmoazbfG4tJit38vbOI-t6ww";
var map;

function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: { lat: 39.7392, lng: -104.9903 },
    zoom: 12
  });

  // var TravelType;
  // $(".fa-car-side").on("click", function() {
  //   TravelType = "DRIVING";
  //   alert("driving!");
  //   console.log(TravelType);
  // });
  // $(".fa-walking").on("click", function() {
  //   TravelType = "WALKING";
  //   alert("walking!");
  //   console.log(TravelType);
  // });
  // // console.log(travelType);

  function myLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        infoWindow = new google.maps.InfoWindow({ map: map });
        pos = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude)
        };
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
        getRoute();
      });
    } else {
      console.log("Browser doesn't support geolocation!");
    }
  }

  myLocation();

  //Location of Breweries
  const breweryLocation = { lat: 39.7583143, lng: -105.0072502 };

  // const breweryLocation = JSON.parse(localStorage.getItem("Brewery Lat/Long"));
  console.log("From Local", breweryLocation);

  //The markers for the breweries
  var mk2 = new google.maps.Marker({ position: breweryLocation, map: map });

  let directionsService = new google.maps.DirectionsService();
  console.log(directionsService);
  let directionsRenderer = new google.maps.DirectionsRenderer();
  console.log(directionsRenderer);
  directionsRenderer.setMap(map); // Existing map object displays directions
  // Create route from existing points used for markers
  function getRoute() {
    const route = {
      origin: pos, //LAT, LONG
      destination: breweryLocation, //LAT, LONG
      travelMode: "DRIVING"
    };

    console.log(breweryLocation);

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
        for (var i = 0; i < directionsData.steps.length; i++) {
          var newStep = directionsData.steps[i].instructions;
          $(".list-group").append(
            $("<li>")
              .html(newStep)
              .attr("class", "list-group-item")
          );
        }

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
  // getDirections();
  console.log(directionsRenderer);

  // function getDirections() {
  //   var newStep = $("<li>").html(directionsService.steps[0].instructions);
  //   $("#list-group").append(newStep);
  // }
}
