// menu
import { fetchMenuData } from './data.js';

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    const categoryMenu = document.getElementById('category-menu');
    const menuItemsContainer = document.getElementById('menu-item');
    const cartIcon = document.getElementById('cart-icon');
    const modal = document.getElementById('cart-modal');
    const modalItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    let shoppingCart = getCartFromLocalStorage() || [];

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

    function parsePrice(priceString) {
        if (typeof priceString === 'number' && !isNaN(priceString)) {
            return priceString;
        }

        if (typeof priceString !== 'string') {
            console.error('Invalid price string:', priceString);
            return NaN;
        }

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

        const totalPriceElement = createHTMLElement('div', `Prices: ${formattedPrice}`, 'total-price');
        modalItems.appendChild(totalPriceElement);
    }

    function formatCurrency(value, currencyCode) {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 0,
        });

        try {
            return formatter.format(value).replace(/,/g, '');
        } catch (error) {
            console.error('Error formatting currency:', error);
            return value;
        }
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function addModalCloseListeners() {
        window.addEventListener('click', closeModalOnOutsideClick);

        const closeButton = document.getElementById('close-button');
        if (closeButton) {
            closeButton.addEventListener('click', closeCartModal);
        }
    }

    function closeModalOnOutsideClick(event) {
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

    async function filterMenu(category) {
        menuItemsContainer.innerHTML = '';

        try {
            const menuList = await fetchMenuData.fetchData();
            const categoryItems = menuList.filter(item => item.category === category) || [];

            categoryItems.forEach(item => {
                const cardElement = createMenuCard(item);
                menuItemsContainer.appendChild(cardElement);
            });
        } catch (error) {
            console.error('Error fetching or processing menu data:', error);
        }
    }

    function createMenuCard(item) {
        const cardElement = createHTMLElement('div', '', '', ['menu-card']);
        cardElement.dataset.id = item.id;
        cardElement.dataset.title = item.title;
        cardElement.dataset.price = item.price;

        const imgElement = createImageElement(item.img, item.title);
        const h2Element = createHeadingElement(item.title);
        const priceElement = createPriceElement(item.price);
        const orderButton = createOrderButton(item);

        cardElement.appendChild(imgElement);
        cardElement.appendChild(h2Element);
        cardElement.appendChild(priceElement);
        cardElement.appendChild(orderButton);

        return cardElement;
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
        const formattedPrice = formatCurrency(price, 'IDR');
        const priceElement = createHTMLElement('div', `${formattedPrice}`, 'menu-price');
        return priceElement;
    }

    function createOrderButton(item) {
        const orderButton = createHTMLElement('button', 'Order Now', '', ['order-button']);
        orderButton.addEventListener('click', () => orderNow(item));
        return orderButton;
    }

    function orderNow(item) {
        const index = shoppingCart.findIndex(cartItem => cartItem.id === item.id);

        if (index !== -1) {
            shoppingCart[index].quantity++;
        } else {
            shoppingCart.push({ id: item.id, img: item.img, title: item.title, price: item.price, quantity: 1 });
        }

        updateCartDisplay();

        if (modal.style.display === 'block') {
            openCartModal();
        }
    }

    function createCartItem(item) {
        const listItem = createHTMLElement('li', '', 'cart-item');
        const itemImage = createImageElement(item.img, item.title);
        const itemTitle = createHeadingElement(item.title);
        const itemPrice = createPriceElement(item.price);
        const btnCountContainer = createHTMLElement('div', '', 'btn-count-container');
        const quantitySpan = createHTMLElement('span', item.quantity, 'total-item-count');

        const decrementButton = createButton('-', () => decrementCartItem(item), 'delete-menu');
        const incrementButton = createButton('+', () => incrementCartItem(item), 'add-menu');

        btnCountContainer.appendChild(decrementButton);
        btnCountContainer.appendChild(quantitySpan);
        btnCountContainer.appendChild(incrementButton);

        listItem.appendChild(itemImage);
        listItem.appendChild(itemTitle);
        listItem.appendChild(itemPrice);
        listItem.appendChild(btnCountContainer);

        return listItem;
    }

    function createButton(text, clickHandler, id) {
        const button = createHTMLElement('button', text);
        button.addEventListener('click', clickHandler);
        if (id) button.id = id;
        return button;
    }

    function decrementCartItem(item) {
        const index = shoppingCart.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1 && shoppingCart[index].quantity > 1) {
            shoppingCart[index].quantity--;
            updateCartDisplay();
            if (modal.style.display === 'block') {
                openCartModal();
            }
        } else if (index !== -1 && shoppingCart[index].quantity === 1) {
            shoppingCart.splice(index, 1);
            updateCartDisplay();
            if (modal.style.display === 'block') {
                openCartModal();
            }
        }
    }

    function incrementCartItem(item) {
        const index = shoppingCart.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
            shoppingCart[index].quantity++;
            updateCartDisplay();
            if (modal.style.display === 'block') {
                openCartModal();
            }
        }
    }

    function createHTMLElement(tag, text = '', id = '', classes = []) {
        const element = document.createElement(tag);
        element.textContent = text;
        if (id) element.id = id;
        if (classes.length > 0) element.classList.add(...classes);
        return element;
    }

    categoryMenu.addEventListener('click', handleCategoryClick);
    cartIcon.addEventListener('click', openCartModal);

    filterMenu('coffee');
    updateCartDisplay();
}
