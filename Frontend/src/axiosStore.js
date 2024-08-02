// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

export const loginPage = async (email, password) => {
    try {
        console.log('Logging in with:', email, password); // Debug log
        const response = await api.post('/auth/login', { email, password });

        if (response.status === 200 && response.data.success) {
            // Successful login
            return response.data;
        } else {
            // Handle unsuccessful login
            throw new Error(response.data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error); // Debug log
        // Re-throw the error with a custom message
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const getPlayerDetails = async (accessToken, refreshToken) => {
    try {
        console.log('Fetching player details with tokens'); // Debug log
        const response = await api.post('/players/details', { accessToken, refreshToken });

        if (response.status === 200 && response.data.success) {
            // Successful retrieval of player details
            return response.data;
        } else {
            // Handle unsuccessful retrieval
            throw new Error(response.data.message || 'Failed to retrieve player details');
        }
    } catch (error) {
        console.error('Error fetching player details:', error); // Debug log
        // Re-throw the error with a custom message
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};


export default api;
