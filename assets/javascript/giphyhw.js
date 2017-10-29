$(document).ready(function() {

    // array of outdoorsy type stuff
    var topics = ["yes", "thumbs-up", "when", "maybe", "dunno", "no", "sorry", "never", "as+if", "awkward", "just-kidding"];


    // function to display the gifs as called
    function displayGifs() {

        var topic = $(this).attr("dataName");
        var offset = Math.floor(Math.random()*100);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ps3TxsPX4Szs6sxUyhXQtD22q2g2IRVc&offset=" + offset + "&limit=10&q=" + topic;
        console.log(queryURL);

        

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {

                var results = response.data;

                $("#giphyView").empty();

                for (var i = 0; i < results.length; i++) {
                    var giphyDiv = $("<div class='item'>");
                    // console.log(giphyDiv);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr({ "data-animate": results[i].images.fixed_height.url });
                    gifImage.attr({ "data-still": results[i].images.fixed_height_still.url });
                    gifImage.attr({ "data-state": "still" });
                    gifImage.attr({ "class": "gif" });

                    var rating = results[i].rating;
                    var p = $("<p id='ratingId'>").text("Rating: " + rating);

                    giphyDiv.prepend(gifImage);
                    giphyDiv.prepend(p);
                    
                    $("#giphyView").prepend(giphyDiv);

                }
            });
    }

    // Listen for an on-click for gifs with a class of "item" and plays/pauses the gif

    $(document).on("click", ".gif", function() {

        console.log("gifClassHasBeenClicked");


        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Function for displaying buttons
    function makeButtons() {

        // Deletes the topics prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonsView").empty();
        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

            var a = $("<button type='button' class='btn btn-primary btn-sm'>");
            // Adds a class of topic to our button
            a.addClass("topic");
            // Added a data-attribute
            a.attr("dataName", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the buttons-view div
            $("#buttonsView").append(a);
        }
    };


    // This function handles events where the addAnswer button is clicked
    $("#addAnswer").on("click", function(event) {
        event.preventDefault();
        // "var topic" grabs the input from the text box
        var topic = $("#answerMeInput").val().trim().replace(/\s+/g, '+');

        // The input from the form is pushed to the array
                topics.push(topic);

        makeButtons();

    });


    // Adding click event listeners to all buttons with a class of "topic"
    $(document).on("click", ".topic", displayGifs);

    makeButtons();

});