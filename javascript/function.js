// BULMA Carousel
bulmaCarousel.attach('#carousel-demo', {
  slidesToScroll: 1,
  slidesToShow: 3
});
// Cocktail API
function renderCocktail(){
$(".randomCocktail").css("display", "block");
  var queryURLCocktail = "https://thecocktaildb.com/api/json/v1/1/random.php";
  $.ajax({
  url:queryURLCocktail,
  method: "GET"
}).then (function(response){
  console.log("response" , response);
  var drink = response.drinks[0];
  var name = drink.strDrink;
  var image = drink.strDrinkThumb;
  var n = 0;
  var ingredients = [];
  var directions = drink.strInstructions;
  while (n<15) {
    if (drink[`strIngredient${n+1}`] === null){
      break;
    };
    ingredients.push(drink[`strIngredient${n+1}`]+": " + drink[`strMeasure${n+1}`]);
    ingredients[n] = ingredients[n].replace(": null", "");
    n++;
  };
  $("#name").html(name);
  $("#image").html(`<img src='${image}'/>`);
  $("#ingredients").html(ingredients.map(ingredient => `<li class="cocktail">${ingredient}</li>`).join(""));
  $("#directions").html(directions);
  $("#idk").html(`<button class="idk btn" type="submit">Give Me a Different One!</button>`);
  console.log(ingredients);
});
}
// Cocktail CTA
$(".cocktail").on("click", function(){
renderCocktail();
});