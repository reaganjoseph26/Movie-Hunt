var watchListEl = document.querySelector("#watch-list");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");
var savedMovie = new Array();

window.onload = function WindowLoad() 
{
   displayWatchList(1);
};

var displayWatchList = function () 
{


    Object.values(localStorage).forEach((value) => 
    {

        savedMovie.push(value);
    });

    watchListEl.innerHTML = "";

    for (var i = 0; i < savedMovie.length; i++) 
    {
        var baseUrl = "https://image.tmdb.org/t/p/w200";

        var loadMovie = JSON.parse(savedMovie[i]);


        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + savedMovie[i].id);

        var savedImg = document.createElement("img");
        savedImg.style.padding = "1px";
        savedImg.style.transition = "0.3s";
        savedImg.src = baseUrl + loadMovie.poster_path;

        popLink.appendChild(savedImg);
        watchListEl.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title";
         watchListEl.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn" + savedMovie[i].id;
         watchListBtn.className = "remove-btn btn-floating halfway-fab waves-effect waves-light red small material-icons";
         watchListBtn.setAttribute("type", "button");
         watchListBtn.setAttribute("value", i);
         watchListBtn.textContent = "remove";
         watchList.appendChild(watchListBtn);

         $('#watch-list-btn' + savedMovie[i].id).on('click', function(event)
         {
             localStorage.removeItem(savedMovie[i].id);

         });

        // This handler will be executed every time the cursor is moved over a different list item
        watchListEl.addEventListener("mouseover", function (event) 
        {
            // highlight the mouseover target
            event.target.style.opacity = "0.5";
            event.target.style.transition = "0.3s";

            // reset the styles after a short delay
            setTimeout(function () 
            {
                event.target.style.opacity = "";
            }, 900);
        }, false);
    }
};



    $(".page-btn").on("click", function () 
    {
        displayWatchList($(this).text());
        console.log($(this).text());
    });

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

var getMovie = function(movie) 
{
    var tmdbApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&query=" + movie + "&page=1&include_adult=false";

    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                
                console.log(data);
            });
        }
    });
};


movieForm.addEventListener("submit", formHandler);
