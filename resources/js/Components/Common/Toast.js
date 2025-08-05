import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const Toast = ({ message, type, isVisible, onClose }) => {
    const [isShowing, setIsShowing] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setIsShowing(true);
            const timer = setTimeout(() => {
                setIsShowing(false);
                setTimeout(onClose, 300); // Wait for fade out animation
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);
    if (!isVisible)
        return null;
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? '✓' : '✕';
    return (_jsx("div", { className: `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`, children: _jsxs("div", { className: `${bgColor} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg flex items-center space-x-2 sm:space-x-3 min-w-64 sm:min-w-80 text-right`, children: [_jsx("span", { className: "text-lg sm:text-xl font-bold", children: icon }), _jsx("span", { className: "flex-1 text-sm sm:text-base", children: message }), _jsx("button", { onClick: () => {
                        setIsShowing(false);
                        setTimeout(onClose, 300);
                    }, className: "text-white hover:text-gray-200 text-lg sm:text-xl font-bold", title: "\u0625\u063A\u0644\u0627\u0642", children: "\u00D7" })] }) }));
};
export default Toast;
