import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from '@inertiajs/react';
const ProductCard = ({ product }) => {
    return (_jsxs("div", { className: "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow", children: [_jsx("div", { className: "bg-gray-200 border-2 border-dashed w-full h-48" }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-bold text-lg text-primary-black mb-1", children: product.name }), _jsxs("p", { className: "text-primary-black mb-3", children: [typeof product.price === 'number'
                                ? product.price.toFixed(2)
                                : parseFloat(product.price).toFixed(2), " \u0631.\u0633"] }), _jsx(Link, { href: `/products/${product.id}`, className: "block w-full bg-primary-yellow text-primary-black text-center py-2 rounded-lg hover:bg-opacity-90 transition", children: "\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629" })] })] }));
};
export default ProductCard;
