// Form submit event to display API information
$("form").on("submit", function (event) {
  event.preventDefault();

  // Display upcoming concerts
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
        "font-size": "24px",
        "text-allign": "center",
      });

      var genre = $("<p>").text(
        "Genre: " + concerts._embedded.events[i].classifications[0].genre.name
      );

      var artistName = $("<p>").text(
        "Artist Name: " +
          concerts._embedded.events[i]._embedded.attractions[0].name
      );

      var StartDate = $("<p>").text(
        "Date: " + concerts._embedded.events[i].dates.start.localDate
      );

      var StartTime = $("<p>").text(
        "Time: " + concerts._embedded.events[i].dates.start.localTime
      );

      var venueName = $("<p>").text(
        "Venue: " + concerts._embedded.events[i]._embedded.venues[0].name
      );

      var venueAddress = $("<p>").text(
        "Address: " +
          concerts._embedded.events[i]._embedded.venues[0].address.line1
      ).css("margin-bottom", "10px");

      var ticketLink = concerts._embedded.events[i].url;
      var newLink = $('<button class="button is-info is-inverted is-outlined">')
        .click(function () {
          window.location = "" + ticketLink + "";
          window.EventTarget = "_blank";
        })
        .text("Click here to buy a ticket!");

      $("#artistShows").append(eventName, genre, artistName, StartDate, StartTime, venueName, venueAddress, newLink);
      $("#artistShows").append("<hr>");
    }
  });

  // Pull Wiki info
  var wikiURL =
    "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=25&exlimit=3&titles=" +
    searchCity +
    "&explaintext=1&formatversion=2&format=json&origin=*";

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
    " dining and food'&apiKey=20f727e0d91642b79b4a3da85e6cb53a";

  $.ajax({
    url: articleURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    
    $("#welcomeInfo").addClass("is-hidden");
    $("#articleResults").removeClass("is-hidden");

    for (let i = 0; i < 4; i++) {
      var articleHeadline = $("<p>")
        .addClass("title is-5")
        .text(response.articles[i].title)
        .css("margin-bottom", "5px");
      
      var articleAbstract = $("<p>")
        .text(response.articles[i].description)
        .css("margin-bottom", "15px");
      
        var Link = $('<button class="button is-info is-outlined">')
        .click(function () {
          var articleLink = response.articles[i].url;
          window.open(articleLink, '_blank')
        })
        .text("See Full Article");
      
      var separator = $("<hr>").css("background", "#808080");

      $("#articleResults").append(articleHeadline, articleAbstract, Link, separator);
    }
  });
});

// Particles
var jsonUri = "data:text/plain;base64," + window.btoa(JSON.stringify(particleSettings));
console.log(jsonUri);
particlesJS.load("particles-js", jsonUri);
