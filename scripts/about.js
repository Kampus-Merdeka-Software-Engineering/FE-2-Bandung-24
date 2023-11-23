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

// member slider function
let swiperCards = new Swiper(".member-content", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: "#btn-next",
        prevEl: "#btn-prev",
    },

    breakpoints: {
        600: {
            slidesPerView: 1,
        },
        968: {
            slidesPerView: 1,
        },
    },
});
