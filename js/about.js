// members slider
const userTexts = document.querySelectorAll(".user-text");
const userPics = document.querySelectorAll(".user-pic");
const scrollContainer = document.querySelector(".scroll-container");

// fungsi untuk menampilkan review member
function showReview(event) {
    userPics.forEach(pic => pic.classList.remove("active-pic"));
    userTexts.forEach(text => text.classList.remove("active-text"));

    const targetIndex = Array.from(userPics).indexOf(event.target);
    userPics[targetIndex].classList.add("active-pic");
    userTexts[targetIndex].classList.add("active-text");

    const scrollOffset = userPics[targetIndex].offsetLeft - (scrollContainer.offsetWidth - userPics[targetIndex].offsetWidth) / 2;
    scrollContainer.scroll({
        left: scrollOffset,
        behavior: 'smooth'
    });
}

userPics.forEach(pic => pic.addEventListener('click', showReview));
