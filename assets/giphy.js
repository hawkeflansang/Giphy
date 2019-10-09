//store gifs for first viewing

var buttonGifs = ["Top Gun", "Kenny Loggins", "Danger Zone", "Maverick", "Tom Cruise", "Goose"];

//function to make gifs display on click
$("button").on("click", function() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=vCc4R27WhNt9QHuNY2RJtlJC1ve8p1pO&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(queryURL);

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++){
                var gifDiv = $("<div>");

                var ratingP = $("<p>").text("Rating: " + results[i].rating);

                var gifImage = $("<img>");
                gifImage.attr({"src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url, "data-state": "still"});

                gifDiv.append(ratingP);
                gifDiv.append(gifImage);
                
                $("#gif-view").prepend(gifDiv);
            }
        })
    
})


//create buttons of buttonGifs
function renderButtons() {

    $("#buttons-view").empty();

    for(var i = 0; i < buttonGifs.length; i++) {
        var gifButton = $("<button>");

        gifButton.addClass("gif");
        gifButton.attr("data-name", buttonGifs[i]);
        gifButton.text(buttonGifs[i]);

        $("#buttons-view").append(gifButton);
    }
}


renderButtons();