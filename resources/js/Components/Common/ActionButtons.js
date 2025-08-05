import { jsx as _jsx } from "react/jsx-runtime";
const ActionButtons = ({ buttons, onAddToCart, inStock = true, className = "" }) => {
    if (buttons) {
        return (_jsx("div", { className: `flex gap-4 ${className}`, children: buttons.map((button, index) => (_jsx("button", { onClick: button.onClick, disabled: button.disabled, className: `flex-1 font-medium py-3 px-6 rounded-lg transition-colors ${button.variant === 'primary'
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                    : 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'} ${button.disabled ? 'opacity-50 cursor-not-allowed' : ''}`, children: button.label }, index))) }));
    }
    return (_jsx("div", { className: `flex gap-4 ${className}`, children: _jsx("button", { onClick: onAddToCart, disabled: !inStock, className: `flex-1 font-medium py-3 px-6 rounded-lg transition-colors bg-yellow-400 hover:bg-yellow-500 text-gray-900 ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`, children: inStock ? 'أضف إلى السلة' : 'غير متوفر' }) }));
};
export default ActionButtons;
