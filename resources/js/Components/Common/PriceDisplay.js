import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PriceDisplay = ({ price, finalPrice: propFinalPrice, hasDiscount, discount, showLabel = true, label = "السعر يبدأ من", className = "" }) => {
    // تحويل price إلى رقم
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    const finalPrice = propFinalPrice || (discount ? numericPrice - (numericPrice * discount / 100) : numericPrice);
    return (_jsxs("div", { className: `space-y-2 ${className}`, children: [showLabel && (_jsx("div", { className: "text-sm text-gray-600", children: label })), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-2xl font-bold text-gray-900", children: finalPrice.toFixed(0) }), _jsx("img", { src: "/images/sar-currency(black).svg", alt: "SAR", className: "w-6 h-6" })] }), (discount || hasDiscount) && (_jsxs("div", { className: "text-sm text-gray-500 line-through", children: [numericPrice.toFixed(0), " \u0631.\u0633"] }))] }));
};
export default PriceDisplay;
