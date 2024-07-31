// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }// Your server URL
});

export const loginPage = async (email, password) => {
    try {
        console.log('Logging in with:', email, password); // Debug log
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error); // Debug log
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};


export default api;
