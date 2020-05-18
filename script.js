// General wiki search AJAX call

    // Hiding and displaying main content boxes upon search
    $("form").on("submit", function(event) {
        event.preventDefault();
        var searchCity = $("#cityInput").val().trim();

        // Pull Wiki info
        var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=25&exlimit=3&titles=" + searchCity + "&explaintext=1&formatversion=2&format=json&origin=*"
        
        // "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=" + searchCity + "&explaintext=1&formatversion=2&format=json&origin=*"
        
        // "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchCity + "&prop=wikitext&formatversion=2&format=json&origin=*" 
        
        // "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchCity + "&srprop=snippet&format=json&origin=*"
              
        // "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchCity + "&format=json&origin=*"
        
        $("#cityInfo").empty();
        $.ajax({
            url: wikiURL,
            type: 'GET'
        }).then (function(results) {
            console.log(results)
        
        var cityTitle = $("<p>").addClass("title is-3").text(results.query.pages[0].title);
        var cityText = $("<p>").text(results.query.pages[0].extract);
        
        // Display Wiki Information
        $("#welcomeInfo").addClass("is-hidden")
        $("#cityInfo").removeClass("is-hidden");
        
        $("#cityInfo").append(cityTitle, cityText);

        });

        // Display articles    
        var articleURL = "http://newsapi.org/v2/everything?q='" + searchCity + " dining'&apiKey=20f727e0d91642b79b4a3da85e6cb53a"
    
        $("#articleResults").empty();

        $.ajax({
            url: articleURL,
            method: "GET"
        }) .then(function (response) {
            console.log(response)
    
            for (var i = 0; i < 4; i++) {
            var articleHeadline = $("<p>").addClass("title is-5").text(response.articles[i].title).css("margin-bottom", "5px");
            var articleAbstract = $("<p>").text(response.articles[i].description).css("margin-bottom", "15px");
            var separator = $("<hr>").css("background", "#808080");

            $("#articleResults").removeClass("is-hidden");
            
            $("#articleResults").append(articleHeadline, articleAbstract, separator);
            }
    });

    });