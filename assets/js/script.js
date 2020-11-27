var youTubeKey = config.YT_KEY
console.log(youTubeKey)

var apiUrl = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=" + youTubeKey
fetch (apiUrl).then(function (response) {
    response.json().then(function (data) {
        console.log(data)
    })
});
