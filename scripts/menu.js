// toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('.fa-solid.fa-cart-shopping').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

const sc = document.querySelector('#cart-btn');
const mb = document.querySelector('#menu-bars');

document.addEventListener('click', function (e) {
    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }

    if (!mb.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
    }
})

// preview function
// const previewContainer = document.querySelector('.product-preview');
// const previewBox = previewContainer.querySelectorAll('.preview');

// document.querySelectorAll('.menu .menucard').forEach(menucard => {
//     menucard.onclick = (e) => {
//         previewContainer.style.display = 'flex';
//         const name = menucard.getAttribute('data-name');
//         previewBox.forEach(preview => {
//             const target = preview.getAttribute('data-target');
//             if (name == target) {
//                 preview.classList.add('active');
//             };
//         });
//         e.preventDefault();
//     };
// });

// previewBox.forEach(close => {
//     close.querySelector('.fa-circle-xmark').onclick = (e) => {
//         close.classList.remove('active');
//         previewContainer.style.display = 'none';
//         e.preventDefault();
//     };
// });

// close diluar preview box
// window.onclick = (e) => {
//     if (e.target === previewContainer) {
//         previewContainer.style.display = 'none';
//     }
// }

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

        scrollIndicator.style.width = '${indicatorWidth} rem';
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

// menu function
// filter category function
document.addEventListener('DOMContentLoaded', function () {
    const categoryMenu = document.getElementById('category-menu');

    categoryMenu.addEventListener('click', function (event) {
        const clickedElement = event.target.closest('.category-link');

        if (clickedElement) {
            const category = clickedElement.dataset.category;

            document.querySelectorAll('.category-link').forEach(link => link.classList.remove('active'));

            clickedElement.classList.add('active');

            filterMenu(category);
        }
    });

    filterMenu('coffee');

    function filterMenu(category) {
        const menuItemsContainer = document.getElementById('menu-item');
        menuItemsContainer.innerHTML = '';

        // API URL
        const apiUrl = 'https://api.jsonbin.io/v3/b/6561f0c954105e766fd511cf/latest';

        fetch(apiUrl, {
            headers: {
                'X-Master-Key': '$2a$10$IPPZLE/nU/Bo8LLs7limteP08mfk5X4ye2SDFIx3yeYBoTYsfkDka',
            },
        })
            .then(response => response.json())
            .then(data => {
                const categoryItems = data.record[category];
                categoryItems.forEach(item => {
                    const cardElement = createMenuCard(item);
                    menuItemsContainer.appendChild(cardElement);
                });
            })
            .catch(error => console.error('Error fetching menu data:', error));
    }

    // menu item function
    function createMenuCard(item) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('menu-card');
        cardElement.dataset.name = item.id;

        const imgElement = document.createElement('img');
        imgElement.src = item.img;
        imgElement.alt = item.name;

        const h2Element = document.createElement('h2');
        h2Element.textContent = item.name;

        const priceElement = document.createElement('div');
        priceElement.classList.add('menu-price');
        priceElement.textContent = item.price;

        const orderButton = document.createElement('button');
        orderButton.textContent = 'Order Now';
        orderButton.classList.add('order-button');
        orderButton.addEventListener('click', () => orderNow(item));



        cardElement.appendChild(imgElement);
        cardElement.appendChild(h2Element);
        cardElement.appendChild(priceElement);
        cardElement.appendChild(orderButton);

        return cardElement;
    }
});