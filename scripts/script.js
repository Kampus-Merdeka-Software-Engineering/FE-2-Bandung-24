// navbar function
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

// swiper js function
var swiper = new Swiper(".home-slider", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
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