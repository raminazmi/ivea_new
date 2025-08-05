import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
export default function Guest({ children }) {
    return (_jsxs("div", { className: "flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0", children: [_jsx("div", { children: _jsx(Link, { href: "/", children: _jsx(ApplicationLogo, { className: "h-20 w-20 fill-current text-gray-500" }) }) }), _jsx("div", { className: "mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg", children: children })] }));
}
