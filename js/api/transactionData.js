// transaction API url
const transactionUrl = 'https://api.sekopi.biz.id/v1/transaction';

async function handleResponse(response) {
    try {
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error handling response:', error.message);
        throw error;
    }
}

// fungsi create transaction
async function addTransaction(transactionData) {
    try {
        const response = await fetch(transactionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...transactionData,
                orders: JSON.stringify(transactionData.orders),
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await handleResponse(response);
        console.info('Transaction added successfully:', data);
        return data;
    } catch (error) {
        console.error('Error adding transaction:', error.message);
        throw error;
    }
}

export { addTransaction };
