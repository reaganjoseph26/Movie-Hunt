
var testId = 682377;
var test = document.querySelector("h1")

var getMovieDetails = function (id) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=a01b6212f3bbba093d5cbc6d345df704&language=en-US"
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                test.textContent =  data.original_title;
            });
        }
    });
};


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