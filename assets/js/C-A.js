var criticallyAcclaimedMovie = document.querySelector("#critically-acclaimed");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");
// var mostPopularImg = document.querySelector("#most-popular-img");
// var pagesEl = document.querySelector(".page-btn")

window.onload = function WindowLoad() {
    getCa(1);
}
var getCa= function (page) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&with_release_type=3&vote_count.gte=10000&page=" + page
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                displayCa(data);
            });
        }
    });
};

// As of right now to get an img to show you have to call the getMostPopular() in the console

var displayCa = function (data) {

    criticallyAcclaimedMovie.innerHTML = "";

    for (var i = 0; i < 20; i++) {

        if(!data.results[i].poster_path) {
            continue;
         }
         
        var baseUrl = "https://image.tmdb.org/t/p/w200"

        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id)


        var newReleaseImg = document.createElement("img");
        newReleaseImg.style.padding = "1px"
        newReleaseImg.style.transition = "0.3s"
        newReleaseImg.src = baseUrl + data.results[i].poster_path;

        popLink.appendChild(newReleaseImg);
        criticallyAcclaimedMovie.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title"
         criticallyAcclaimedMovie.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn" + data.results[i].id;
         watchListBtn.className = "watch-btn btn-floating halfway-fab waves-effect waves-light red small material-icons";
         watchListBtn.setAttribute("type", "button");
         watchListBtn.setAttribute("value", i);
         watchListBtn.textContent = "add";
         watchList.appendChild(watchListBtn);

        // on click the button savees to local storage
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
        newReleaseImg.addEventListener("mouseover", function (event) {
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

    $(".page-btn").on("click", function () {
        getCa($(this).text());
        console.log($(this).text());
    })

    var formHandler = function(event) {
    event.preventDefault();

    var movieName = movieSearch.value.trim();
    if (movieName)
    {
        
        window.location.href = "search-results.html?movie-name=" + movieName
        console.log(movieName);
    }
};

movieForm.addEventListener("submit", formHandler);