//login();
// const login = () => {
//     console.log('login')
// }

const userInput = document.getElementById("userInput");
const keyInput = document.getElementById("keyInput");
const signUpText = document.getElementById("sign-up-text");

function getUser() {
  currentUsers = localStorage.getItem("user");

  if (currentUsers == null) {
    return false;
  } else {
    console.log(currentUsers, typeof JSON.parse(currentUsers));

    let foundUser = JSON.parse(currentUsers).find(
      (user) => user.username === userInput.value
    );

    if (!foundUser) {
      return false;
    } else {
      return true;
    }
  }
}

function setUser() {
  let users = JSON.parse(localStorage.getItem("user"));
  console.log(users, users);

  userObj = { username: userInput, key: keyInput };

  //no users saved in local storage
  if (users == null) users = [];

  users.push({ username: userInput.value, key: keyInput.value });
  localStorage.setItem("user", JSON.stringify(users));
}

function login() {
  //   console.log(userInput.value);
  //   console.log(keyInput.value);

  let existingUser = getUser();
  console.log(existingUser);

  if (!existingUser) {
    //setUser();
  } else {
    signUpText.textContent =
      "An account with this email already exists. Please sign in.";
    signUpText.style.color = "black";
    signUpText.style.fontWeight = "bolder";
  }
}

function signUp(username, key) {
  //check to see if user credentials already exist
  let currentUsers = [];
  currentUsers.push(localStorage.getItem("users"));

  //credentials do not exist so save information
  userObj = { username: userInput, key: keyInput };
  localStorage.setItem("user", JSON.stringify(userObj));
}

//set local references
//    scoresArray.push(scoresObj);
//     localStorage.setItem('HighScores', JSON.stringify(scoresArray));

//get local references

// var tableEl = document.querySelector("#row-scores");
// var nameSection = document.querySelector("#nameTable");
// var scoreSection = document.querySelector("#scoreTable");
// let prevHighScores = []

// function getLocalStorage() {

//     prevHighScores.push(JSON.parse(localStorage.getItem("HighScores")));
//     console.log(prevHighScores)

//     return prevHighScores;
// }

// const listScores = function (myObject) {
//     console.log(myObject)

//     for (var i = 0; i < myObject[0].length; i++) {

//         console.log(myObject[0].length)
//         console.log(myObject[0][i])

//         var addScore = document.createElement("tr");
//         addScore.className = "row-scores";
//         nameSection.innerHTML += `${myObject[0][i].name} <br>`;
//         scoreSection.innerHTML += `${myObject[0][i].score} <br>`;
//         tableEl.appendChild(addScore);
//     }
// };

// var clearStorage = function () {
//     localStorage.clear();
//     location.reload();
//     return false;
// }

// document.getElementById("clear-storage").addEventListener("click", clearStorage);

// listScores(getLocalStorage());
