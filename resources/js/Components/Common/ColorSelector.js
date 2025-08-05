import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ColorSwatch from './ColorSwatch';
const ColorSelector = ({ colors, selectedColor, onColorChange, onColorSelect, colorNames = [], title = "اختر اللون", className = "" }) => {
    return (_jsxs("div", { className: `space-y-3 ${className}`, children: [_jsx("div", { className: "text-sm text-gray-600", children: title }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex gap-2", children: colors.map((color, index) => (_jsx("button", { onClick: () => (onColorSelect || onColorChange)?.(index), title: `اختيار اللون ${colorNames[index] || index + 1}`, className: `w-8 h-8 rounded-full border-2 transition-all ${selectedColor === index
                                ? 'border-blue-600 scale-110'
                                : 'border-gray-300 hover:border-gray-400'}`, children: _jsx(ColorSwatch, { color: color, size: "sm", className: "w-full h-full rounded-full" }) }, index))) }), colorNames[selectedColor] && (_jsx("span", { className: "text-sm font-medium text-gray-900", children: colorNames[selectedColor] }))] })] }));
};
export default ColorSelector;
