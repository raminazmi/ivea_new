import axios from 'axios';

// إعداد CSRF token
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

// إعداد axios كـ global
window.axios = axios;

// إعداد defaults
axios.defaults.withCredentials = true;