# Movie-Hunt
## Description 
- Movie-Hunt is a movie based web application designed for movie lovers. Movie-Hunt gives the user the ability to search through thousands of movies. This web apllication was a group project worked on by me, Reagan Joseph, and three others: Dalton Morrel, Adrian Mike, and Khyra Everette. 
## Sources & Technologies
 APIs: An API key is required for call to be successfull. 
- TMBD API: https://developers.themoviedb.org/3/getting-started
The Movie Database API was used to fetch all of our data on individual movies as well as clusters of movies when it came to the most popular and new releases for example. 

- Giphy API: https://developers.giphy.com/docs/api#quick-start-guide
Giphy API was used to call our id from for our custom logo. 

 CSS
- Materialize: https://materializecss.com/
The HTML structure and majority of the CSS was done through the framwork of Materlize. However, some adjustment were made in the CSS to fit our needs. The cdn for materlize can we found in the head of all html files before our custm stylesheet. 

Functionality
- jQuery: https://api.jquery.com/
Mainly the functionality that was written using jQuery were the event listeners for the pagination on click. It was deemed more simplier writing $(this) when targeting a click and having it perform an action. It was cleaner and provided less code. The functionality for localStorage was also done with jQuery as well. 

- JavaScript
Majority of the code for Movie-Hunt was written in JavaScript

- moment.js: https://momentjs.com/docs/
Moment.js was used mainly to display newly released movies. It helped with filtering the the date ranges for the releases of the movies. 



## Process/Brief Description of the focal points

## Front End: Adrian Mike & Khyra Everette
After gathering the APIs to be used the next step was to set up the structure of the index.html. This is where materalize came in give us a jump to the structure. Figuring out the placing of the rows and reading up on documentation as to what the sizing the columns should be. Throughtout the project, more html files were added and they took upon the same strcutre as well. Making Movie-Hunt mobile responsive was a combination of classes givien to us through materalize and the usage of media queries in CSS stylesheet. 

## Back End: Reagan Joseph & Dalton Morrel

- Start: The process for the functionality of Movie-Hunt started with fetching The Movie Database API call. After that we would use the data do target what we needed and have it dynamically append to the page throught the div with the unique id. That basic part was duplicated for displaying the movies on all our our htmls. 

- MovieIDs: To get the specific data for a movie, we passed the parameter of id and concatenate the id in the api URL. We then used the data as a parameter to display the information we wanted on the page. With our movie-info page, when a movie is clicked and the information pages pops up, functionality we creating a query string using windows location.search and from there we would create a new url that targeting the parameters. We would only take the movie id form the parameter and place that into a variable. That variable with the new url was then used as a parameter for our function call onload. That is how we passed the movie id from one html to the movie-info html. 

- Local Storage: Our local storgae is activated on a click from the button appened to the movie posters. What this does is sets the target movie into local storage if it has a watch-btn class and if it has a remove class then it will remove local storage on click. 


## Screenshots

- An image of the homepage. 
![Image](/assets/images/Screenshot-home.jpg)

- An image of the the results reponse after a search. Notice the pagination fits appropiatley to do the total pages of results for that movie search. The plus buttons on the images indicate that the movie can be added into your watch-list. 

![Image](/assets/images/Screenshot-searches.jpg)

- An image of the watch-list page. Notice the minus signs on the movie posters indicating a user can only remove that movie from their watch-list. 

![Image](/assets/images/Screenshot-watchlist.jpg)


## Deployed Link: https://reaganjoseph26.github.io/Movie-Hunt/ 
## Movie-Hunt Repo: https://github.com/reaganjoseph26/Movie-Hunt.git




