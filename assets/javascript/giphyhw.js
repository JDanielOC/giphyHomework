// array of outdoorsy type stuff
var topics = ["yes", "thumbs up", "when", "maybe", "unsure", "no", "sorry", "never","as+if", "awkard", "just kidding"];


// display function re-renders the HTML to display the appropriate content
function displayGifs() {

    var topic = $(this).attr("dataName");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ps3TxsPX4Szs6sxUyhXQtD22q2g2IRVc&limit=10&q=" + topic;
    console.log(queryURL);

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var giphyDiv = $("<div class='item'>");
                console.log(giphyDiv);

                //     var rating = results[i].rating;

                //     var p = $("<p>").text("Rating: " + rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifImage.attr("style", "height: 200px")

                //     giphyDiv.prepend(p);
                giphyDiv.prepend(gifImage);

                $("#giphyView").prepend(giphyDiv);

            }
        });

}

// Function for displaying buttons
function makeButtons() {

    // Deletes the topics prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonsView").empty();
    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of topic to our button
        a.addClass("topic");
        // Added a data-attribute
        a.attr("dataName", topics[i]);
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttonsView").append(a);
    }
}


$("button").on("click", function() {
    var answer = $(this).attr("data-answer");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        answer + "&api_key=ps3TxsPX4Szs6sxUyhXQtD22q2g2IRVc&limit=10";

    console.log(answer);


    // To Do:    write a loop that appends a button for each index in the array.
    // when the button is clicked I should get 10 gifs (nonanimated)



});

// Adding click event listeners to all elements with a class of "topic"
$(document).on("click", ".topic", displayGifs);

makeButtons();