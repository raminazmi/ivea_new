import { jsx as _jsx } from "react/jsx-runtime";
const ColorSwatch = ({ color, size = 'md', className = '', title }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };
    const getColorClass = (color) => {
        const colorMap = {
            '#FFA500': 'bg-orange-500',
            '#87CEEB': 'bg-sky-300',
            '#DDA0DD': 'bg-plum-300',
            '#9370DB': 'bg-purple-500',
            '#FF0000': 'bg-red-500',
            '#00FF00': 'bg-green-500',
            '#0000FF': 'bg-blue-500',
            '#FFFF00': 'bg-yellow-500',
            '#FF00FF': 'bg-fuchsia-500',
            '#00FFFF': 'bg-cyan-500',
            '#000000': 'bg-black',
            '#FFFFFF': 'bg-white border border-gray-300',
            '#808080': 'bg-gray-500',
            '#C0C0C0': 'bg-gray-300',
            '#800000': 'bg-red-800',
            '#808000': 'bg-yellow-800',
            '#008000': 'bg-green-800',
            '#800080': 'bg-purple-800',
            '#008080': 'bg-teal-800',
            '#000080': 'bg-blue-800'
        };
        return colorMap[color.toUpperCase()] || 'bg-gray-400';
    };
    return (_jsx("div", { className: `${sizeClasses[size]} rounded border ${getColorClass(color)} ${className}`, title: title || `لون المنتج: ${color}`, style: { backgroundColor: color } }));
};
export default ColorSwatch;
