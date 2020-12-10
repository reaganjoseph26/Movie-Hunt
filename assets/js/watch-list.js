var watchListEl = document.querySelector("#watch-list");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");
var savedMovie = new Array();
var currentPage = 1
var logoLink = document.querySelector("#logo")

window.onload = function WindowLoad() 
{ 
   displayWatchList(1);
   logo()
};

var logo = function (data) {
    var gifURL = "https://api.giphy.com/v1/gifs/o5AArudfqI9znPSjQX?api_key=6XngDpl7fXmk1MATKhTD7H9kasRzSkQH"
    
    fetch(gifURL).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
               console.log(data)
            });

            var baseLogoUrl = "https://media0.giphy.com/media/o5AArudfqI9znPSjQX/480w_s.jpg?cid=a84b9a2db10c6d737957081daa813389489c05d664161149&rid=400w_s.jpg" 
            var movieHuntLogo = document.createElement("img")
            movieHuntLogo.src = baseLogoUrl 
            movieHuntLogo.style = "width: 120px"
            logoLink.style = "height: -webkit-fill-available; margin-left: 400px"
            logoLink.appendChild(movieHuntLogo)
        }
    })
};

var displayWatchList = function () 
{

    savedMovie = new Array();
    Object.values(localStorage).forEach((value) => 
    {
        savedMovie.push(value);
    });

    watchListEl.innerHTML = "";
    // console.log(savedMovie)
    for (var i = 0; i < savedMovie.length; i++)  {
        var baseUrl = "https://image.tmdb.org/t/p/w200";
        var popLink = document.createElement("a");
        var loadMovie = JSON.parse(savedMovie[i]);
        console.log(loadMovie)

        if(!loadMovie.poster_path) {
            var savedImg = document.createElement("img");
            savedImg.src = "./assets/images/unavailable-image.jpg" 
            savedImg.style = "width: 200px; height: 301px; padding: 1px;"
            
    
         } else {
            var savedImg = document.createElement("img");
            savedImg.style.padding = "1px";
            savedImg.src = baseUrl + loadMovie.poster_path;
         }
         popLink.setAttribute('href', 'movie-info.html?id=' + loadMovie.id);
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
         watchListBtn.onclick = (function() 
         {
            var currentI = i;
            return function() 
            { 
                var movie = JSON.parse(savedMovie[currentI])
                localStorage.removeItem(movie.title)
                displayWatchList(1)
            }
         })();
         watchList.appendChild(watchListBtn);

        // This handler will be executed every time the cursor is moved over a different list item
        watchListEl.addEventListener("mouseover", function (event) {
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
    displayWatchList(currentPage);
    console.log($(this).text());
})

    $(".next").on("click", function () {
        currentPage = currentPage + 1
        displayWatchList(currentPage);
        console.log(currentPage);
})

    $(".prev").on("click", function () {
    if(currentPage > 1) {
        currentPage = currentPage - 1
        displayWatchList(currentPage);
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


    // KEEP IN CODE BUT PSUEDO CODE OUT FOR NOW!!
// var getMovie = function(movie) 
// {
//     var tmdbApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&query=" + movie + "&page=1&language=en-US&append_to_response=videos";

//     fetch(tmdbApiUrl).then(function(response)
//     {
//         if (response.ok)
//         {
//             response.json().then(function(data)
//             {
//                 console.log(data);
//             });
           
//         }
//     });
   
// };


movieForm.addEventListener("submit", formHandler);
