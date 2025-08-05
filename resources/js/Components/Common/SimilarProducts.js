import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCard from '@/Components/Products/ProductCard';
const SimilarProducts = ({ products, title = "منتجات مشابهة :", className = "" }) => {
    if (!products || products.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: `mt-16 ${className}`, children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 mb-6", children: title }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4", children: products.map((product) => (_jsx(ProductCard, { product: product }, product.id))) })] }));
};
export default SimilarProducts;
