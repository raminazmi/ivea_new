import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../SectionTitle';
const JobCard = ({ title, description, type, category, onApply }) => {
    const getTypeText = (type) => {
        switch (type) {
            case 'full-time':
                return 'دوام كامل';
            case 'part-time':
                return 'دوام جزئي';
            case 'contract':
                return 'عقد مؤقت';
            default:
                return 'دوام كامل';
        }
    };
    return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300", children: [_jsxs("div", { className: "flex justify-between items-start mb-3 sm:mb-4", children: [_jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center", children: _jsx("img", { src: "/images/sofa3.png", alt: "Sofa with lamp", className: "w-full h-full object-contain" }) }), _jsx("span", { className: "bg-primary-yellow text-primary-black text-xs px-2 sm:px-3 py-1 rounded-full font-medium", children: getTypeText(type) })] }), _jsx("div", { className: "mb-3 sm:mb-4", children: _jsx("h3", { className: "text-base sm:text-lg font-bold text-primary-black mb-2 relative", children: _jsx(SectionTitle, { text: title, size: "lg", align: "center", className: "mb-6 sm:mb-8 text-blue-600" }) }) }), _jsx("p", { className: "text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6", children: description }), _jsx("button", { onClick: onApply, className: "w-full bg-primary-yellow hover:bg-yellow-500 text-primary-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300 text-sm sm:text-base", children: "\u0627\u0644\u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u0622\u0646" })] }));
};
export default JobCard;
