//store gifs for first viewing

var buttonGifs = ["Top Gun", "Kenny Loggins", "Danger Zone", "Maverick", "Tom Cruise", "Goose"];

//function to make gifs display on click
function displayGifInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=vCc4R27WhNt9QHuNY2RJtlJC1ve8p1pO&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(queryURL);

            console.log(response);

            var results = response.data;
            //var gifImage = $("<img>");

            for (var i = 0; i < results.length; i++){
                var gifDiv = $("<div>");

                var ratingP = $("<p>").text("Rating: " + results[i].rating);
                var gifSeperate = $("<hr>")

                var gifImage = $("<img>");
                gifImage.attr({"src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url, "data-state": "still"});
                gifImage.addClass("gif-image");

                gifDiv.append(ratingP);
                gifDiv.append(gifImage);
                gifDiv.append(gifSeperate);
                
                $("#gif-view").prepend(gifDiv);
            }
            $(".gif-image").on("click", function() {
                var state = $(this).attr("data-state");
            
                if (state === "still") {
                    $(this).attr({"src": $(this).attr("data-animate"), "data-state": "animate"})
                } else {
                    $(this).attr({"src": $(this).attr("data-still"), "data-state": "still"})
                }
            })
        })
    
}


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

//create new button from input
$("#add-gif").on("click", function (event) {
    event.preventDefault();

    var addGif = $("#gif-input").val().trim();

    buttonGifs.push(addGif);
    console.log(buttonGifs);

    renderButtons();
})

$(document).on("click", ".gif", displayGifInfo);

// $(".gif-image").on("click", function() {
//     var state = $(this).attr("data-state");

//     if (state === "still") {
//         $(this).attr({"src": $(this).attr("data-animate"), "data-state": "animate"})
//     } else {
//         $(this).attr({"src": $(this).attr("data-still"), "data-state": "still"})
//     }
// })


renderButtons();