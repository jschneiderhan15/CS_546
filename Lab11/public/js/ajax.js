(function ($){

    function pageLoad(){
        var showList = document.querySelector("#showList");
        //creating request information
        var requestConfig = {
            method: 'GET',
            url: 'http://api.tvmaze.com/shows'
        };
        //requesting with ajax
        $.ajax(requestConfig).then(function (responseMessage) {
            //once the ajax returns data, create list items
            $.each(responseMessage, function () {
                let li = document.createElement("li");
                let link = document.createElement("a");
                link.innerHTML = this.name;
                link.href = this._links.self.href;
                $(link).on('click', function (event) {
                    event.preventDefault();
                    clickLink(link);

                });
                li.appendChild(link);
                showList.appendChild(li);
                $('#showList').show();
                $('#show').hide();
            });  
        });
    }

    pageLoad();

    $('#searchForm').submit(function (event) {
        event.preventDefault();
        if($('#search_term').val().trim() === ""){
            alert("ERROR: Search term cannot be empty. Please enter a valid term.");
        } else{
            var requestConfigNew = {
                method: 'GET',
                url: 'http://api.tvmaze.com/search/shows?q=' + $('#search_term').val()
            }; 
            
            $.ajax(requestConfigNew).then(function (responseMessage) {
                $('#showList').empty();
                $.each(responseMessage, function () { 
                    $('#showList').append(`<li><a class="linkShow" href='${this.show._links.self.href}'>${this.show.name}</a></li>`);
                });                      
                $('#showList').show();
                $('#reloadLink').show();
                $('#show').hide();
                $('a.linkShow').on('click', function (event) {
                    event.preventDefault();
                    clickLink(event.target.href);
                });
            });  
        }
    });

    function clickLink(link){
        $('#showList').hide();
        $('#show').empty();
        var requestConfigNewer = {
            method: 'GET',
            url: link
        };
        try{
            $.ajax(requestConfigNewer).then(function (responseMessage) {
                let name, img, lang, rating, network, summary, gnr;
                if(!responseMessage.name){
                    name = "N/A";
                } else{
                    name = responseMessage.name;
                }
                 if(responseMessage.image){
                     if(!responseMessage.image.medium){
                        img = "/public/js/no_image.jpeg";
                    } else{
                        img = responseMessage.image.medium;
                    }
                } else{
                    img = "/public/js/no_image.jpeg";
                }
                if(!responseMessage.language){
                    lang = "N/A";
                } else{
                    lang = responseMessage.language;
                }
                if(!responseMessage.genres){
                    gnr = ["N/A"];
                }
                else if(responseMessage.genres.length === 0){
                    gnr = ["N/A"];
                } else{
                    gnr = responseMessage.genres;
                }
                if(responseMessage.rating){
                    if(!responseMessage.rating.average){
                        rating = "N/A";
                    } else{
                        rating = responseMessage.rating.average;
                    }
                } else{
                    rating = "N/A";
                }
                if(responseMessage.network){
                    if(!responseMessage.network.name){
                        network = "N/A";
                    } else{
                        network = responseMessage.network.name;
                    }
                } else{
                    network = "N/A";
                }
                
                if(!responseMessage.summary){
                    summary = "N/A";
                } else{
                    summary = responseMessage.summary;
                }
                
                $('#show').append(`<h1>${name}</h1> <img src = '${img}'/>` + 
                                    `<dl>
                                        <dt>Language</dt>
                                        <dd>${lang}</dd>
                                        <dt>Genres</dt>
                                        <ul id=genreList> 
                                        </ul>
                                        <dt>Ratings Average</dt>
                                        <dd>${rating}</dd>
                                        <dt>Network</dt>
                                        <dd>${network}</dd>
                                        <dt>Summary</dt>
                                        <dd>${summary}</dd>`);
                var genres = document.getElementById('genreList');
                // var test = document.createElement("li");
                // test.innerHTML = "hello";
                // genres.appendChild(test);
                for(var i = 0; i < gnr.length; i++){
                    var genre = document.createElement("li");
                    genre.innerHTML = gnr[i];
                    genres.appendChild(genre);
                }
                $('#show').show();
                $('#reloadLink').show();
            });
        } catch (e){
            alert(e);
        }
        
    }
})(window.jQuery);