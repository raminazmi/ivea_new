import axios from 'axios';

// Set up axios defaults
window.axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Axios automatically checks for XSRF-TOKEN cookie and includes it in X-XSRF-TOKEN header
// This is the recommended approach according to Inertia.js documentation