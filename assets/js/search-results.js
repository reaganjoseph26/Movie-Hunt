var popMovie = document.querySelector("#search-results");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");

//search for the URL 
    const queryString = window.location.search;
    //get ids passing from one file the next, puts parameter into an object 
    const urlParams = new URLSearchParams(queryString);
    // only get the id from the parameters
    const movieName = urlParams.get('movie-name');
    // display movie information by id 

window.onload = function WindowLoad() {

   getMovie(1);
}

var displayResults = function (data) {
    popMovie.innerHTML = "";

    for (var i = 0; i < data.results.length; i++) {
        if(!data.results[i].poster_path) {
            continue;
         }
         
        var baseUrl = "https://image.tmdb.org/t/p/w200"

        var movieTitle = document.querySelector("title")
        movieTitle.textContent = movieName
        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id)


        var popImg = document.createElement("img");
        popImg.style.padding = "1px"
        popImg.style.transition = "0.3s"
        popImg.src = baseUrl + data.results[i].poster_path;

        popLink.appendChild(popImg);
        popMovie.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title"
         popMovie.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn";
         watchListBtn.className = "btn-floating halfway-fab waves-effect waves-light red";
         watchListBtn.setAttribute("type", "button");
         watchListBtn.textContent = "Watch";
         watchList.appendChild(watchListBtn);

        // This handler will be executed every time the cursor is moved over a different list item
        popImg.addEventListener("mouseover", function (event) {
            // highlight the mouseover target
            event.target.style.opacity = "0.5";
            event.target.style.transition = "0.3s"

            // reset the styles after a short delay
            setTimeout(function () {
                event.target.style.opacity = "";
            }, 900);
        }, false);
    }

};

var getMovie = function(page) 
{
    var tmdbApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&query=" + movieName + "&page=" + page + "&include_adult=false";

    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                console.log(data)
                displayResults(data)
            });
        }
    });
};


$(".page-btn").on("click", function () {
    getMovie($(this).text());
    console.log($(this).text());
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


 