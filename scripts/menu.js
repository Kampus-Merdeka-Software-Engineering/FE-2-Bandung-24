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
