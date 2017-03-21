window.onload = function(){

var wonderArray = ["Great Wall of China", "Christ the Redeemer", "Machu Picchu", "The Roman Colosseum", "Taj Mahal", "Petra", "Leaning Tower of Pisa", "Stonehenge", "Pyramids of Giza", "Galapagos Islands", "Great Barrier Reef", "Easter Island", "Serengeti National Park", "The Grand Canyon", "Acropolis Greece", "Norwegian Fjords", "Canals of Venice", "Sistine Chapel"];
var $imagesHere = $("#imagesHere");
var $buttonsHere = $("#buttonsHere");
var $submitButton = $("#submitButton");
var inArray = false;

console.log(wonderArray);

function renderButtons(){

	for (var i = 0; i < wonderArray.length; i++){
		var buttonNew = $("<button>");
		buttonNew.addClass("wonderButton btn btn-success btn-sm");
		buttonNew.attr('data-name', wonderArray[i]);
		buttonNew.text(wonderArray[i]);
		$buttonsHere.append(buttonNew);
	}

}

function ajaxReference(){
	var wonderSearch = $(this).attr('data-name');
	var wonderSearchPlus = wonderSearch.split(' ').join('+');
	var urlQuery = "http://api.giphy.com/v1/gifs/search?q=" + wonderSearchPlus + "&api_key=dc6zaTOxFJmzC&rating=g&limit=10";

	console.log(wonderSearch);	
	
	$.ajax({
		url: urlQuery,
		method: "GET"
	}).done(function(response){

		var results = response.data;
		console.log(results);

		$imagesHere.empty();
				
		for (var i = 0; i < results.length; i++){

			var newDiv = $("<div>");
			newDiv.addClass('imageDiv text-center pull-left');
			console.log(i);
			var imageAdd = $("<img>");
			imageAdd.addClass('giphy');
			var imageSource = results[i].images.fixed_height.url;
			imageSource = imageSource.slice(0, -4);
			var stillImage = imageSource + "_s.gif";
			var movingImage = imageSource + ".gif";
			imageAdd.attr('data-state', 'still');
			imageAdd.attr('data-still', stillImage);
			imageAdd.attr('data-animate', movingImage);
			imageAdd.attr('src', stillImage);
			var p = $("<h3>").text("Rating: " + results[i].rating);
			newDiv.append(p);
			newDiv.append(imageAdd);
			$imagesHere.append(newDiv);

		}

	});
}

function giphyConvert(){
			
	var state = $(this).attr('data-state');
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} 
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}

}

$submitButton.on('click', function(event){

	event.preventDefault();
	var wonder = $("#userInput").val().trim();

	if (wonder === ''){

		alert("Please enter a value");

	}
	
	else {

		$("#userInput").val('');
		inArray = false;
		wonderArray.push(wonder);
		var buttonNew = $("<button>");
		buttonNew.addClass("wonderButton btn btn-success btn-sm");
		buttonNew.attr('data-name', wonder);
		buttonNew.text(wonder);
		$buttonsHere.append(buttonNew);

	}

});

$(document).on('click', '.wonderButton', ajaxReference);
$(document).on('click', '.giphy', giphyConvert);

renderButtons();

}
