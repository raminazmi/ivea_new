import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
export default function Dashboard() {
    return (_jsxs(AuthenticatedLayout, { header: _jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Dashboard" }), children: [_jsx(Head, { title: "Dashboard" }), _jsx("div", { className: "py-12", children: _jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: _jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: _jsx("div", { className: "p-6 text-gray-900", children: "You're logged in!" }) }) }) })] }));
}
