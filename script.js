// General wiki search AJAX call
    // Hiding and displaying main content boxes upon search
    
    $("form").on("submit", function(event) {
        event.preventDefault();
        var searchCity = $("#cityInput").val().trim();
        var genreInput = $(".radio").val();

        // Pull Wiki info
        var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=Pet_door&explaintext=1&formatversion=2&format=json&origin=*"
        
        // "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=" + searchCity + "&explaintext=1&formatversion=2&format=json&origin=*"
        
        // "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchCity + "&prop=wikitext&formatversion=2&format=json&origin=*" 
        
        // "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchCity + "&srprop=snippet&format=json&origin=*"
              
        // "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchCity + "&format=json&origin=*"
        
        $("#artistInfo").empty();
        $.ajax({
            url: wikiURL,
            type: 'GET'
        }).then (function(results) {
            console.log(results)
        
        var cityTitle = $("<p>").addClass("title is-3").text(results.query.pages[0].title);
        var cityText = $("<p>").text(results.query.pages[0].extract);
        
        // Display Wiki Information
        $("#welcomeInfo").addClass("is-hidden")
        $("#artistInfo").removeClass("is-hidden");
        
        $("#artistInfo").append(cityTitle, cityText);

        });

        // // Pull Show Information
        // event.preventDefault();
        // // Pull Wiki info
        // var searchArtist = $(".button").val().trim();
        // var concertURL = // Ticketmaster API
        
        // $.ajax({
        //     url: concertURL,
        //     type: 'GET'
        // }).then (function(concerts) {
        //     console.log(concerts)
        
        // // Display Show Information
        // $("#welcomeInfo").addClass("is-hidden")
        // $("#artistShows").removeClass("is-hidden");
        // // $("#artistShows").append("h4").addClass("title is-4 infoArtist").text("About Artist").append("<p>concerts.query.search[0].snippet");
        // $("#artistShows").append("<p>").text(concerts.query.search[0].snippet);
        // });

    });