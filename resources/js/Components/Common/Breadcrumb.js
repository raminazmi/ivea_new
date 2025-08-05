import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from '@inertiajs/react';
import { HiChevronLeft } from 'react-icons/hi';
const Breadcrumb = ({ items }) => {
    return (_jsx("nav", { className: "flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-4", children: items.map((item, index) => (_jsxs(React.Fragment, { children: [index > 0 && (_jsx(HiChevronLeft, { className: "w-4 h-4 text-gray-400" })), item.href ? (_jsx(Link, { href: item.href, className: "hover:text-gray-900 transition-colors", children: item.name })) : (_jsx("span", { className: "text-gray-900 font-medium", children: item.name }))] }, index))) }));
};
export default Breadcrumb;
