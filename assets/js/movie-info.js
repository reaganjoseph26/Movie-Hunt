
// var testId = 682377;
var movieTitle = document.querySelector("h1")
var moviePoster = document.querySelector("#movie-poster")
var movieSum = document.querySelector("#movie-summary")
var movieReleaseDate = document.querySelector("#release-date")
var pageTitle = document.querySelector("title")
var key = config.myKey
var movieVideo = document.querySelector("#movie-trailer")

var getMovieDetails = function (id) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=a01b6212f3bbba093d5cbc6d345df704&language=en-US"
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayMovieDetails(data)

                // movieTitle.textContent =  data.original_title;
                
                // var movieImg = document.createElement("img")
                // movieImg.src = data.poster_path
                // moviePoster.appendChild(movieImg)
            });
        }
    });
};

var displayMovieDetails = function (data) {

    //make title of page dynamic/ it changes based on the movie displaying
    pageTitle.textContent = data.original_title

    //the image url for api images with adjustable with at the end or url 
    var baseUrl = "https://image.tmdb.org/t/p/w400"

    //the dynamic movie title
    movieTitle.textContent =  data.original_title;

    //create an img element to contain the movie poster
    var movieImg = document.createElement("img")
    movieImg.src = baseUrl + data.poster_path
    moviePoster.appendChild(movieImg)

    //change the content of the p element in html to display plot previews
    movieSum.textContent = data.overview

    // change textContent of seconds p elemment to display the release date 
    movieReleaseDate.textContent = "Released: " + data.release_date

};

var getVideo = function () {

    var youtubeApiUrl = "https://youtube.googleapis.com/youtube/v3/videos?list&key=" + key
    fetch(youtubeApiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data)

            // movieVideo.src = "data:text" 
        })
    })
}


window.onload = function WindowLoad() {

    //search for the URL 
    const queryString = window.location.search;
    //get ids passing from one file the next, puts parameter into an object 
    const urlParams = new URLSearchParams(queryString);
    // only get the id from the parameters
    const movieId = urlParams.get('id');
    // display movie information by id 
    getMovieDetails(movieId);
   
}

getVideo()