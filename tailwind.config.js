// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                'primary-black': '#04151C',
                'primary-yellow': '#FFD974',
                'light-blue': '#DFE6F3',
                'peach1': '#F5ECE0',
                'peach': '#FFDEB6',
                'primary-gray': '#F5F5F5',
            },
            fontFamily: {
                sans: ['IBM Plex Arabic', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [forms],
};