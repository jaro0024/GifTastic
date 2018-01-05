
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
        
            sportsImage.attr("src", results[i].images.fixed_height.url);

            sportsDiv.append(p);
            sportsDiv.append(sportsImage);

            $("#sports-view").append(sportsDiv);
          }

      });
    });
}

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