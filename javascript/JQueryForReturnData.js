//Search by State or City
$(".out").on("click", function() {
  $(".randomCocktail").css("display", "none");
  $("#search-brewery").css("display", "block");
  $("#find-brewery").css("display", "block");
  $("#carousel-demo").css("display", "block");
});

$("#search-brewery").on("click", function(e) {
  e.preventDefault();
  var city = $("#find-brewery")
    .val()
    .trim();
  if (city === undefined || city === null || city === "") {
    $("#error").attr("style", "display:block");
  } else {
    $("#error").attr("style", "display:none");
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
    var breweryCard = $("<div>").attr("class", `"item-${[i+1]} card slide"`);
    var breweryInfo = [
      // $("<iframe>").attr("src", response[i].blogmap), //could make this into iframe if we have time
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
      $("<i>")
        .attr("class", "fas fa-location-arrow")
        .attr("id", "url")
        .attr("href", "http://www." + response[i].url)
        .attr("target", "_blank"), //how do we open in a new window?
      $("<i>")
        .attr("class", "fas fa-phone")
        .attr("id", "phone")
        .attr("data-phone", response[i].phone)
        .attr("href", "tel:+01" + response[i].phone),

      $("<i>")
        .attr("class", "fas fa-globe-americas")
        .attr("id", "directions")
        .attr("href", "directions.html")
        .attr("data-id", response[i].id)
    ];

    $(breweryContact).append(contactInfo);
    $(breweryCard).append(breweryContact);
    $(".slider").append(breweryCard);
  }
  var queryURLbeerMappingState =
    "https://cors-anywhere.herokuapp.com/http://beermapping.com/webservice/loccity/" +
    APIKey +
    "/" +
    city +
    "&s=json";

  $.ajax({
    url: queryURLbeerMappingState,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(".carousel").empty();
    for (var i = 0; i < response.length; i++) {
      var breweryCard = $("<div>").attr("class", "item-1 card");
      var breweryInfo = [
        $("<img>").attr("src", "assets/images/brewery.png"),
        $("<h4>").text(response[i].name),
        $("<p>").text(response[i].street),
        $("<p>").text(
          response[i].city + ", " + response[i].state + response[i].zip
        )
      ];
      breweryCard.append(breweryInfo);

      var breweryContact = $("<div>").attr(
        "class",
        "cta row justify-content-center"
      );
      var contactInfo = [
        $("<i>")
          .addClass("fas fa-globe-americas url")
          .attr("href", "http://www." + response[i].url)
          .attr("target", "_blank"), //how do we open in a new window?
        $("<i>")
          .addClass("fas fa-phone phone")
          .attr("href", "tel:+01" + response[i].phone),

        $("<i>")
          .addClass("fas fa-location-arrow directions")
          .attr("data-id", response[i].id)
          .attr("href", "directions.html")
      ];

      $(breweryContact).append(contactInfo);
      $(breweryCard).append(breweryContact);
      $(".carousel").append(breweryCard);
    }

    console.log($("#directions").attr("data-id"));
  });
});

$(document).on("click", ".url", function(e) {
  e.preventDefault();
  window.location.href = $(this).attr("href");
  console.log($(this));
});

$(document).on("click", ".phone", function(e) {
  e.preventDefault();
  window.location.href = $(this).attr("href");
  console.log($(this).attr("href"));
});

$(document).on("click", ".directions", function(e) {
  e.preventDefault();
  var APIKey = "10418444aeb3ca5b2578412ce0662909";
  var ID = $(this).attr("data-id");
  console.log("Id", ID);
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

    var latitude = response[0].lat;
    var longitude = response[0].lng;

    breweryLocation = {
      lat: JSON.parse(latitude),
      lng: JSON.parse(longitude)
    };
    console.log("First", breweryLocation);
    var stringify = JSON.stringify(breweryLocation);
    console.log(stringify);
    localStorage.setItem("Brewery Lat/Long", stringify);

    window.location.href = "directions.html";
    console.log($(this).attr("href"));
  });
});
