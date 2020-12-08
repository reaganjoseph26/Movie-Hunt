var popMovie = document.querySelector("#most-popular");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");
var currentPage = 1


window.onload = function WindowLoad() {
    getMostPopular(1);
}
var getMostPopular = function (page) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=a01b6212f3bbba093d5cbc6d345df704&language=en-US&page=" + page
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                displayMostPopular(data);
            });
        }
    });
};


var displayMostPopular = function (data) {
    popMovie.innerHTML = "";

    for (var i = 0; i < 20; i++) {

        var baseUrl = "https://image.tmdb.org/t/p/w200"
        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id)

        if(!data.results[i].poster_path) {
            var popImg = document.createElement("img");
            popImg.src = "./assets/images/unavailable-image.jpg" 
            popImg.style = "width: 200px; height: 301px; padding: 1px;"
            
    
         } else {
            var popImg = document.createElement("img");
            popImg.style.padding = "1px"
            popImg.src = baseUrl + data.results[i].poster_path;
         }
         
    
        popLink.appendChild(popImg);
        popMovie.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title"
         popMovie.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn" + data.results[i].id;
         watchListBtn.className = "watch-btn btn-floating halfway-fab waves-effect waves-light red small material-icons";
         watchListBtn.setAttribute("type", "button");
         watchListBtn.setAttribute("value", i);
         watchListBtn.textContent = "add";
         watchList.appendChild(watchListBtn);

         $('#watch-list-btn' + data.results[i].id).on('click', function(event)
         {
             var $this = $(this);
             if ($this.hasClass('watch-btn'))
             {
                 localStorage.setItem(data.results[event.target.value].title, JSON.stringify(data.results[event.target.value]));
 
             }
             else if ($this.hasClass('remove-btn'))
             {
                 localStorage.removeItem(data.results[event.target.value].title, JSON.stringify(data.results[event.target.value]));
             }
 
             $this.toggleClass('watch-btn');
 
             if ($this.hasClass('watch-btn'))
             {
                 $this.text('add');
                 
             }
             else
             {
                 $this.addClass('remove-btn small material-icons');
                 $this.text('remove');
             }
             
         });

        // This handler will be executed every time the cursor is moved over a different list item
        popImg.addEventListener("mouseover", function (event) {
            // highlight the mouseover target
            event.target.style.opacity = "0.5";
            event.target.style.transition = "0.3s"

            event.target.addEventListener("mouseout", function (event) {
                     event.target.style.opacity = "";
            })
        }, false);
    }

};

$(".page-btn").on("click", function () {
    currentPage = parseInt($(this).text())
    getMostPopular(currentPage);
    console.log($(this).text());
})

    $(".next").on("click", function () {
        currentPage = currentPage + 1
        getMostPopular(currentPage);
        console.log(currentPage);
})

    $(".prev").on("click", function () {
    if(currentPage > 1) {
        currentPage = currentPage - 1
        getMostPopular(currentPage);
    }
    console.log(currentPage);
    })

    var formHandler = function(event)
    {
        event.preventDefault();
    
        var movieName = movieSearch.value.trim();
        if (movieName)
        {
            window.location.href = "search-results.html?movie-name=" + movieName
    
    
            console.log(movieName);
        }
    };
    
    movieForm.addEventListener("submit", formHandler)
