
var topics = ["golf", "MLB", "NBA", "NCAA basketball", "NCAA football", "NFL","NHL", "soccer", "tennis", "volleyball"];

function displaySportsImages () {

    $("button").on("click", function() {

    var sport = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var sportsDiv = $("<div class='sport'>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var sportsImage = $("<img>");

            sportsImage.addClass("sportImg");
        
            sportsImage.attr("src",results[i].images.fixed_height_still.url);

            sportsImage.attr("data-still", results[i].images.fixed_height_still.url);

            sportsImage.attr("data-animate", results[i].images.fixed_height.url);

            sportsImage.attr("data-state", "still");

            sportsDiv.prepend(p);
            sportsDiv.prepend(sportsImage);

            $("#sports-view").prepend(sportsDiv);
          }

      });
    });
}

$(document).on("click", ".sportImg", function() {

    var state = $(this).attr("data-state");
    
    if (state == "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
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

  $("#add-sport").on("click", function(event) {
    event.preventDefault();
    var sport = $("#sport-input").val().trim();
    topics.push(sport);

    renderButtons();
  });

  $(document).on("click", ".sport", displaySportsImages);

  renderButtons();

displaySportsImages();