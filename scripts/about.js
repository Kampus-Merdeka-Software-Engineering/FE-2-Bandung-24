// members slider function
let userTexts = document.getElementsByClassName("user-text");
let userPics = document.getElementsByClassName("user-pic");

function showReview() {
    for (userPic of userPics) {
        userPic.classList.remove("active-pic");
    }
    for (userText of userTexts) {
        userText.classList.remove("active-text");
    }
    let i = Array.from(userPics).indexOf(event.target);

    userPics[i].classList.add("active-pic");
    userTexts[i].classList.add("active-text");
}

