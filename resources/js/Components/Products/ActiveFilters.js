import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiX } from 'react-icons/hi';
const ActiveFilters = ({ filters, onRemoveFilter, onClearAll, categories = [] }) => {
    const hasActiveFilters = () => {
        return filters.search ||
            filters.category ||
            filters.colors?.length > 0 ||
            filters.size?.length > 0 ||
            filters.opening_method?.length > 0 ||
            filters.rail_type?.length > 0 ||
            filters.lining?.length > 0 ||
            filters.brand?.length > 0 ||
            filters.collection?.length > 0 ||
            filters.min_price ||
            filters.max_price ||
            filters.in_stock;
    };
    if (!hasActiveFilters()) {
        return null;
    }
    // Color names mapping
    const colorNames = {
        '#FFFFFF': 'أبيض',
        '#000000': 'أسود',
        '#808080': 'رمادي',
        '#0000FF': 'أزرق',
        '#FF0000': 'أحمر',
        '#008000': 'أخضر',
        '#FFFF00': 'أصفر',
        '#A52A2A': 'بني',
        '#FFA500': 'برتقالي',
        '#FFC0CB': 'وردي',
        '#800080': 'بنفسجي',
        '#00FFFF': 'سماوي',
        '#FFD700': 'ذهبي',
        '#32CD32': 'أخضر فاتح',
        '#FF69B4': 'وردي غامق'
    };
    // Size names mapping
    const sizeNames = {
        'small': 'صغير',
        'medium': 'متوسط',
        'large': 'كبير',
        'custom': 'مخصص'
    };
    const getFilterLabel = (type, value) => {
        switch (type) {
            case 'search':
                return `البحث: "${value}"`;
            case 'category':
                const category = categories.find(cat => cat.id.toString() === value);
                return `الفئة: ${category?.name || value}`;
            case 'colors':
                return `اللون: ${colorNames[value] || value}`;
            case 'size':
                return `المقاس: ${sizeNames[value] || value}`;
            case 'opening_method':
                return `طريقة الفتح: ${value}`;
            case 'rail_type':
                return `نوع السكة: ${value}`;
            case 'lining':
                return `البطانة: ${value}`;
            case 'brand':
                return `الماركة: ${value}`;
            case 'collection':
                return `المجموعة: ${value}`;
            case 'min_price':
                return `السعر من: ${value} ريال`;
            case 'max_price':
                return `السعر إلى: ${value} ريال`;
            case 'in_stock':
                return value === 'true' ? 'متوفر فقط' : 'غير متوفر فقط';
            default:
                return value;
        }
    };
    return (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h4", { className: "font-semibold text-gray-900", children: "\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0646\u0634\u0637\u0629" }), _jsxs("button", { onClick: onClearAll, className: "text-sm text-red-600 hover:text-red-800 flex items-center gap-1", title: "\u0645\u0633\u062D \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631", children: [_jsx(HiX, { className: "w-4 h-4" }), "\u0645\u0633\u062D \u0627\u0644\u0643\u0644"] })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [filters.search && (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm", children: [getFilterLabel('search', filters.search), _jsx("button", { onClick: () => onRemoveFilter('search'), className: "hover:text-blue-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0628\u062D\u062B", children: _jsx(HiX, { className: "w-3 h-3" }) })] })), filters.category && (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm", children: [getFilterLabel('category', filters.category), _jsx("button", { onClick: () => onRemoveFilter('category'), className: "hover:text-green-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0641\u0626\u0629", children: _jsx(HiX, { className: "w-3 h-3" }) })] })), filters.colors?.map((color, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 rounded-full border border-gray-300", style: { backgroundColor: color } }), getFilterLabel('colors', color)] }), _jsx("button", { onClick: () => onRemoveFilter('colors', color), className: "hover:text-purple-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0644\u0648\u0646", children: _jsx(HiX, { className: "w-3 h-3" }) })] }, `color-${index}`))), filters.size?.map((size, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm", children: [getFilterLabel('size', size), _jsx("button", { onClick: () => onRemoveFilter('size', size), className: "hover:text-orange-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0633", children: _jsx(HiX, { className: "w-3 h-3" }) })] }, `size-${index}`))), filters.opening_method?.map((method, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm", children: [getFilterLabel('opening_method', method), _jsx("button", { onClick: () => onRemoveFilter('opening_method', method), className: "hover:text-indigo-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0641\u062A\u062D", children: _jsx(HiX, { className: "w-3 h-3" }) })] }, `opening-${index}`))), filters.rail_type?.map((type, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm", children: [getFilterLabel('rail_type', type), _jsx("button", { onClick: () => onRemoveFilter('rail_type', type), className: "hover:text-teal-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0633\u0643\u0629", children: _jsx(HiX, { className: "w-3 h-3" }) })] }, `rail-${index}`))), filters.lining?.map((lining, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm", children: [getFilterLabel('lining', lining), _jsx("button", { onClick: () => onRemoveFilter('lining', lining), className: "hover:text-pink-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0628\u0637\u0627\u0646\u0629", children: _jsx(HiX, { className: "w-3 h-3" }) })] }, `lining-${index}`))), filters.brand?.map((brand, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm", children: [getFilterLabel('brand', brand), _jsx("button", { onClick: () => onRemoveFilter('brand', brand), className: "hover:text-yellow-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0627\u0631\u0643\u0629", children: _jsx(HiX, { className: "w-3 h-3" }) })] }, `brand-${index}`))), filters.collection?.map((collection, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm", children: [getFilterLabel('collection', collection), _jsx("button", { onClick: () => onRemoveFilter('collection', collection), className: "hover:text-red-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629", children: _jsx(HiX, { className: "w-3 h-3" }) })] }, `collection-${index}`))), filters.min_price && (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm", children: [getFilterLabel('min_price', filters.min_price), _jsx("button", { onClick: () => onRemoveFilter('min_price'), className: "hover:text-emerald-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0623\u062F\u0646\u0649", children: _jsx(HiX, { className: "w-3 h-3" }) })] })), filters.max_price && (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm", children: [getFilterLabel('max_price', filters.max_price), _jsx("button", { onClick: () => onRemoveFilter('max_price'), className: "hover:text-emerald-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0623\u0642\u0635\u0649", children: _jsx(HiX, { className: "w-3 h-3" }) })] })), filters.in_stock && (_jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm", children: [getFilterLabel('in_stock', filters.in_stock), _jsx("button", { onClick: () => onRemoveFilter('in_stock'), className: "hover:text-gray-600", title: "\u0625\u0632\u0627\u0644\u0629 \u0641\u0644\u062A\u0631 \u0627\u0644\u062A\u0648\u0641\u0631", children: _jsx(HiX, { className: "w-3 h-3" }) })] }))] })] }));
};
export default ActiveFilters;
