import { jsx as _jsx } from "react/jsx-runtime";
const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
    return (_jsx("div", { className: "flex justify-center mb-6 sm:mb-8", children: _jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: categories.map((category) => (_jsx("button", { onClick: () => onCategoryChange(category), className: `px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeCategory === category
                    ? 'bg-primary-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: category }, category))) }) }));
};
export default CategoryTabs;
