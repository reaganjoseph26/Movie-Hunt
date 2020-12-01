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
var newReleases = document.querySelector("#new-releases");
var critAcclaimed = document.querySelector("#critically-acclaimed");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");
var mostPopularImg = document.querySelector("#most-popular-img");


window.onload = function WindowLoad() {
    getMostPopular();
    getNewReleases();
    getCriticallyAcclaimed();
};

var getMostPopular = function()
{
    var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b5a9c03b27f6c897638c6e5f922cad8d"

    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                displayMostPopular(data);
            });
        }
    });
};


var displayMostPopular = function(data)
{
    popMovie.innerHTML = "";

    for (var i = 0; i < 5; i++) {

        if(!data.results[i].poster_path) {
            continue;
         }

        var baseUrl = "https://image.tmdb.org/t/p/w200"

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

var getNewReleases = function()
{
    var currDate = moment().format("YYYY-MM-DD");
    var pastDate = moment().subtract(30, 'days')

    var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&release_date.gte=" + pastDate + "&release_date.lte=" + currDate + "&with_release_type=3"
    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                displayNewReleases(data);
            });
        }
    });
};


var displayNewReleases = function(data)
{
    for (var i = 1; i < 6; i++)
    {
        if(!data.results[i].poster_path) {
            continue;
         }

        var baseUrl = "https://image.tmdb.org/t/p/w200"

        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id);

        // create img element to put poster into
        var newReleaseImg = document.createElement("img");
        newReleaseImg.id = "new-release-img";
        newReleaseImg.style.padding = "1px";
        newReleaseImg.src = baseUrl + data.results[i].poster_path;
        newReleases.appendChild(newReleaseImg);

        popLink.append(newReleaseImg);
        newReleases.append(popLink);

        // Create span to put watch list btn
        var watchList = document.createElement("span");
        watchList.id = "btn-span";
        watchList.className = "card-title"
        newReleases.appendChild(watchList);

        // Create button for watch list
        var watchListBtn = document.createElement("button");
        watchListBtn.id = "watch-list-btn";
        watchListBtn.className = "btn-floating halfway-fab waves-effect waves-light red";
        watchListBtn.setAttribute("type", "button");
        watchListBtn.textContent = "Watch";
        watchList.appendChild(watchListBtn);



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

var getCriticallyAcclaimed = function()
{
    var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_release_type=3&vote_count.gte=15000"

    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                console.log(data);
                displayCriticallyAcclaimed(data);
            });
        }
    });
};

// As of right now to get an img to show you have to call the getMostPopular() in the console

var displayCriticallyAcclaimed = function(data)
{
    

    for (var i = 0; i < 5; i++)
    {
        if(!data.results[i].poster_path) {
            continue;
         }
         
        var baseUrl = "https://image.tmdb.org/t/p/w200"

        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id)

        var critImg = document.createElement("img");
        critImg.style.padding = "1px"
        critImg.src = baseUrl + data.results[i].poster_path;
        critAcclaimed.appendChild(critImg);

        popLink.appendChild(critImg);
        critAcclaimed.appendChild(popLink);

          // Create span to put watch list btn
          var watchList = document.createElement("span");
          watchList.id = "btn-span";
          watchList.className = "card-title"
          critAcclaimed.appendChild(watchList);
          
          // Create button for watch list
          var watchListBtn = document.createElement("button");
          watchListBtn.id = "watch-list-btn";
          watchListBtn.className = "btn-floating halfway-fab waves-effect waves-light red";
          watchListBtn.setAttribute("type", "button");
          watchListBtn.textContent = "Watch";
          watchList.appendChild(watchListBtn);

        // This handler will be executed every time the cursor is moved over a different list item
        critImg.addEventListener("mouseover", function (event) {
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
