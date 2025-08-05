import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ScrollToTop from './Components/ScrollToTop';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(_jsxs(Provider, { store: store, children: [_jsx(ScrollToTop, {}), _jsx(App, { ...props })] }));
    },
});
