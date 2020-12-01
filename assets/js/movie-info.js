
// var testId = 682377;
var movieTitle = document.querySelector("h1");
var moviePoster = document.querySelector("#movie-poster");
var movieSum = document.querySelector("#movie-summary");
var movieReleaseDate = document.querySelector("#release-date");
var pageTitle = document.querySelector("title");
var movieVideo = document.querySelector("#movie-trailer");

var getMovieDetails = function (id) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=a01b6212f3bbba093d5cbc6d345df704&language=en-US"
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayMovieDetails(data)
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

var getVideo = function (id) {

    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=b5a9c03b27f6c897638c6e5f922cad8d&append_to_response=videos&language=en-US"
    fetch(tmdbApiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            //pull the trailer off of youtube by the api movie key
            movieVideo.src = "https://www.youtube.com/embed/" + data.videos.results[0].key

        })
    })
}


window.onload = function WindowLoad() {
    //function for when a movie is clicked on a different page it takes the user to a sepreate html

    //search for the URL 
    const queryString = window.location.search;
    //get ids passing from one file the next, puts parameter into an object 
    const urlParams = new URLSearchParams(queryString);
    // only get the id from the parameters
    const movieId = urlParams.get('id');
    // display movie information by id 
    getMovieDetails(movieId);
    getVideo(movieId)
   
}

