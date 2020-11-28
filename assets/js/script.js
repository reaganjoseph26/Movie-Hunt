// // var youtubeApi = AIzaSyDZ1v09SfZTd-$AHu3webb7GyC__L4XRVY;
// // https://www.youtube.com/embed/




// //   // Load the IFrame Player API code asynchronously.
// //   var tag = document.createElement('script');
// //   tag.src = "https://www.youtube.com/player_api";
// //   var firstScriptTag = document.getElementsByTagName('script')[0];
// //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// //   // Replace the 'ytplayer' element with an <iframe> and
// //   // YouTube player after the API code downloads.
// //   var player;
// //   function onYouTubePlayerAPIReady() {
// //     player = new YT.Player('ytplayer', {
// //       height: '360',
// //       width: '640',
// //       videoId: 'M7lc1UVf-VE'
// //     });
// //   }
// // w

// // http://img.omdbapi.com/?apikey=15254e38&

// var movieForm = document.querySelector("#movie-form");
// var movieSearch = document.querySelector("#movie-search");
// var recentMovieEl = document.querySelector("#recent-movies");
// var movieArr = new Array();


// var formHandler = function(event)
// {
//     event.preventDefault();

//     var movieName = movieSearch.value.trim();
//     if (movieName)
//     {
//         getMovie(movieName);
//         movieSearch.value = "";
//         console.log(movieName);
//     }
// };

// var recentMovieHandler = function(event)
// {
//     var historyBtn = event.target.getAttribute("value");
//     if (historyBtn)
//     {
//         getMovie(historyBtn);
//     }
// };

// var getMovie = function(movie) 
// {
//     var ombdApiUrl = "http://www.omdbapi.com/?apikey=15254e38&t=" + movie;

//     fetch(ombdApiUrl).then(function(response)
//     {
//         if (response.ok)
//         {
//             response.json().then(function(data)
//             {
//                 displayMovie(data);
//                 saveMovie(movie);
//                 loadMovie();
//                 console.log(data);
//             });
//         }
//     });
// };

// var displayMovie = function(data)
// {
//     var currTitle = document.querySelector("#current-title-genre");
//     var currActors = document.querySelector("#current-actors");
//     var currReleaseDate = document.querySelector("#current-rDate");
//     var currRated = document.querySelector("#current-rated");
//     var currPlot = document.querySelector("#current-plot");

//     currTitle.textContent = data.Title + data.Genre;
//     currActors.textContent = data.Actors;
//     currReleaseDate.textContent = data.Released;
//     currRated.textContent = data.Rated;
//     currPlot.textContent = data.Plot;
// };

// var saveMovie = function(movie)
// {
//     // prevent search from saving twice and moves to bottom of array
//     for (var i = 0; i < movieArr.length; i++) {
//         if (movie === movieArr[i]) {
//             movieArr.splice(i, 1);
//         }
//     }

//     movieArr.push(movie);
//     localStorage.setItem("movie", JSON.stringify(movieArr));
// };

// var loadMovie = function()
// {
//     // prevent movie from copying twice on page
//     recentMovieEl.innerHTML = "";
//     movieArr = JSON.parse(localStorage.getItem("movie"));
//     if (movieArr && movieArr.length > 0)
//     {
//         newMovieArr = [...new Set(movieArr)];

//         for (var i = 0; i < newMovieArr.length; i++)
//         {
//             var recentMovies = document.createElement("button");
//             recentMovies.className = "list-group-item bg-secondary text-white mt-1";
//             recentMovies.setAttribute("value", newMovieArr[i]);
//             recentMovies.textContent = newMovieArr[i];
//             recentMovieEl.appendChild(recentMovies);

//         }
//     }
// };

// if(localStorage.getItem("movie"))
// {
//     loadMovie();
// }



// movieForm.addEventListener("submit", formHandler);
// recentMovieEl.addEventListener("click", recentMovieHandler);


// DON"T MIND ANY OF THE ABOVE CODE. IT ACCESSES AN API WE PROBABLY WON'T USE

// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b5a9c03b27f6c897638c6e5f922cad8d

// https://image.tmdb.org/t/p/w300/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg


var popMovie = document.querySelector("#most-popular");
var newReleases = document.querySelector("#new-releases")
var mostPopularImg = document.querySelector("#most-popular-img");


window.onload = function WindowLoad() {
    getMostPopular();
    getNewReleases();
}
var getMostPopular = function () {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=a01b6212f3bbba093d5cbc6d345df704&language=en-US&page=1"
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayMostPopular(data);
            });
        }
    });
};

// As of right now to get an img to show you have to call the getMostPopular() in the console

var displayMostPopular = function (data) {
    popMovie.innerHTML = "";

    for (var i = 0; i < 5; i++) {
        var baseUrl = "https://image.tmdb.org/t/p/w200"
        var popImg = document.createElement("img");
        popImg.style.padding = "1px"
        popImg.style.transition = "0.3s"
        popImg.src = baseUrl + data.results[i].poster_path;
        popMovie.appendChild(popImg);

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

var getNewReleases = function()
{
    var currDate = moment().format("YYYY-MM-DD");
    var pastDate = moment().subtract(30, 'days')

    // var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=" + currDate + "&primary_release_date.lte=" + pastDate + "&api_key=b5a9c03b27f6c897638c6e5f922cad8d"
    var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&release_date.gte=" + pastDate + "&release_date.lte=" + currDate + "&with_release_type=3"
    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                displayNewReleases(data);
                console.log(data);

            });
        }
    });
};


var displayNewReleases = function(data)
{
    for (var i = 0; i < 5; i++)
    {
        var baseUrl = "https://image.tmdb.org/t/p/w300"
        var newReleaseImg = document.createElement("img");
        newReleaseImg.src = baseUrl + data.results[i].poster_path;
        newReleases.appendChild(newReleaseImg);
    }
};
