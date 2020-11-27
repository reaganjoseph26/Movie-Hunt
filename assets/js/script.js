var youTubeKey = config.myKey
console.log(youTubeKey)


var apiUrl = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=" + youTubeKey

var tubeData = function () {
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
        })
    });
}

tubeData()
