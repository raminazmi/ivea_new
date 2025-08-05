import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiCheck } from 'react-icons/hi';
const FeatureList = ({ features, title = "المميزات والفوائد:", className = "" }) => {
    return (_jsxs("div", { className: `space-y-3 ${className}`, children: [title && (_jsx("div", { className: "text-sm font-medium text-gray-900", children: title })), _jsx("ul", { className: "space-y-2", children: features.map((feature, index) => (_jsxs("li", { className: "flex items-start space-x-2", children: [_jsx(HiCheck, { className: "w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-sm text-gray-700", children: feature })] }, index))) })] }));
};
export default FeatureList;
