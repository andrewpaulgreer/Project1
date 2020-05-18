// General wiki search AJAX call
    // Hiding and displaying main content boxes upon search
    
    $("form").on("submit", function(event) {
        event.preventDefault();
        
        
        var genre = $("input[name='answer']:checked").val();
        var searchCity = $("#cityInput").val().trim()
        var concertURL = "http://app.ticketmaster.com/discovery/v2/events.json?classificationName="
        + genre + "&countryCode=US&city=" + searchCity + "&apikey=5GUicsmpsv06kJ5CsG2FYMg8peqaLHGB"
        $.ajax({
            url: concertURL,
            type: 'GET'
        }).then (function(concerts) {
            console.log(concerts)
            $("#welcomeInfo").addClass("is-hidden")
            $("#artistShows").removeClass("is-hidden")
        for (var i=0; i < 3; i++){
        var eventName = $("<h1>").text(concerts._embedded.events[i].name)
        eventName.css({
            "font-size": "30px",
            "text-allign": "center",
        })
        $("#artistShows").append(eventName);
        
        var genre = $("<p>").text("Genre: " + concerts._embedded.events[i].classifications[0].genre.name)
        $("#artistShows").append(genre);
        
        var artistName = $("<p>").text("Artist Name: " + concerts._embedded.events[i]._embedded.attractions[0].name)
        $("#artistShows").append(artistName);

        var StartDate = $("<p>").text("Date: " + concerts._embedded.events[i].dates.start.localDate)
        $("#artistShows").append(StartDate);

        var StartTime = $("<p>").text("Time: " + concerts._embedded.events[i].dates.start.localTime)
        $("#artistShows").append(StartTime);

        // var priceHigh = $("<p>").text("Price (high): " + concerts._embedded.events[i].priceRanges[0].max || "this informaiton is not available at the time")
        // $("#artistShows").append(priceHigh);

        // var priceLow = $("<p>").text("Price (low): " + concerts._embedded.events[i].priceRanges[0].min || "this information is not available at the time")
        // $("#artistShows").append(priceLow);

        var venueName = $("<p>").text("Venue: " + concerts._embedded.events[i]._embedded.venues[0].name)
        $("#artistShows").append(venueName);

         var venueAddress = $("<p>").text("Address: " + concerts._embedded.events[i]._embedded.venues[0].address.line1)
         $("#artistShows").append(venueAddress);
         
         var ticketLink = (concerts._embedded.events[i].url)
        var newLink = $('<button class="button is-info is-inverted is-outlined">').click(function(){ window.location = ''+ ticketLink + ''; window.EventTarget="_blank"}).text("Click here to buy a ticket!");
        
         $("#artistShows").append(newLink);
         $("#artistShows").append("<hr>")
        }
        // make the div show up, and others dissapear
        
        $("#welcomeInfo").addClass("is-hidden")
        $("#artistShows").removeClass("is-hidden");

        });
        

    });