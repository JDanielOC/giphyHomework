// array of outdoorsy type stuff
        var topics = ["johnmuir", "nationalparks", "hiking", "rei", "troutfishing"];

        // display function re-renders the HTML to display the appropriate content
        function displayGifs() {

            var topic = $(this).attr("dataName");
            var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + topic;
            console.log(queryURL);
            // Creates AJAX call for the specific gif button being clicked
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(response);
                // Creates a div to hold the gif
                var giphyDiv = $("<div></div>");

                // Retrieves the Rating Data
                var giphyRatings = $("<rating>");
                // Creates an element to have the rating displayed
                $("#outdoorsView").text(response.Rating);
                // Displays the rating

                // giphyDiv.append(giphyRatings);


                $("#outdoorsView").prepend(giphyDiv);
            });

        }

        // Function for displaying gif data
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
            var outdoors = $(this).attr("data-outdoors");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                outdoors + "&api_key=ps3TxsPX4Szs6sxUyhXQtD22q2g2IRVc&limit=10";

            console.log(outdoors);


            // To Do:    write a loop that appends a button for each index in the array.
            // when the button is clicked I should get 10 gifs (nonanimated)



        });

    // Adding click event listeners to all elements with a class of "topic"
      $(document).on("click", ".topic", displayGifs);

        makeButtons();