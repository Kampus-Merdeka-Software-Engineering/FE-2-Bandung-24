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

// hero slider function
const swiper = new Swiper(".home-slider", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
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

// fav menu slider function
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .fa-solid");
    const sliderScrollbar = document.querySelector(".fav-menu-card .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

//

// const mb = document.querySelector('.navbar');

// document.addEventListener('click', function (e) {

//     if (!mb.contains(e.target) && !menu.contains(e.target)) {
//         menu.classList.remove('active');
//     }
// })



