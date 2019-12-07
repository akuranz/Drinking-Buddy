// BULMA Carousel
bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 3
});

// Beer API's
var APIKey = "10418444aeb3ca5b2578412ce0662909";
var state = "co";
var queryURL = "http://beermapping.com/webservice/locstate/" + APIKey + "/" + state + "&s=json";
var queryURLbeers = "https://api.openbrewerydb.org/breweries?by_state=colorado";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

$.ajax({
  url: queryURLbeers,
  method: "GET"
}).then(function(response) {
  console.log(response);
});
});

// var GoogleAPIKey = "AIzaSyBRSdoZacWWmoazbfG4tJit38vbOI-t6ww";
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.7392, lng: -104.9903 },
    zoom: 8
  });
}

