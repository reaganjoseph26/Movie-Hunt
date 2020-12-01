var popMovie = document.querySelector("#most-popular");
// var mostPopularImg = document.querySelector("#most-popular-img");
// var pagesEl = document.querySelector(".page-btn")

window.onload = function WindowLoad() {
    getMostPopular(1);
}
var getMostPopular = function (page) {
    var tmdbApiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=a01b6212f3bbba093d5cbc6d345df704&language=en-US&page=" + page
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                displayMostPopular(data);
            });
        }
    });
};

// As of right now to get an img to show you have to call the getMostPopular() in the console

var displayMostPopular = function (data) {
    popMovie.innerHTML = "";

    for (var i = 0; i < 20; i++) {
        var baseUrl = "https://image.tmdb.org/t/p/w200"

        var popLink = document.createElement("a");
        popLink.setAttribute('href', 'movie-info.html?id=' + data.results[i].id)


        var popImg = document.createElement("img");
        popImg.style.padding = "1px"
        popImg.style.transition = "0.3s"
        popImg.src = baseUrl + data.results[i].poster_path;

        popLink.appendChild(popImg);
        popMovie.appendChild(popLink);

         // Create span to put watch list btn
         var watchList = document.createElement("span");
         watchList.id = "btn-span";
         watchList.className = "card-title"
         popMovie.appendChild(watchList);
         
         // Create button for watch list
         var watchListBtn = document.createElement("button");
         watchListBtn.id = "watch-list-btn";
         watchListBtn.className = "btn-floating halfway-fab waves-effect waves-light red";
         watchListBtn.setAttribute("type", "button");
         watchListBtn.textContent = "Watch";
         watchList.appendChild(watchListBtn);

        // This handler will be executed every time the cursor is moved over a different list item
        popImg.addEventListener("mouseover", function (event) {
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
        getMostPopular($(this).text());
        console.log($(this).text());
    })

// var pagination = function() {
//     console.log()
//     // var popularpageTwo = document.createElement("div")
// }

// pagination()

