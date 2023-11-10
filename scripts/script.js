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