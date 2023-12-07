// menu API url
const fetchMenuData = {
    menuUrl: 'https://api.sekopi.biz.id/v1/menu',

    // fetch menu data from API
    async fetchData() {
        try {
            const response = await fetch(this.menuUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const { data } = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching menu data:', error.message);
            throw error;
        }
    },
};

export { fetchMenuData };
