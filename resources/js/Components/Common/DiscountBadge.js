import { jsxs as _jsxs } from "react/jsx-runtime";
const DiscountBadge = ({ discount, className = "" }) => {
    if (!discount || discount <= 0) {
        return null;
    }
    return (_jsxs("div", { className: `inline-block bg-yellow-400 text-white text-sm font-bold w-12 h-12 rounded-full flex items-center justify-center ${className}`, children: ["%", discount] }));
};
export default DiscountBadge;
