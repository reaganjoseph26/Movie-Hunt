var newReleases = document.querySelector("#new-releases");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");

window.onload = function WindowLoad() {
    getNewReleases(1);
}
var getNewReleases = function(page)
{
    var currDate = moment().format("YYYY-MM-DD");
    var pastDate = moment().subtract(120, 'days');

    var tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b5a9c03b27f6c897638c6e5f922cad8d&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&release_date.gte=" + pastDate + "&release_date.lte=" + currDate + "&with_release_type=3&page=" + page;

    fetch(tmdbApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data) {
                console.log(data)
                displayNewReleases(data);
            });
        }
    });
};


var displayNewReleases = function(data)
{
    // clears current content and puts new results on page click
    newReleases.innerHTML = "";

    for (var i = 0; i < 20; i++)
    {   
        var baseUrl = "https://image.tmdb.org/t/p/w200";
        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id);

        if(!data.results[i].poster_path) {
            var newReleaseImg = document.createElement("img");
            newReleaseImg.src = "./assets/images/unavailable-image.jpg" 
            newReleaseImg.style = "width: 200px; height: 301px; padding: 1px;"
            
    
         } else {
            var newReleaseImg = document.createElement("img");
            newReleaseImg.style.padding = "1px";
            newReleaseImg.src = baseUrl + data.results[i].poster_path
         }
         

        newReleases.appendChild(newReleaseImg);
        popLink.appendChild(newReleaseImg);
        newReleases.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title"
         newReleases.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn" + data.results[i].id;
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
        newReleaseImg.addEventListener("mouseover", function (event) {
            // highlight the mouseover target
            event.target.style.opacity = "0.5";
            event.target.style.transition = "0.3s"

            event.target.addEventListener("mouseout", function (event) {
                     event.target.style.opacity = "";
            })
        }, false);
    }
};

    
    $(".page-btn").on("click", function () {
        getNewReleases($(this).text());
        console.log($(this).text());
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
    
    movieForm.addEventListener("submit", formHandler);
    
