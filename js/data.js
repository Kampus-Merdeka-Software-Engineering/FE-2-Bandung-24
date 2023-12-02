// API url
export const fetchMenuData = {
    apiUrl: 'https://www.sekopi.biz.id/api/v1/menu',

    async fetchData() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching menu data:', error);
            throw error;
        }
    },
};
