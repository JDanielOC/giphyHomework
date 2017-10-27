$(document).ready(function() {

    // array of outdoorsy type stuff
    var topics = ["yes", "thumbs up", "when", "maybe", "unsure", "no", "sorry", "never", "as if", "awkard", "just kidding"];


    // display function re-renders the HTML to display the appropriate content
    function displayGifs() {

        var topic = $(this).attr("dataName");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ps3TxsPX4Szs6sxUyhXQtD22q2g2IRVc&limit=10&q=" + topic;
        // console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var giphyDiv = $("<div class='item'>");
                    // console.log(giphyDiv);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height.url);
                    gifImage.attr("style", "height: 200px");
                    gifImage.attr("data-state", "still");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);


                    giphyDiv.prepend(p);
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

            var a = $("<button type='button' class='btn btn-primary btn-sm'>" + " ");
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


    // This function handles events where the addANSWER button is clicked
    $("#addAnswer").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#answerMeInput").val().trim();

        // The ANSWER from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our ANSWER array
        makeButtons();

    });


    // Adding click event listeners to all buttons with a class of "topic"
    $(document).on("click", ".topic", displayGifs);

    makeButtons();

});