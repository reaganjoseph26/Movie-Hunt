var movieTitle = document.querySelector("h1")
var moviePoster = document.querySelector("#movie-poster")
var movieSum = document.querySelector("#movie-summary")
var movieReleaseDate = document.querySelector("#release-date")
var pageTitle = document.querySelector("title")
var movieVideo = document.querySelector("#movie-trailer")
var movieCast = document.querySelector("#movie-cast")
var movieCrew = document.querySelector("#movie-crew")

var getMovieDetails = function (id) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=a01b6212f3bbba093d5cbc6d345df704&append_to_response=credits&language=en-US"
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
    movieSum.textContent = "Plot overview: " + data.overview

    // change textContent of seconds p elemment to display the release date 
    movieReleaseDate.textContent = "Released: " + data.release_date

    //change the content of specific p element to display cast and crew of movies
    for(i = 0; i < data.credits.cast.length; i ++) {

        if(data.credits.cast) {
            var castTitle = document.querySelector("#cast-title")
            castTitle.textContent = "Cast"
            castTitle.style = "font-size: 32px"
            
            var cast = document.createElement("p")
            cast.textContent += data.credits.cast[i].original_name  
            movieCast.appendChild(cast)
           
        } else {
            movieCast.style.display = "none"
        }

     }

     for(i = 0; i < data.credits.crew.length; i ++) {
         if(data.credits.crew) {
            var crewTitle = document.querySelector("#crew-title")
            crewTitle.textContent = "Crew"
            crewTitle.style = "font-size: 32px"
            
            var crew = document.createElement("p")
            crew.textContent += data.credits.crew[i].original_name 
            movieCrew.appendChild(crew)
         } else {
            movieCrew.style.display = "none"
         }
        
     }


};

var getVideo = function (id) {

    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=b5a9c03b27f6c897638c6e5f922cad8d&append_to_response=videos&language=en-US"
    fetch(tmdbApiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            
            //if that specific movie does not have a videos key than do not display iframe
            // if(!data.videos.results[0].key) {
            //     movieVideo.style.display = "none"
                
            // } 
                 //pull the trailer off of youtube by the api movie key
                movieVideo.src = "https://www.youtube.com/embed/" + data.videos.results[0].key
                
             
                
                //create a condition statament that changes innerHTML if cast and crew is not 
                // if(!data.credits.cast || data.credits.crew) {
                //     continue;
        
                // } else {
                //     movieCast.textContent += data.credits.cast[i].original_name + ", "
                //     movieCrew.textContent += data.credits.crew[i].original_name + ", "
                // }
                
            
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

