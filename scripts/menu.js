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
const previewContainer = document.querySelector('.product-preview');
const previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.menu .menucard').forEach(menucard => {
    menucard.onclick = (e) => {
        previewContainer.style.display = 'flex';
        const name = menucard.getAttribute('data-name');
        previewBox.forEach(preview => {
            const target = preview.getAttribute('data-target');
            if (name == target) {
                preview.classList.add('active');
            };
        });
        e.preventDefault();
    };
});

previewBox.forEach(close => {
    close.querySelector('.fa-circle-xmark').onclick = (e) => {
        close.classList.remove('active');
        previewContainer.style.display = 'none';
        e.preventDefault();
    };
});

// close diluar preview box
window.onclick = (e) => {
    if (e.target === previewContainer) {
        previewContainer.style.display = 'none';
    }
}

// function untuk beralih menu-category
function loadContent(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("menu").innerHTML = xhr.responseText;
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            document.getElementsById("menu").innerHTML = "Gagal memuat menu.";
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

// shopping cart
let previewCard = document.querySelector('.preview');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let list = document.querySelector('.menu');
let listCard = document.querySelector('.shopping-cart');
let body = document.querySelector('body');

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: 'cappucino.jpg',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: 'cappucino.jpg',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: 'cappucino.jpg',
        price: 220000
    },
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <section class="menu" id="menu">
                <div class="menucard" data-name="m-1">
                    <img src="./public/assets/img/kopi/menu-coffee/${value, image}">
                    <h2>${value.name}</h2>
                    <div class="price">${value.price.toLocaleString()}</div>
                </div
            </section>
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}