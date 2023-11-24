// navbar function
const menu = document.querySelector('#menu-bars');
const navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

// navbar highlight function
window.addEventListener("load", function () {
    const currentUrl = window.location.href;
    const navItems = document.querySelectorAll(".navbar a");

    for (const navItem of navItems) {
        navItem.classList.remove("active");
    }

    for (const navItem of navItems) {
        if (navItem.href === currentUrl) {
            navItem.classList.add("active");
        }
    }
});

// scroll indicator function
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const scrollIndicator = document.getElementById('scrollIndicator');

    function updateScrollIndicator() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        const contentHeight = document.body.clientHeight - window.innerHeight;

        const scrollPercentage = (scrollPosition / contentHeight) * 100;
        const indicatorWidth = (scrollPercentage * headerHeight) / 100;

        scrollIndicator.style.width = `${indicatorWidth}rem`;
    }

    window.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);

    updateScrollIndicator();
});

window.addEventListener("hashchange", function () {
    const currentUrl = window.location.href;
    const navItems = document.querySelectorAll(".navbar a");

    for (const navItem of navItems) {
        navItem.classList.remove("active");
    }

    for (const navItem of navItems) {
        if (navItem.href === currentUrl) {
            navItem.classList.add("active");
        }
    }
});

// dark mode function
function darkMode() {
    const body = document.body;
    const darkBtn = document.getElementById('dark-btn');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        darkBtn.classList.remove('active');
    } else {
        body.classList.add('dark-mode');
        darkBtn.classList.add('active');
    }
}

// members slider function
let userTexts = document.getElementsByClassName("user-text");
let userPics = document.getElementsByClassName("user-pic");
let scrollContainer = document.querySelector(".scroll-container");

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

    let scrollOffset = userPics[i].offsetLeft - (scrollContainer.offsetWidth - userPics[i].offsetWidth) / 2;
    scrollContainer.scroll({
        left: scrollOffset,
        behavior: 'smooth'
    });
}