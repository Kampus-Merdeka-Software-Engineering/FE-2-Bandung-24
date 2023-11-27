// API
const apiUrl = 'https://api.jsonbin.io/v3/b/6561f0c954105e766fd511cf/latest';
const apiKey = '$2a$10$IPPZLE/nU/Bo8LLs7limteP08mfk5X4ye2SDFIx3yeYBoTYsfkDka';

// state
let shoppingCart = getCartFromLocalStorage() || [];

// DOM elements
const menu = document.querySelector('#menu-bars');
const navbar = document.querySelector('.navbar');
const darkBtn = document.getElementById('dark-btn');
const categoryMenu = document.getElementById('category-menu');
const menuItemsContainer = document.getElementById('menu-item');
const cartIcon = document.getElementById('cart-icon');
const modal = document.getElementById('cart-modal');
const modalItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');

// event listeners
menu.addEventListener('click', toggleMenu);
window.addEventListener('load', highlightNavItem);
window.addEventListener('hashchange', highlightNavItem);
window.addEventListener('scroll', updateScrollIndicator);
window.addEventListener('resize', updateScrollIndicator);
categoryMenu.addEventListener('click', handleCategoryClick);
cartIcon.addEventListener('click', openCartModal);
darkBtn.addEventListener('click', toggleDarkMode);

// initialization
filterMenu('coffee');
updateCartDisplay();

// functions
function toggleMenu() {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

function highlightNavItem() {
    const currentUrl = window.location.href;
    const navItems = document.querySelectorAll('.navbar a');

    navItems.forEach(navItem => {
        navItem.classList.toggle('active', navItem.href === currentUrl);
    });
}

function toggleDarkMode() {
    const body = document.body;

    body.classList.toggle('dark-mode');
    darkBtn.classList.toggle('active', body.classList.contains('dark-mode'));
}

function updateScrollIndicator() {
    const scrollPosition = window.scrollY;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const contentHeight = document.body.clientHeight - window.innerHeight;

    const scrollPercentage = (scrollPosition / contentHeight) * 100;
    const indicatorWidth = (scrollPercentage * headerHeight) / 100;

    scrollIndicator.style.width = `${indicatorWidth}rem`;
}

function openCartModal() {
    modalItems.innerHTML = '';
    shoppingCart.forEach(item => modalItems.appendChild(createCartItem(item)));
    displayTotalItems();
    displayTotalPrice();
    showModal();
    addModalCloseListeners();
}

function displayTotalItems() {
    const totalItemsElement = createHTMLElement('div', `Items: ${calculateTotalQuantity(shoppingCart)}`, 'total-items');
    modalItems.appendChild(totalItemsElement);
}

function displayTotalPrice() {
    const totalPrice = calculateTotalPrice(shoppingCart);

    if (!isNaN(totalPrice)) {
        const formattedPrice = formatCurrency(totalPrice, 'IDR');
        updateTotalPriceElement(formattedPrice);
    } else {
        console.error('Invalid total price:', totalPrice);
    }
}

function updateTotalPriceElement(formattedPrice) {
    const existingTotalPriceElement = document.getElementById('total-price');
    if (existingTotalPriceElement) {
        existingTotalPriceElement.remove();
    }

    const totalPriceElement = createHTMLElement('div', `Price: ${formattedPrice}`, 'total-price');
    modalItems.appendChild(totalPriceElement);
}

function showModal() {
    modal.style.display = 'block';
}

function addModalCloseListeners() {
    window.addEventListener('click', closeModalIfClickedOutside);
    const closeButton = document.getElementById('close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeCartModal);
    }
}

function closeModalIfClickedOutside(event) {
    if (event.target === modal) {
        closeCartModal();
    }
}

function closeCartModal() {
    modal.style.display = 'none';
}

function handleCategoryClick(event) {
    const clickedElement = event.target.closest('.category-link');
    if (clickedElement) {
        const category = clickedElement.dataset.category;
        updateCategoryLinks(category);
        filterMenu(category);
    }
}

function updateCategoryLinks(selectedCategory) {
    document.querySelectorAll('.category-link').forEach(link => link.classList.remove('active'));
    const selectedLink = document.querySelector(`[data-category="${selectedCategory}"]`);
    if (selectedLink) {
        selectedLink.classList.add('active');
    }
}

function filterMenu(category) {
    menuItemsContainer.innerHTML = '';
    fetchMenuData(apiUrl, apiKey)
        .then(data => {
            const categoryItems = data.record[category] || [];
            categoryItems.forEach(item => {
                const cardElement = createMenuCard(item);
                menuItemsContainer.appendChild(cardElement);
            });
        })
        .catch(error => console.error('Error fetching menu data:', error));
}

function createMenuCard(item) {
    const cardElement = createHTMLElement('div', '', '', ['menu-card']);
    cardElement.dataset.id = item.id;
    cardElement.dataset.name = item.name;
    cardElement.dataset.price = item.price;

    const imgElement = createImageElement(item.img, item.name);
    const h2Element = createHeadingElement(item.name);
    const priceElement = createPriceElement(item.price);
    const orderButton = createOrderButton(item);

    cardElement.appendChild(imgElement);
    cardElement.appendChild(h2Element);
    cardElement.appendChild(priceElement);
    cardElement.appendChild(orderButton);

    return cardElement;
}

function createCartItem(item) {
    const listItem = createHTMLElement('li', '', 'cart-item');
    const itemImage = createImageElement(item.img, item.name);
    const itemName = createHeadingElement(item.name);
    const itemPrice = createPriceElement(item.price);
    const btnCountContainer = createHTMLElement('div', '', 'btn-count-container');
    const quantitySpan = createHTMLElement('span', item.quantity, 'total-item-count');

    const decrementButton = createButton('-', () => decrementCartItem(item), 'delete-menu');
    const incrementButton = createButton('+', () => incrementCartItem(item), 'add-menu');

    btnCountContainer.appendChild(decrementButton);
    btnCountContainer.appendChild(quantitySpan);
    btnCountContainer.appendChild(incrementButton);

    listItem.appendChild(itemImage);
    listItem.appendChild(itemName);
    listItem.appendChild(itemPrice);
    listItem.appendChild(btnCountContainer);

    return listItem;
}

function decrementCartItem(item) {
    const index = shoppingCart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1 && shoppingCart[index].quantity > 1) {
        shoppingCart[index].quantity--;
        updateCartDisplay();
        openCartModal();
    } else if (index !== -1 && shoppingCart[index].quantity === 1) {
        shoppingCart.splice(index, 1);
        updateCartDisplay();
        openCartModal();
    }
}

