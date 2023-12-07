// API url for transaction
import { addTransaction } from './api/transactionData.js';

const totalPriceElement = document.getElementById('total-price');
const totalItemsElement = document.getElementById('total-items');
const orderedItemsContainer = document.getElementById('order-items');
const submitButton = document.getElementById('submitButton');

// inisialisasi transaksi
async function initializeTransaction() {
    try {
        const shoppingCart = getCartFromLocalStorage();

        if (shoppingCart.length > 0) {
            displayMenu(shoppingCart);
            displayTotalItemsAndPrice(shoppingCart);
        } else {
            alert('Keranjang belanja kosong. Anda akan dialihkan ke halaman menu.');
            window.location.href = 'menu.html';
        }
    } catch (error) {
        console.error('Error initializing transaction:', error);
    }
}

// submit button event listener
if (submitButton) {
    submitButton.addEventListener('click', submitTransaction);
} else {
    console.error('Submit button not found.');
}

// fungsi submit transaction
async function submitTransaction() {
    try {
        const nomorMeja = getValue('nomorMeja');
        const namaPemesan = getValue('namaPemesan');
        const statusPembayaran = getValue('statusPembayaran');
        const cartData = getCartFromLocalStorage();
        const orders = cartData.map(item => ({
            qty: item.quantity,
            name: item.title,
            menu_id: item.id
        }));

        const transactionData = {
            nomor_meja: nomorMeja,
            nama_pemesan: namaPemesan,
            status_pembayaran: statusPembayaran,
            orders: orders,
        };

        const response = await addTransaction(transactionData);

        handleServerResponse(response);

    } catch (error) {
        handleError(error);
    }
}

// helper functions
function getValue(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Element with ID '${elementId}' not found.`);
    }
    return element.value;
}

// get cart data from local storage
function getCartFromLocalStorage() {
    const cartData = localStorage.getItem('shoppingCart');
    try {
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error parsing shoppingCart data:', error);
        return [];
    }
}

// handle server response
function handleServerResponse(response) {
    console.log('Server Response:', response);

    // clear local storage after successful transaction
    localStorage.removeItem('shoppingCart');

    alert('Transaction successful!');
}

// handle error function
function handleError(error) {
    console.error('Error:', error.message);
    alert('Error submitting transaction. Please try again.');
}

// kalkulasi total quantity
function calculateTotalQuantity(cartItems) {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

// kalkulasi total price
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

// tampilkan total price
function displayTotalPrice(totalPrice) {
    const formattedPrice = formatCurrency(totalPrice, 'IDR');
    updateTotalPriceElement(formattedPrice);
}

// update elemen total price
function updateTotalPriceElement(formattedPrice) {
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total Price: ${formattedPrice}`;
    } else {
        console.error('Total price element not found.');
    }
}

// parse harga
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

// tampilkan total items dan total price
function displayTotalItemsAndPrice(cartItems) {
    if (!totalItemsElement || !totalPriceElement) {
        console.error('Total items or total price element not found.');
        return;
    }

    if (!cartItems || cartItems.length === 0) {
        totalItemsElement.textContent = 'Total Items: 0';
        totalPriceElement.textContent = 'Total Price: Rp 0';

        alert('Keranjang belanja kosong. Silakan tambahkan item ke keranjang belanja Anda.');
        window.location.href = 'menu.html';
    } else {
        const totalItems = calculateTotalQuantity(cartItems);
        const totalPrice = calculateTotalPrice(cartItems);

        totalItemsElement.textContent = `Total Items: ${totalItems}`;
        displayTotalPrice(totalPrice);
    }
}

// tampilkan menu
function displayMenu(menuItems) {
    if (orderedItemsContainer && menuItems.length > 0) {
        const table = document.createElement('table');
        table.classList.add('order-table');

        // tambahkan header tabel
        const headers = ['No', 'Item', 'Quantity', 'Price'];
        const headerRow = table.insertRow(0);
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        // tambahkan baris untuk setiap item
        menuItems.forEach((item, index) => {
            const row = table.insertRow(-1);
            const cells = [index + 1, item.title, item.quantity, formatCurrency(item.price, 'IDR')];

            cells.forEach((cellData, cellIndex) => {
                const cell = row.insertCell(cellIndex);
                cell.textContent = cellData;
            });
        });

        // tambahkan total pada bagian kaki tabel
        const totalRow = table.createTFoot().insertRow(0);
        const totalCells = ['💸', 'Total', calculateTotalQuantity(menuItems), formatCurrency(calculateTotalPrice(menuItems), 'IDR')];

        totalCells.forEach((cellData, cellIndex) => {
            const cell = totalRow.insertCell(cellIndex);
            cell.innerHTML = cellData;
        });

        // tampilkan tabel di dalam orderedItemsContainer
        orderedItemsContainer.innerHTML = '';
        orderedItemsContainer.appendChild(table);
    }
}

// tangani item yang tidak valid
function handleInvalidItem(item) {
    console.error('Invalid item:', item);
}

// format mata uang
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

document.addEventListener('DOMContentLoaded', initializeTransaction);
