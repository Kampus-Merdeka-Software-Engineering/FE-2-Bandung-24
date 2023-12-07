// API url for transaction
import { addTransaction } from './api/transactionData.js';

// submit button event listener
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', submitTransaction);
    } else {
        console.error('Submit button not found.');
    }

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
        console.error('Server Response:', response);

        localStorage.removeItem('shoppingCart');

        alert('Transaction successful!');
    }

    // handle error function
    function handleError(error) {
        console.error('Error:', error.message);
        alert('Error submitting transaction. Please try again.');
    }
});
