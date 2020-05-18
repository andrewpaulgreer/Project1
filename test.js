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