import 'whatwg-fetch';

class HttpService {
    getProducts = async () => {
        // Return the promise created by fetch
        try {
            const response = await fetch('http://localhost:3004/product');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error.message);
            throw error; // Re-throw the error for further handling
        }
    }
}

export default HttpService;
