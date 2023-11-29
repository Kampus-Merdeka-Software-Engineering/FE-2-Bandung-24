// navbar
const menu = document.querySelector('#menu-bars');
const navbar = document.querySelector('.navbar');

menu.addEventListener('click', toggleNavbar);

function toggleNavbar() {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

// navbar highlight
document.addEventListener('DOMContentLoaded', highlightNavbar);

function highlightNavbar() {
    const currentUrl = window.location.href;
    const navItems = document.querySelectorAll('.navbar a');

    navItems.forEach(navItem => navItem.classList.remove('active'));

    navItems.forEach(navItem => {
        if (navItem.href === currentUrl) {
            navItem.classList.add('active');
        }
    });
}

window.addEventListener('hashchange', highlightNavbar);

// scroll indicator
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

// dark mode
const body = document.body;
const darkBtn = document.getElementById('dark-btn');

darkBtn.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    darkBtn.classList.toggle('active');
}
