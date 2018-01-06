// Ready function
$(function () {
    renderButtons();
})

var topics = ["Golf", "MLB", "NBA", "NCAA basketball", "NCAA football", "NFL", "NHL", "Soccer", "Tennis", "Volleyball"];

function displaySportsImages() {

    var sport = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&rating=g&rating-pg&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        var results = response.data;
        $("#sports-view").empty();

        for (var i = 0; i < results.length; i++) {

            var sportsDiv = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var sportsImage = $("<img>");

            sportsImage.addClass("sportImg");

            sportsImage.attr("src", results[i].images.downsized_still.url);
            sportsImage.attr("data-still", results[i].images.downsized_still.url);
            sportsImage.attr("data-animate", results[i].images.downsized.url);
            sportsImage.attr("data-state", "still");

            sportsDiv.append(p);
            sportsDiv.append(sportsImage);

            $("#sports-view").append(sportsDiv);
        }
    });
}

$("button").on("click", displaySportsImages);

$(document).on("click", ".sportImg", function () {

    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("sport");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-sport").on("click", function (event) {
    event.preventDefault();
    var sport = $("#sport-input").val().trim();
    topics.push(sport);

    renderButtons();
});

$(document).on("click", ".sport", displaySportsImages);

