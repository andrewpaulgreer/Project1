// General wiki search AJAX call
    // Hiding and displaying main content boxes upon search
    
    $("form").on("submit", function(event) {
        event.preventDefault();

        // Pull Wiki info
        var searchArtist = $("#artistInput").val().trim();
        var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchArtist + "&srprop=snippet&format=json&origin=*"
        $("#artistInfo").empty();
        $.ajax({
            url: wikiURL,
            type: 'GET'
        }).then (function(results) {
            console.log(results)
        
        // Display Wiki Information
        $("#welcomeInfo").addClass("is-hidden")
        $("#artistInfo").removeClass("is-hidden");
        $("#artistInfo").append("h4").addClass("title is-4 infoArtist").text("About Artist").append("<p>results.query.search[0].snippet");
        $("#artistInfo").append("<p>").text(results.query.search[0].snippet);
        });

        // Pull Show Information
        event.preventDefault();
        // Pull Wiki info
        var searchArtist = $("#artistInput").val().trim();
        var concertURL = // Ticketmaster API
        
        $.ajax({
            url: concertURL,
            type: 'GET'
        }).then (function(concerts) {
            console.log(concerts)
        
        // Display Show Information
        $("#welcomeInfo").addClass("is-hidden")
        $("#artistShows").removeClass("is-hidden");
        // $("#artistShows").append("h4").addClass("title is-4 infoArtist").text("About Artist").append("<p>concerts.query.search[0].snippet");
        $("#artistShows").append("<p>").text(concerts.query.search[0].snippet);
        });
        
        // Pull Videos
        var videoURL = // Youtube API
        $("#artistInfo").empty();
        $.ajax({
            url: videoURL,
            type: 'GET'
        }).then (function(videos) {
            console.log(videos)
        
        // Display Videos
        $("#welcomeInfo").addClass("is-hidden")
        $("#artistVids").removeClass("is-hidden");
        $("#artistVids").append("h4").addClass("title is-4 infoArtist").text("About Artist").append("<p>videos.query.search[0].snippet");
        $("#artistVids").append("<p>").text(videos.query.search[0].snippet);
        });

    });