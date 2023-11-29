// API url
export const fetchMenuData = {
    apiUrl: 'https://api.jsonbin.io/v3/b/6561f0c954105e766fd511cf/latest',
    apiKey: '$2a$10$IPPZLE/nU/Bo8LLs7limteP08mfk5X4ye2SDFIx3yeYBoTYsfkDka',

    async fetchData() {
        try {
            const response = await fetch(this.apiUrl, { headers: { 'X-Master-Key': this.apiKey } });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { record } = await response.json();
            return record;
        } catch (error) {
            console.error('Error fetching menu data:', error);
            throw error;
        }
    },
};