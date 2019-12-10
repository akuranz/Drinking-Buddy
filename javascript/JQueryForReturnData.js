//Search by name
// var APIKey = "10418444aeb3ca5b2578412ce0662909";
// var piece = $("#find-brewery").val() || "brewery:";
// var queryURLbeerMappingName =
//   "https://cors-anywhere.herokuapp.com/http://beermapping.com/webservice/locquery/" +
//   APIKey +
//   "/" +
//   piece +
//   "&s=json";

// $.ajax({
//   url: queryURLbeerMappingName,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);

//   var indexNumName = 0;
//   $("#breweryName_N").text("Name: " + response[indexNumName].name);
//   $("#status_N").text("Status: " + response[indexNumName].status);
//   $("#overallRating_N").text("Rating: " + response[indexNumName].overall);
//   $("#blogMap_N").text("Blog Map: " + response[indexNumName].blogmap);
//   $("#street_N").text("Street: " + response[indexNumName].street);
//   $("#city_N").text("City: " + response[indexNumName].city);git a
//   $("#state_N").text("State: " + response[indexNumName].state);
//   $("#zip_N").text("Zip: " + response[indexNumName].zip);
//   $("#country_N").text("Country: " + response[indexNumName].country);
//   $("#website_N").html("Website: " + response[indexNumName].url);
//   $("#phone_N").text("Phone: " + response[indexNumName].phone);
//   $("#imagecount_N").text("Image Count: " + response[indexNumName].imagecount);
//   $("#reviewLink_N").text("Review Link: " + response[indexNumName].reviewLink);
//   $("#proxyLink_N").text("Proxy Link: " + response[indexNumName].proxyLink);
// });

//click event for staying in
$(".out").on("click", function(){
  $(".randomCocktail").css("display", "none");
  $("#search-brewery").css("display", "block");
  $("#find-brewery").css("display", "block");
  $("#carousel-demo").css("display", "block");
})

//Search by State or City
$("#search-brewery").on("click", function(e) {
  event.preventDefault();

  var APIKey = "10418444aeb3ca5b2578412ce0662909";
  var city = $("#find-brewery").val();
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
    for (var i = 0; i < 10; i++) {
      // var sliderItem = $("<div>")
      //   .attr("class", "slider-item")
      //   .attr("style", "width: 374px;");
      var breweryCard = $("<div>").attr("class", "item-1 card");
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
          .attr("href", "tel:+01" + response[i].phone),

        $("<i>")
          .attr("class", "fas fa-globe-americas")
          .attr("data-id", response[i].id)
          .attr("id", "directions")
          .attr("href", "directions.html")
      ];

      $(breweryContact).append(contactInfo);
      $(breweryCard).append(breweryContact);
      // $(sliderItem).append(breweryCard);
      $(".carousel").append(breweryCard);
    }

    console.log($("#directions").attr("data-id"));

    $("#url").click(function(e) {
      e.preventDefault();
      window.location = $(this).attr("href");
      console.log($(this).attr("href"));
    });

    $("#phone").click(function(e) {
      e.preventDefault();
      window.location = $(this).attr("href");
      console.log($(this).attr("href"));
    });

    $("#directions").click(function(e) {
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
          Lat: JSON.parse(latitude),
          Lng: JSON.parse(longitude)
        };
        console.log("First", breweryLocation);

        localStorage.setItem(
          "Brewery Lat/Long",
          JSON.stringify(breweryLocation)
        );

        // function renderCoorButton() {
        //   var coordButton = $("<button>").attr("class", "coords");

        //   $("#carousel-demo").append(coordButton);
        // }
      });

      // window.location = $(this).attr("href");
      console.log($(this).attr("href"));
    });

    // function getCoords(event) {
    //   event.preventDefault();
    //   console.log(this);
    //   // console.log($(this).attr("data-lat"));
    //   // console.log($(this).attr("data-lng"));
    //   breweryLocation = {
    //     lat: $(this).attr("data-lat"),
    //     lng: $(this).attr("data-lng")
    //   };
    // }

    // $("#directions").on("click", getCoords);
  });
});

// // console.log("First Location Call", breweryLocation);
// BreweryLatLng = breweryLocation;
// console.log("Final Location Call", BreweryLatLng);
var BreweryLatLng;
