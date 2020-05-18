// General wiki search AJAX call

// Hiding and displaying main content boxes upon search
$("form").on("submit", function (event) {
  event.preventDefault();

  var genre = $("input[name='answer']:checked").val();
  var searchCity = $("#cityInput").val().trim();
  var concertURL =
    "http://app.ticketmaster.com/discovery/v2/events.json?classificationName=" +
    genre +
    "&countryCode=US&city=" +
    searchCity +
    "&apikey=5GUicsmpsv06kJ5CsG2FYMg8peqaLHGB";
  $.ajax({
    url: concertURL,
    type: "GET",
  }).then(function (concerts) {
    console.log(concerts);
    $("#welcomeInfo").addClass("is-hidden");
    $("#artistShows").removeClass("is-hidden");
    for (var i = 0; i < 3; i++) {
      var eventName = $("<h1>").text(concerts._embedded.events[i].name);
      eventName.css({
        "font-size": "30px",
        "text-allign": "center",
      });
      $("#artistShows").append(eventName);

      var genre = $("<p>").text(
        "Genre: " + concerts._embedded.events[i].classifications[0].genre.name
      );
      $("#artistShows").append(genre);

      var artistName = $("<p>").text(
        "Artist Name: " +
          concerts._embedded.events[i]._embedded.attractions[0].name
      );
      $("#artistShows").append(artistName);

      var StartDate = $("<p>").text(
        "Date: " + concerts._embedded.events[i].dates.start.localDate
      );
      $("#artistShows").append(StartDate);

      var StartTime = $("<p>").text(
        "Time: " + concerts._embedded.events[i].dates.start.localTime
      );
      $("#artistShows").append(StartTime);

      // var priceHigh = $("<p>").text("Price (high): " + concerts._embedded.events[i].priceRanges[0].max || "this informaiton is not available at the time")
      // $("#artistShows").append(priceHigh);

      // var priceLow = $("<p>").text("Price (low): " + concerts._embedded.events[i].priceRanges[0].min || "this information is not available at the time")
      // $("#artistShows").append(priceLow);

      var venueName = $("<p>").text(
        "Venue: " + concerts._embedded.events[i]._embedded.venues[0].name
      );
      $("#artistShows").append(venueName);

      var venueAddress = $("<p>").text(
        "Address: " +
          concerts._embedded.events[i]._embedded.venues[0].address.line1
      );
      $("#artistShows").append(venueAddress);

      var ticketLink = concerts._embedded.events[i].url;
      var newLink = $('<button class="button is-info is-inverted is-outlined">')
        .click(function () {
          window.location = "" + ticketLink + "";
          window.EventTarget = "_blank";
        })
        .text("Click here to buy a ticket!");

      $("#artistShows").append(newLink);
      $("#artistShows").append("<hr>");
    }
    // make the div show up, and others dissapear

    $("#welcomeInfo").addClass("is-hidden");
    $("#artistShows").removeClass("is-hidden");
  });

  // Pull Wiki info
  var wikiURL =
    "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=25&exlimit=3&titles=" +
    searchCity +
    "&explaintext=1&formatversion=2&format=json&origin=*";

  // "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=" + searchCity + "&explaintext=1&formatversion=2&format=json&origin=*"

  // "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchCity + "&prop=wikitext&formatversion=2&format=json&origin=*"

  // "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchCity + "&srprop=snippet&format=json&origin=*"

  // "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchCity + "&format=json&origin=*"

  $("#cityInfo").empty();
  $.ajax({
    url: wikiURL,
    type: "GET",
  }).then(function (results) {
    console.log(results);

    var cityTitle = $("<p>")
      .addClass("title is-3")
      .text(results.query.pages[0].title);
    var cityText = $("<p>").text(results.query.pages[0].extract);

    // Display Wiki Information
    $("#welcomeInfo").addClass("is-hidden");
    $("#cityInfo").removeClass("is-hidden");

    $("#cityInfo").append(cityTitle, cityText);
  });

  // Display articles
  var articleURL =
    "http://newsapi.org/v2/everything?q='" +
    searchCity +
    " dining'&apiKey=20f727e0d91642b79b4a3da85e6cb53a";

  $("#articleResults").empty();

  $.ajax({
    url: articleURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    for (var i = 0; i < 4; i++) {
      var articleHeadline = $("<p>")
        .addClass("title is-5")
        .text(response.articles[i].title)
        .css("margin-bottom", "5px");
      var articleAbstract = $("<p>")
        .text(response.articles[i].description)
        .css("margin-bottom", "15px");
      var separator = $("<hr>").css("background", "#808080");

      $("#articleResults").removeClass("is-hidden");

      $("#articleResults").append(articleHeadline, articleAbstract, separator);
    }
  });
});

var jsonUri = "data:text/plain;base64," + window.btoa(JSON.stringify(particleSettings));
console.log(jsonUri);
particlesJS.load("particles-js", jsonUri);
