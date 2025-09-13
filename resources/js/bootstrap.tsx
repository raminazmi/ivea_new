import axios from 'axios';

// Get CSRF token from meta tag
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

// Set up axios defaults
window.axios = axios;
axios.defaults.withCredentials = true;

// Add request interceptor to ensure CSRF token is always included
axios.interceptors.request.use(
    (config) => {
        // Get fresh CSRF token for each request
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle CSRF token mismatch
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 419) {
            // CSRF token mismatch - try to get a fresh token first
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (csrfToken) {
                // Update the token and retry the request
                axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
                console.warn('CSRF token updated, please retry your request');
            } else {
                // If no token available, reload the page
                console.error('No CSRF token available, reloading page');
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);