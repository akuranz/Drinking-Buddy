//Search by State or City
$(".out").on("click", function() {
  $(".randomCocktail").css("display", "none");
  $("#search-brewery").css("display", "block");
  $("#find-brewery").css("display", "block");
  $("#carousel-demo").css("display", "block");
});

$("#search-brewery").on("click", function(e) {
  e.preventDefault();
  var APIKey = "10418444aeb3ca5b2578412ce0662909";
  var city = $("#find-brewery")
    .val()
    .trim();
  if (city === undefined || city === null || city === "") {
    $("#error").attr("style", "display:block");
  } else {
    $("#error").attr("style", "display:none");
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
      var breweryCard = $("<div>").attr("class", "card");
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
        $("<a>")
          .attr("href", "http://www." + response[i].url)
          .attr("target", "_blank"), 
        $("<i>")
          .addClass("fas fa-phone phone")
          .attr("href", "tel:+01" + response[i].phone),

        $("<i>")
          .addClass("fas fa-location-arrow directions")
          .attr("data-id", response[i].id)
          .attr("href", "directions.html")
      ];

      contactInfo[0].append(`<i class='fas fa-globe-americas url'>`)
      $(breweryContact).append(contactInfo);
      $(breweryCard).append(breweryContact);
      $(".carousel").append(breweryCard);
    }
    console.log($("#directions").attr("data-id"));
  });
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