function incrementCartItem(item) {
    const index = shoppingCart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        shoppingCart[index].quantity++;
        updateCartDisplay();
        openCartModal();
    }
}

function updateCartDisplay() {
    updateCartCount();
    saveCartToLocalStorage();
}

function updateCartCount() {
    cartCount.textContent = calculateTotalQuantity(shoppingCart);
    cartCount.style.display = shoppingCart.length > 0 ? 'inline' : 'none';
}

function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => {
        const itemPrice = parsePrice(item.price);
        const itemQuantity = parseInt(item.quantity);

        if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
            return total + itemPrice * itemQuantity;
        } else {
            handleInvalidItem(item);
            return total;
        }
    }, 0);
}

function handleInvalidItem(item) {
    console.error('Invalid price or quantity:', item);
}

function parsePrice(priceString) {
    const cleanedPrice = priceString.replace(/[^\d.,]/g, '');
    const dotFormattedPrice = cleanedPrice.replace(/,/g, '.');
    return parseFloat(dotFormattedPrice);
}

function calculateTotalQuantity(cartItems) {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

function getCartFromLocalStorage() {
    const cartData = localStorage.getItem('shoppingCart');
    return cartData ? JSON.parse(cartData) : null;
}

function createImageElement(src, alt) {
    const imgElement = createHTMLElement('img');
    imgElement.src = src;
    imgElement.alt = alt;
    return imgElement;
}

function createHeadingElement(text) {
    const h2Element = createHTMLElement('h2', text);
    return h2Element;
}

function createPriceElement(price) {
    const priceElement = createHTMLElement('div', price, 'menu-price');
    return priceElement;
}

function createOrderButton(item) {
    const orderButton = createHTMLElement('button', 'Order Now', '', ['order-button']);
    orderButton.addEventListener('click', () => orderNow(item));
    return orderButton;
}

function fetchMenuData(url, key) {
    return fetch(url, {
        headers: { 'X-Master-Key': key }
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching menu data:', error);
            throw error;
        });
}

function orderNow(item) {
    const index = shoppingCart.findIndex(cartItem => cartItem.id === item.id);

    if (index !== -1) {
        shoppingCart[index].quantity++;
    } else {
        shoppingCart.push({ id: item.id, img: item.img, name: item.name, price: item.price, quantity: 1 });
    }

    updateCartDisplay();
    openCartModal();
}

function createHTMLElement(tag, text = '', id = '', classes = []) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (id) element.id = id;
    if (classes.length > 0) element.classList.add(...classes);
    return element;
}

function createButton(text, clickHandler, id) {
    const button = createHTMLElement('button', text);
    button.addEventListener('click', clickHandler);
    if (id) button.id = id;
    return button;
}

function formatCurrency(value, currencyCode) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 3,
    });

    try {
        return formatter.format(value);
    } catch (error) {
        console.error('Error formatting currency:', error);
        return value;
    }
}
