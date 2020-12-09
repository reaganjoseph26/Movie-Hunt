var movieTitle = document.querySelector("h1")
var moviePoster = document.querySelector("#movie-poster")
var movieSum = document.querySelector("#movie-summary")
var movieReleaseDate = document.querySelector("#release-date")
var pageTitle = document.querySelector("title")
var movieVideo = document.querySelector("#movie-trailer")
var movieCast = document.querySelector("#movie-cast")
var movieCrew = document.querySelector("#movie-crew")
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");

var getMovieDetails = function (id) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=b5a9c03b27f6c897638c6e5f922cad8d&append_to_response=credits&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&release_date.gte="
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
    //the image url for api images with adjustable with at the end or url 
    var baseUrl = "https://image.tmdb.org/t/p/w400"
    //make title of page dynamic/ it changes based on the movie displaying
    pageTitle.textContent = data.original_title

    if(!data.poster_path) {
        var movieImg = document.createElement("img");
        movieImg.src = "./assets/images/unavailable-image.jpg" 
        movieImg.style = "width: 300px; height: 400px"

     } else {
          //create an img element to contain the movie poster
        var movieImg = document.createElement("img")
        movieImg.src = baseUrl + data.poster_path   
     }

    if (!data.release_date) {
        movieReleaseDate.style.display = "none"
        movieTitle.textContent =  data.original_title
    } else {
        //extract only the year from release date and create variables to hold it 
        var movieYear = data.release_date
        var convertedMovieYear = new Date(movieYear)
        var year = convertedMovieYear.getFullYear()
        var yearOnly = " (" + year + ")"
        //the dynamic movie title with only the year it was released
        movieTitle.textContent =  data.original_title + yearOnly
        // change textContent of seconds p elemment to display the full release date 
        movieReleaseDate.textContent = "Released: " + data.release_date
    }

    moviePoster.appendChild(movieImg)

    //change the content of the p element in html to display plot previews
    movieSum.textContent = "Plot overview: " + data.overview


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

            //pull the trailer off of youtube by the api movie key
             //if that specific movie does not have a videos key than do not display iframe
            if(data.videos.results.length > 0 ) {
                movieVideo.src = "https://www.youtube.com/embed/" + data.videos.results[0].key
            } else {
                movieVideo.style.display = "none"
            }
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


