$("form").on("submit", function (event) {
  event.preventDefault();
  // everything for the ticketmaster API
  var genre = $("input[name='answer']:checked").val();
  var searchCity = $("#cityInput").val().trim();
  var concertURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" +
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

    // if statement to deliver a message if there are no scheduled concerts for a specific ciy / genre. this has if statement is wrapped around the for loop
    if (concerts.page.totalPages !== 0) {
      // for loop, limited to 3, we found that this is a happy medium due to shows being cancelled from Covid 19.
      for (let i = 0; i < 3; i++) {
        var eventName = $("<h1 class='show-title'>").text(
          concerts._embedded.events[i].name
        );
        eventName.css({
          "font-size": "30px",
          "text-allign": "center",
        });
        $("#artistShows").append(eventName);

        var genre = $("<p class='show-info'>").text(
          "Genre: " + concerts._embedded.events[i].classifications[0].genre.name
        );
        $("#artistShows").append(genre);

        var artistName = $("<p class='show-info'>").text(
          "Artist Name: " +
            concerts._embedded.events[i]._embedded.attractions[0].name
        );
        $("#artistShows").append(artistName);

        var StartDate = $("<p class='show-info'>").text(
          "Date: " + concerts._embedded.events[i].dates.start.localDate
        );
        $("#artistShows").append(StartDate);

        // military time to be displayed in AM / PM time - using Moment.js to mash the two API's together
        var time = moment(
          concerts._embedded.events[i].dates.start.localTime,
          "HH:mm:"
        ).format("h:mm A");
        var startTime = $("<p class='show-info'>").text("Time: " + time);
        $("#artistShows").append(startTime);

        // if statements for price range, to give a message if the prices are not available
        if (!concerts._embedded.events[i].priceRanges) {
          var priceHigh = $("<p class='show-info'>").text("High Price: N/A");
          var priceLow = $("<p class='show-info'>").text("Low Price: N/A");
        } else {
          var priceHigh = $("<p class='show-info'>").text(
            "High Price: $" + concerts._embedded.events[i].priceRanges[0].max
          );

          var priceLow = $("<p class='show-info'>").text(
            "Low Price: $" + concerts._embedded.events[i].priceRanges[0].min
          );
        }
        $("#artistShows").append(priceHigh);
        $("#artistShows").append(priceLow);

        var venueName = $("<p class='show-info'>").text(
          "Venue: " + concerts._embedded.events[i]._embedded.venues[0].name
        );
        $("#artistShows").append(venueName);

        var venueAddress = $("<p class='show-info'>").text(
          "Address: " +
            concerts._embedded.events[i]._embedded.venues[0].address.line1
        );
        $("#artistShows").append(venueAddress);

        // adding a button click to link to ticketmaster's website, this is a requirement in their documentaiton for using their API, plus this shows the responsive nature of the applicaiton.
        var newLink = $(
          '<button class="button is-info is-inverted is-outlined">'
        )
          .click(function () {
            var ticketLink = concerts._embedded.events[i].url;
            window.open(ticketLink, "_blank");
          })
          .text("Click here to buy a ticket!");
        $("#artistShows").append(newLink);

        $("#artistShows").append("<hr>");
      }
    } else {
      // user will be promped with this message, telling them that the entered criteria did not return any results
      var noResults = $("<p class='show-info'>").text(
        "There are no events currently scheduled under the genre: " +
          $("input[name='answer']:checked").val() +
          " " +
          "in " +
          searchCity +
          " at this time, Sorry! Please check back at a later date, due to the COVID 19 pandemic, many events are being rescheduled."
      );
    }
    $("#artistShows").append(noResults);

    // make the welcome page dissapear, and show section appear upon form submit.
    $("#welcomeInfo").addClass("is-hidden");
    $("#artistShows").removeClass("is-hidden");
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
    "https://newsapi.org/v2/everything?q='" +
    searchCity +
    " dining and food'&apiKey=20f727e0d91642b79b4a3da85e6cb53a";

  $.ajax({
    url: articleURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    
    $("#welcomeInfo").addClass("is-hidden");
    $("#articleResults").removeClass("is-hidden");

    for (let i = 0; i < 8; i++) {
      var articleHeadline = $("<p>")
        .addClass("title is-5")
        .text(response.articles[i].title)
        .css("margin-bottom", "15px");
      
      // var articleAbstract = $("<p>")
      //   .text(response.articles[i].description)
      //   .css("margin-bottom", "15px");
      
        var Link = $('<button class="button is-info is-outlined">')
        .click(function () {
          var articleLink = response.articles[i].url;
          window.open(articleLink, '_blank')
        })
        .text("See Full Article")
        .css("width", "100%");
      
      var separator = $("<hr>").css("background", "#808080");

      $("#articleResults").append(articleHeadline, Link, separator);
    }
  });
});

var jsonUri =
  "data:text/plain;base64," + window.btoa(JSON.stringify(particleSettings));
console.log(jsonUri);
particlesJS.load("particles-js", jsonUri);
