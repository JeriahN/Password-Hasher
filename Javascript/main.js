let url;
let websiteName;
let username;
let firstNumberOfPassword;
let secondNumberOfPassword;

// Create password from url values http://127.0.0.1:5500/index.html?websiteName=&name=&firstNumberOfPassword=&secondNumberOfPassword=
function urlValidity() {
  try {
    url = new URL(window.location.href);
    websiteName = url.searchParams.get("websiteName");
    username = url.searchParams.get("name");
    firstNumberOfPassword = url.searchParams.get("firstNumberOfPassword");
    secondNumberOfPassword = url.searchParams.get("secondNumberOfPassword");
    console.log("URL is valid");
    return true;
  } catch (e) {
    console.log("URL is invalid");
    return false;
  }
}

function generatePassword() {
  // Generate Password based on url values
  if (urlValidity(true)) {
    // They website name must be greater than 3 characters, it must also be one word and a string, if there are more than 1 word, combine them, then, grab the first 3 letters of the word and create another variable with shortened name and along with the original name
    if (
      websiteName === null ||
      websiteName === "" ||
      websiteName === undefined ||
      websiteName.length < 3
    ) {
      websiteName = "websiteName";
    }

    if (websiteName.split(" ").length > 1) {
      websiteName = websiteName.split(" ").join("");
    }

    let shortenedWebsiteName = websiteName.substring(0, 3);
    websiteName = shortenedWebsiteName;

    // Name must be a string and one word, if there are more than 1 words, grab the first word
    if (username === null || username === "" || username === undefined) {
      username = "username";
    } else {
      username = username.split(" ")[0];
    }

    // Numbers must only be 2 digits long and must be a real number
    if (
      firstNumberOfPassword === null ||
      firstNumberOfPassword === "" ||
      firstNumberOfPassword === undefined ||
      firstNumberOfPassword.length !== 2 ||
      isNaN(firstNumberOfPassword)
    ) {
      firstNumberOfPassword = 12;
    }

    if (
      secondNumberOfPassword === null ||
      secondNumberOfPassword === "" ||
      secondNumberOfPassword === undefined ||
      secondNumberOfPassword.length !== 2 ||
      isNaN(secondNumberOfPassword)
    ) {
      secondNumberOfPassword = 24;
    }

    // Create a 4 letter hash from the website name and username
    let hash = websiteName.substring(0, 2) + username.substring(0, 2);

    // Log everything combined
    let password =
      websiteName + hash + firstNumberOfPassword + secondNumberOfPassword;

    document.getElementById("generateButton").innerHTML = password;
  } else {
    console.log("Values are invalid, please try again");
  }
}

// If the website url contains a ? run the generatePassword function
if (window.location.href.indexOf("?") > -1) {
  generatePassword();
}
