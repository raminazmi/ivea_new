import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ProductInfo = ({ label, value, className = "" }) => {
    return (_jsxs("div", { className: `space-y-2 ${className}`, children: [_jsx("div", { className: "text-sm text-gray-600", children: label }), _jsx("div", { className: "font-medium text-gray-900", children: value })] }));
};
export default ProductInfo;
