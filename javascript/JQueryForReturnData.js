//Search by name
var APIKey = "10418444aeb3ca5b2578412ce0662909";
var piece = $("#find-brewery").val() || "brewery";
var queryURLbeerMappingName =
  "https://cors-anywhere.herokuapp.com/http://beermapping.com/webservice/locquery/" +
  APIKey +
  "/" +
  piece +
  "&s=json";

$.ajax({
  url: queryURLbeerMappingName,
  method: "GET"
}).then(function(response) {
  console.log(response);

  var indexNumName = 0;
  $("#breweryName_N").text("Name: " + response[indexNumName].name);
  $("#status_N").text("Status: " + response[indexNumName].status);
  $("#overallRating_N").text("Rating: " + response[indexNumName].overall);
  $("#blogMap_N").text("Blog Map: " + response[indexNumName].blogmap);
  $("#street_N").text("Street: " + response[indexNumName].street);
  $("#city_N").text("City: " + response[indexNumName].city);
  $("#state_N").text("State: " + response[indexNumName].state);
  $("#zip_N").text("Zip: " + response[indexNumName].zip);
  $("#country_N").text("Country: " + response[indexNumName].country);
  $("#website_N").html("Website: " + response[indexNumName].url);
  $("#phone_N").text("Phone: " + response[indexNumName].phone);
  $("#imagecount_N").text("Image Count: " + response[indexNumName].imagecount);
  $("#reviewLink_N").text("Review Link: " + response[indexNumName].reviewLink);
  $("#proxyLink_N").text("Proxy Link: " + response[indexNumName].proxyLink);
});

//Search by State or City
var APIKey = "10418444aeb3ca5b2578412ce0662909";
var state = $("#find-brewery").val() || "co";
var queryURLbeerMappingState =
  "https://cors-anywhere.herokuapp.com/http://beermapping.com/webservice/locstate/" +
  APIKey +
  "/" +
  state +
  "&s=json";

$.ajax({
  url: queryURLbeerMappingState,
  method: "GET"
}).then(function(response) {
  console.log(response);
  for (var i = 0; i < 10; i++) {
    var breweryCard = $("<div>").attr("class", "item-1 card");
    var breweryInfo = [
      $("<img>").attr("src", "assets/images/brewery.png"),
      $("<h4>").text(response[i].name),
      $("<p>").text(response[i].street),
      $("<p>").text(
        response[i].city + ", " + response[i].state + response[i].zip
      )
    ];
    $(breweryCard).append(breweryInfo);

    var breweryContact = $("<div>").attr(
      "class",
      "cta row justify-content-center"
    );
    var contactInfo = [
      $("<button>").attr("class", "btn ctaBtn"),
      $("<p>").text(response[i].url),
      $("<button>").attr("class", "btn ctaBtn"),
      $("<p>").text(response[i].phone),
      $("<button>").attr("class", "btn ctaBtn"),
      $("<button>")
        .text("Get Link")
        .attr("data-name", response[0].lat)
        .attr("data-name", response[0].lng)
    ];
    $(breweryContact).append(contactInfo);
    $(breweryCard).append(breweryContact);
    $("#carousel-demo").append(breweryCard);
  }

  var APIKey = "10418444aeb3ca5b2578412ce0662909";
  var ID = response[i].id;
  console.log(ID);
  var queryURLbeerMappingLocInfo =
    "https://cors-anywhere.herokuapp.com/http://beermapping.com/webservice/locmap/" +
    APIKey +
    "/" +
    ID +
    "&s=json";

  $.ajax({
    url: queryURLbeerMappingLocInfo,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var indexNumMapID = 0;
    var locationBrewery = $("<button>").text("Lat/Lng");
    $(breweryCard).append(locationBrewery);
    locationBrewery.data("lat", response[indexNumMapID].lat);
    locationBrewery.data("long", response[indexNumMapID].lng);
  });
});
