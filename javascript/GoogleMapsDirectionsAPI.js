var pos;
var GoogleAPIKey = "AIzaSyBRSdoZacWWmoazbfG4tJit38vbOI-t6ww";
var map;

function initMap() {
  const breweryLocation = JSON.parse(localStorage.getItem("Brewery Lat/Long"));
  console.log("From Local", breweryLocation);

  map = new google.maps.Map($("#map")[0], {
    // center: { lat: 39.7392, lng: -104.9903 },
    center: breweryLocation,
    zoom: 12
  });

  $("#new-brewery").on("click", function() {
    window.location.href = "index.html";
  });

  $("#new-cocktail").on("click", function() {
    window.location.href = "index.html";
  });

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

  //The markers for the breweries
  var mk2 = new google.maps.Marker({ position: breweryLocation, map: map });

  let directionsService = new google.maps.DirectionsService();
  console.log(directionsService);
  let directionsRenderer = new google.maps.DirectionsRenderer();
  console.log(directionsRenderer);
  directionsRenderer.setMap(map); // Existing map object displays directions
  // Create route from existing points used for markers

  var TravelType = "DRIVING";
  $(".fa-car-side").on("click", function() {
    TravelType = "DRIVING";
    getRoute();
  });
  $(".fa-walking").on("click", function() {
    TravelType = "WALKING";
    getRoute();
  });
  $(".fa-bicycle").on("click", function() {
    TravelType = "BICYCLING";
    getRoute();
  });
  $(".fa-bus").on("click", function() {
    TravelType = "TRANSIT";
    getRoute();
  });
  function getRoute() {
    const route = {
      origin: pos, //LAT, LONG
      destination: breweryLocation, //LAT, LONG
      travelMode: TravelType
    };
    console.log(TravelType);

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
        $(".list-group").empty();
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
        } else if (TravelType === "DRIVING") {
          document.getElementById("msg").innerHTML =
            " Driving distance is " +
            directionsData.distance.text +
            " (" +
            directionsData.duration.text +
            ").";
        } else if (TravelType === "WALKING") {
          document.getElementById("msg").innerHTML =
            " Walking distance is " +
            directionsData.distance.text +
            " (" +
            directionsData.duration.text +
            ").";
        } else if (TravelType === "BICYCLING") {
          document.getElementById("msg").innerHTML =
            " Bicycling distance is " +
            directionsData.distance.text +
            " (" +
            directionsData.duration.text +
            ").";
        } else if (TravelType === "TRANSIT") {
          document.getElementById("msg").innerHTML =
            " Transit distance is " +
            directionsData.distance.text +
            " (" +
            directionsData.duration.text +
            ").";
        }
      }
    });
  }
}
