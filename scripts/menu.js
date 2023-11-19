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
let previewContainer = document.querySelector('.product-preview');
let previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.menu .menucard').forEach(menucard => {
    menucard.onclick = () => {
        previewContainer.style.display = 'flex';
        let name = menucard.getAttribute('data-name');
        previewBox.forEach(preview => {
            let target = preview.getAttribute('data-target');
            if (name == target) {
                preview.classList.add('active');
            };
        });
    };
});

previewBox.forEach(close => {
    close.querySelector('.fa-circle-xmark').onclick = () => {
        close.classList.remove('active');
        previewContainer.style.display = 'none';
    }
})
