var newReleases = document.querySelector("#new-releases");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");

window.onload = function WindowLoad() {
    getNewReleases(1);
}
var getNewReleases = function(page)
{
    var currDate = moment().format("YYYY-MM-DD");
    var pastDate = moment().subtract(120, 'days');

    var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&release_date.gte=" + pastDate + "&release_date.lte=" + currDate + "&with_release_type=3&page=" + page;
    // var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&release_date.gte=2020-11-01&release_date.lte=2020-11-28&with_release_type=3&page=1";

    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data) {
                console.log(data)
                displayNewReleases(data);
            });
        }
    });
};


var displayNewReleases = function(data)
{
    // clears current content and puts new results on page click
    newReleases.innerHTML = "";

    for (var i = 0; i < 20; i++)
    {
         //create an if else statment that doesnt display movies with posters value at null 
        if(!data.results[i].poster_path) {
            continue;
         }
        
        var baseUrl = "https://image.tmdb.org/t/p/w200";

        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id);

        var newReleaseImg = document.createElement("img");
        newReleaseImg.style.padding = "1px";
        newReleaseImg.src = baseUrl + data.results[i].poster_path

        newReleases.appendChild(newReleaseImg);
        popLink.appendChild(newReleaseImg);
        newReleases.appendChild(popLink);

        // This handler will be executed every time the cursor is moved over a different list item
        newReleaseImg.addEventListener("mouseover", function (event) {
            // highlight the mouseover target
            event.target.style.opacity = "0.5";
            event.target.style.transition = "0.3s";

            // reset the styles after a short delay
            setTimeout(function () {
                event.target.style.opacity = "";
            }, 900);
        }, false);
    }
};

    
    $(".page-btn").on("click", function () {
        getNewReleases($(this).text());
        console.log($(this).text());
    });

    var formHandler = function(event)
    {
        event.preventDefault();
    
        var movieName = movieSearch.value.trim();
        if (movieName)
        {
            getMovie(movieName);
            movieSearch.value = "";
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
    

// var pagination = function() {
//     console.log()
//     // var popularpageTwo = document.createElement("div")
// }

// pagination()
