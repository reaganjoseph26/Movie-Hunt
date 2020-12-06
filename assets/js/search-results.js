var popMovie = document.querySelector("#search-results");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");

//search for the URL 
    const queryString = window.location.search;
    //get ids passing from one file the next, puts parameter into an object 
    const urlParams = new URLSearchParams(queryString);
    // only get the id from the parameters
    const movieName = urlParams.get('movie-name');
    // display movie information by id 

window.onload = function WindowLoad() {

   getMovie(1);
   
}

var displayResults = function (data) {
    popMovie.innerHTML = "";

    for (var i = 0; i < data.results.length; i++) {
        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id)
        var baseUrl = "https://image.tmdb.org/t/p/w200"
        var movieTitle = document.querySelector("title")

        if(!data.results[i].poster_path) {
            var searchImg = document.createElement("img");
            searchImg.src = "./assets/images/unavailable-image.jpg" 
            searchImg.style = "width: 200px; height: 301px; padding: 1px;"
            
    
         } else {
            var searchImg = document.createElement("img");
            searchImg.style.padding = "1px"
            searchImg.src = baseUrl + data.results[i].poster_path;
         }
         
        movieTitle.textContent = movieName

        var searchHeading = document.querySelector("h3")
        searchHeading.textContent = "Search results: " + movieName
        
        popLink.appendChild(searchImg);
        popMovie.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title"
         popMovie.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn" + data.results[i].id ;
         watchListBtn.className = "watch-btn btn-floating halfway-fab waves-effect waves-light red small material-icons";
         watchListBtn.setAttribute("type", "button");
         watchListBtn.setAttribute("value", i);
         watchListBtn.textContent = "add";
         watchList.appendChild(watchListBtn);

         $('#watch-list-btn' + data.results[i].id).on('click', function(event)
         {
             var $this = $(this);
             if ($this.hasClass('watch-btn'))
             {
                 localStorage.setItem(data.results[event.target.value].title, JSON.stringify(data.results[event.target.value]));
 
             }
             else if ($this.hasClass('remove-btn'))
             {
                 localStorage.removeItem(data.results[event.target.value].title, JSON.stringify(data.results[event.target.value]));
             }
 
             $this.toggleClass('watch-btn');
 
             if ($this.hasClass('watch-btn'))
             {
                 $this.text('add');
                 
             }
             else
             {
                 $this.addClass('remove-btn small material-icons');
                 $this.text('remove');
             }
             
         });
 

        // This handler will be executed every time the cursor is moved over a different list item
        searchImg.addEventListener("mouseover", function (event) {
            // highlight the mouseover target
            event.target.style.opacity = "0.5";
            event.target.style.transition = "0.3s"

            event.target.addEventListener("mouseout", function (event) {
                     event.target.style.opacity = "";
            })
        }, false);
    }

};


var getMovie = function(page) 
{
    var tmdbApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&query=" + movieName + "&page=" + page + "&include_adult=false";

    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                console.log(data)
                displayResults(data)
            });
        }
    });
};

//create a function that hides the pagination numbers is serch results are not sufficent in length
// function hidePages(getMovie) {
    // if the pagination page number is greater than the json results, hide those next page numbers
    // var prevPage  = function (page) {
    //     var currentPage = 1
    //     if(currentPage > 1) {
    //         page--;
    //         changePage(currentPage)
    //     }
    // }


$(".page-btn").on("click", function () {
    getMovie($(this).text());
    console.log($(this).text());
})

// $(".prev").on("click", function (page) {
//     getMovie(page) = page - 1;
//     // var currentPage = 1
//     //     if(currentPage > 1) {
//     //         page--;
//     //         changePage(currentPage)
//     //     }
//     // getMovie($(this).addClass.text());
//     console.log($(this));
// })


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


 