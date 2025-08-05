import { jsx as _jsx } from "react/jsx-runtime";
const StockStatus = ({ inStock, className = "" }) => {
    return (_jsx("div", { className: `inline-block text-sm px-3 py-1 rounded-full ${className}`, children: inStock ? (_jsx("span", { className: "bg-green-100 text-green-800", children: "\u0628\u0636\u0627\u0639\u0629 \u0645\u062A\u0648\u0641\u0631\u0629" })) : (_jsx("span", { className: "bg-red-100 text-red-800", children: "\u0646\u0641\u0630\u062A \u0627\u0644\u0643\u0645\u064A\u0629" })) }));
};
export default StockStatus;
