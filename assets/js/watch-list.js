var watchListEl = document.querySelector("#watch-list");
var movieSearch = document.querySelector("#movie-search");
var movieForm = document.querySelector("#movie-form");
var savedMovie =  Object.values(localStorage);

window.onload = function WindowLoad() 
{
   displayWatchList(1);
   pagination()
};

var pagination = function()
    {
        
        var numberOfPages = Math.ceil(savedMovie.length / 20);
        $('.pagination').twbsPagination({
            totalPages: numberOfPages,
            // the current page that show on start
            startPage: 1,
            
            // maximum visible pages
            visiblePages: 5,
            
            initiateStartPageClick: true,
            
            // template for pagination links
            href: false,
            
            // variable name in href template for page number
            hrefVariable: '{{number}}',
            
            // Text labels
            first: 'First',
            prev: 'Previous',
            next: 'Next',
            last: 'Last',
            
            // carousel-style pagination
            loop: false,
            
            // callback function
            onPageClick: function (event, page) {
                $('.page-active').removeClass('page-active');
              $('#page'+page).addClass('page-active');

              displayWatchList(page);
            },
            
            // pagination Classes
            paginationClass: 'pagination',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first',
            pageClass: 'page',
            activeClass: 'active',
            disabledClass: 'disabled'
            
            });
    
    };

var displayWatchList = function(page) 
{

    savedMovie = new Array();
    Object.values(localStorage).forEach((value) => 
    {
        savedMovie.push(value);
    });

    // creates pages for amount on content saved to local storage
    var startIndex = 20 * (page - 1);
    var endIndex = 20 * page;
    if (savedMovie.length < endIndex) {
        endIndex = savedMovie.length;
    }
    
    watchListEl.innerHTML = "";

    for (var i = startIndex; i < endIndex; i++) 
    {
        var baseUrl = "https://image.tmdb.org/t/p/w200";

        var loadMovie = JSON.parse(savedMovie[i]);


        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + savedMovie[i].id);

        var savedImg = document.createElement("img");
        savedImg.style.padding = "1px";
        savedImg.style.transition = "0.3s";
        savedImg.src = baseUrl + loadMovie.poster_path;

        popLink.appendChild(savedImg);
        watchListEl.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title";
         watchListEl.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn" + savedMovie[i].id;
         watchListBtn.className = "remove-btn btn-floating halfway-fab waves-effect waves-light red small material-icons";
         watchListBtn.setAttribute("type", "button");
         watchListBtn.setAttribute("value", i);
         watchListBtn.textContent = "remove";
         watchListBtn.onclick = (function() 
         {
            var currentI = i;
            return function() 
            { 
                var movie = JSON.parse(savedMovie[currentI])
                localStorage.removeItem(movie.title)
                displayWatchList(1)
            }
         })();
         watchList.appendChild(watchListBtn);

        // This handler will be executed every time the cursor is moved over a different list item
        watchListEl.addEventListener("mouseover", function (event) 
        {
            // highlight the mouseover target
            event.target.style.opacity = "0.5";
            event.target.style.transition = "0.3s";

            // reset the styles after a short delay
            setTimeout(function () 
            {
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
            window.location.href = "search-results.html?movie-name=" + movieName
    
    
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
