$( document ).ready(function() {
    var actors = ["Jack Nicholson", "Marlon Brando", "Robert De Niro", "Al Pacino", "Daniel Day-Lewis", "Anthony Hopkins", "Laurence Olivier", "Gary Oldman", "Gregory Peck", "Kirk Douglas","Tommy Lee Jones", "Sean Connery", "Edward Norton"];
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < actors.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("actor");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", actors[i]);
            gifButton.text(actors[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
   
    function addNewButton(){
        $("#addGif").on("click", function(){
        var actor = $("#actor-input").val().trim();
        if (actor == ""){
          return false; 
        }
        actors.push(actor);
    
        displayGifButtons();
        return false;
        });
    }
    function removeLastButton(){
        $("removeGif").on("click", function(){
        actors.pop(actor);
        displayGifButtons();
        return false;
        });
    }
    function displayGifs(){
        var actor = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There is not a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    $(document).on("click", ".actor", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    