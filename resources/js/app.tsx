import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ScrollToTop from './Components/ScrollToTop';
import ErrorHandler from './Components/Common/ErrorHandler';
import CsrfErrorHandler from './Components/Common/CsrfErrorHandler';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: (name: string) => resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx')
    ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <Provider store={store}>
                <ErrorHandler>
                    <ScrollToTop />
                    <CsrfErrorHandler errors={props.initialPage.props.errors}>
                        <App {...props} />
                    </CsrfErrorHandler>
                </ErrorHandler>
            </Provider>
        );
    },
});
