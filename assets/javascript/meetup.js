$( document ).ready(function() {

$("#searchButton").on("click", function(event) {
        
        event.preventDefault();

        var queryURL = "https://api.meetup.com/find/groups?&sign=true&photo-host=public&zip=20147&country=USA&upcoming_events=true&text= moms&radius=10&desc=new moms&key=1931492317559664c262647694b5a5a";
        
      
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

            var responseJson = JSON.stringify(response);
            
             $('#resultsGoHere').append("<form>");
        	
            for(var i = 0; i <response.length; i++) {
                var details = response[i];
        	 
                $("#resultsGoHere").append("<br>" + "<div class='well'>" + "<a href='" + details.link +"' target='_blank'><h2>" + details.name + "</h2></a>" + "<h5>" + details.city + "</h5>" +  details.description + "</div>");
        	  
        	}
        	$("#resultsGoHere").append("</form>");

        });

    
});

});

