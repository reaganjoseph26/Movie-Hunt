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
var logoLink = document.querySelector("#logo")

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



   // Cast title needs to be out of for loop to not be hidden indirectly
    var castTitle = document.querySelector("#cast-title")
    castTitle.textContent = "Cast"
    castTitle.style = "font-size: 32px"

     //change the content of specific p element to display cast and crew of movies
     
        if(data.credits.cast.length) {
            for(i = 0; i < data.credits.cast.length; i ++) {
            var cast = document.createElement("p")
            cast.textContent += data.credits.cast[i].original_name  
            movieCast.appendChild(cast)
            movieCast.style.display = "none"
            }
        } else {
            var cast = document.createElement("p")
            cast.textContent = "No cast avaiable" 
            movieCast.appendChild(cast)
            movieCast.style.display = "none"
            
        }
     

     var collCast = document.getElementById("cast-collapse")
     // this bit of logic came from w3 schools
     
        collCast.addEventListener("click", function() {
          this.classList.toggle("clicked");
         
          if (movieCast.style.display === "block") {
            movieCast.style.display = "none";
          } else {
            movieCast.style.display = "block";
          }
        });
      
        var crewTitle = document.querySelector("#crew-title")
        crewTitle.textContent = "Crew"
        crewTitle.style = "font-size: 32px"

     
         if(data.credits.crew.length) {
            for(i = 0; i < data.credits.crew.length; i ++) {
            var crew = document.createElement("p")
            crew.textContent += data.credits.crew[i].original_name 
            movieCrew.appendChild(crew)
            movieCrew.style.display = "none"
            }
         } else {
            var crew = document.createElement("p")
            crew.textContent = "No crew avaiable"
            movieCrew.appendChild(crew)
            movieCrew.style.display = "none"
         }

     var collCrew = document.getElementById("crew-collapse")
     // this bit of logic came from w3 schools
     
        collCrew.addEventListener("click", function() {
          this.classList.toggle("clicked");
         
          if (movieCrew.style.display === "block") {
            movieCrew.style.display = "none";
          } else {
            movieCrew.style.display = "block";
          }
        });
      


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
    logo()
   
}

    // init for hamburger for mobile responsivness. Directly from materialize. 
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, instances);
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

movieForm.addEventListener("submit", formHandler)




