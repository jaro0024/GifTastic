// Ready function
$(function () {
    renderButtons();
})

// Array with the different topics for the buttons
var topics = ["Golf", "MLB", "NBA", "NCAA Basketball", "NCAA Football", "NFL", "NHL"];

// Function to pull data from Giphy API and display on the HTML
function displaySportsImages() {

    // Grabbing and storing the data-name property value from the button
    var sport = $(this).attr("data-name");

    // QueryURL using the sport name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&rating=g&rating-pg&limit=10";

    // AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        // Storing the data from the AJAX request in the results variable
        var results = response.data;

        // Deleting previous gifs, so only the gifs for the button clicked will show on page
        $("#sports-view").empty();

        // Looping through results
        for (var i = 0; i < results.length; i++) {
            // Generating and storing a div to dump the gifs and ratings
            var sportsDiv = $("<div class='sports-div'>");
            // Generating and storing a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Generating and storing an image tag for the gifs
            var sportsImage = $("<img>");

            // Adding a class to the image tag
            sportsImage.addClass("sportImg");

            // Setting the src attribute of the image to a property pulled off the result item 
            sportsImage.attr("src", results[i].images.downsized_still.url);
            // Setting the data-still attribute of the image to a property pulled off the result item - in this case a static one
            sportsImage.attr("data-still", results[i].images.downsized_still.url);
            // Setting the data-animate attribute of the image to a property pulled off the result item - in this case an animated one
            sportsImage.attr("data-animate", results[i].images.downsized.url);
            // Setting the data-state attribute of the image to still
            sportsImage.attr("data-state", "still");

            // Appending the paragraph and image tag to the sportsDiv
            sportsDiv.append(p);
            sportsDiv.append(sportsImage);

            // Appending the sportsDiv to the HTML page in the "#sports-view" div
            $("#sports-view").append(sportsDiv);
        }
    });
}

// Adding click event to pull gifs from Giphy API and place on HTML to all buttons
$("button").on("click", displaySportsImages);

// Click event to change a gif current state
$(document).on("click", ".sportImg", function () {

    // Grabbing and storing the data-state property value from the images
    var state = $(this).attr("data-state");

    // If the clicked image's state is still, update its src attribute to what its data-animate value is
    // Then, set the image's data-state to animate
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    // Else set src to the data-still value
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Function to add buttons to the page using the user input
function renderButtons() {

    // Deleting the topics, prior to adding new topics, otherwise you will have repeat buttons
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Generating buttons for each topic in the array
        var a = $("<button>");
        // Adding a class of sport to our buttons
        a.addClass("sport");
        // Adding a data-attribute called "data-name" to the topics
        a.attr("data-name", topics[i]);
        // Adding text to the buttons
        a.text(topics[i]);
        // Appending the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// Click event to submit the user input
$("#add-sport").on("click", function (event) {
    event.preventDefault();

    // Grabbing and storing user input from the textbox
    var sport = $("#sport-input").val().trim();
    // Adding topic from textbox input to the topics array
    topics.push(sport);

    // Calling function to add the buttons and execute their functionality on the page
    renderButtons();
});

// Click event for the new buttons added by users with a class of "sport"
$(document).on("click", ".sport", displaySportsImages);

