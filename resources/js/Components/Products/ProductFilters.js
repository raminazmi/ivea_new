import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { HiSearch, HiChevronDown, HiChevronUp, HiX } from 'react-icons/hi';
const ProductFilters = ({ onFilterChange, activeTab = 'all', categories = [], filterOptions = {}, currentFilters = {} }) => {
    const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
    const [selectedCategories, setSelectedCategories] = useState(currentFilters.category ? [currentFilters.category] : []);
    const [selectedColors, setSelectedColors] = useState(currentFilters.colors || []);
    const [selectedSizes, setSelectedSizes] = useState(currentFilters.size || []);
    const [selectedOpeningMethods, setSelectedOpeningMethods] = useState(currentFilters.opening_method || []);
    const [selectedRailTypes, setSelectedRailTypes] = useState(currentFilters.rail_type || []);
    const [selectedLinings, setSelectedLinings] = useState(currentFilters.lining || []);
    const [selectedBrands, setSelectedBrands] = useState(currentFilters.brand || []);
    const [selectedCollections, setSelectedCollections] = useState(currentFilters.collection || []);
    const [priceRange, setPriceRange] = useState({
        min: currentFilters.min_price || filterOptions.priceRange?.min || 0,
        max: currentFilters.max_price || filterOptions.priceRange?.max || 1000
    });
    const [inStock, setInStock] = useState(currentFilters.in_stock || 'all');
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        color: false,
        size: false,
        openingMethod: false,
        railType: false,
        lining: false,
        brand: false,
        collection: false,
        price: false
    });
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    const tabs = [
        { id: 'all', label: 'الكل' },
        { id: 'new', label: 'جديد' },
        { id: 'offers', label: 'عروض' },
        { id: 'bestsellers', label: 'الأكثر مبيعاً' },
    ];
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
    const handleTabChange = (tab) => {
        onFilterChange({ tab, page: 1 });
    };
    const handleSearch = () => {
        const filters = {
            search: searchTerm,
            page: 1
        };
        onFilterChange(filters);
    };
    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleFilterChange = () => {
        const filters = {
            page: 1
        };
        if (searchTerm)
            filters.search = searchTerm;
        if (selectedCategories.length > 0)
            filters.category = selectedCategories[0]; // Single category for now
        if (selectedColors.length > 0)
            filters.colors = selectedColors;
        if (selectedSizes.length > 0)
            filters.size = selectedSizes;
        if (selectedOpeningMethods.length > 0)
            filters.opening_method = selectedOpeningMethods;
        if (selectedRailTypes.length > 0)
            filters.rail_type = selectedRailTypes;
        if (selectedLinings.length > 0)
            filters.lining = selectedLinings;
        if (selectedBrands.length > 0)
            filters.brand = selectedBrands;
        if (selectedCollections.length > 0)
            filters.collection = selectedCollections;
        if (priceRange.min > filterOptions.priceRange?.min)
            filters.min_price = priceRange.min;
        if (priceRange.max < filterOptions.priceRange?.max)
            filters.max_price = priceRange.max;
        if (inStock !== 'all')
            filters.in_stock = inStock;
        onFilterChange(filters);
    };
    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedOpeningMethods([]);
        setSelectedRailTypes([]);
        setSelectedLinings([]);
        setSelectedBrands([]);
        setSelectedCollections([]);
        setPriceRange({
            min: filterOptions.priceRange?.min || 0,
            max: filterOptions.priceRange?.max || 1000
        });
        setInStock('all');
        onFilterChange({ page: 1 });
    };
    const hasActiveFilters = () => {
        return searchTerm ||
            selectedCategories.length > 0 ||
            selectedColors.length > 0 ||
            selectedSizes.length > 0 ||
            selectedOpeningMethods.length > 0 ||
            selectedRailTypes.length > 0 ||
            selectedLinings.length > 0 ||
            selectedBrands.length > 0 ||
            selectedCollections.length > 0 ||
            priceRange.min > (filterOptions.priceRange?.min || 0) ||
            priceRange.max < (filterOptions.priceRange?.max || 1000) ||
            inStock !== 'all';
    };
    // Auto-apply filters when selections change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleFilterChange();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [
        selectedCategories, selectedColors, selectedSizes, selectedOpeningMethods,
        selectedRailTypes, selectedLinings, selectedBrands, selectedCollections,
        priceRange, inStock
    ]);
    return (_jsxs("div", { className: "bg-white p-4 sm:p-6 rounded-lg shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 sm:mb-6", children: [_jsx("h3", { className: "text-lg sm:text-xl font-bold text-gray-900", children: "\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A" }), hasActiveFilters() && (_jsxs("button", { onClick: clearAllFilters, className: "text-sm text-red-600 hover:text-red-800 flex items-center gap-1", children: [_jsx(HiX, { className: "w-4 h-4" }), "\u0645\u0633\u062D \u0627\u0644\u0643\u0644"] }))] }), _jsx("div", { className: "mb-4 sm:mb-6", children: _jsxs("div", { className: "relative", children: [_jsx(HiSearch, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" }), _jsx("input", { type: "text", placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), onKeyPress: handleSearchKeyPress, className: "w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm sm:text-base" })] }) }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('category'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0627\u0644\u0641\u0626\u0627\u062A", expandedSections.category ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.category && (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center px-3 cursor-pointer", children: [_jsx("input", { type: "radio", name: "category", checked: selectedCategories.length === 0, onChange: () => setSelectedCategories([]), className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: "\u0627\u0644\u0643\u0644" })] }), categories.map((category) => (_jsxs("label", { className: "flex items-center px-3 cursor-pointer", children: [_jsx("input", { type: "radio", name: "category", checked: selectedCategories.includes(category.id.toString()), onChange: () => setSelectedCategories([category.id.toString()]), className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow" }), _jsxs("span", { className: "text-gray-700", children: [category.name, " (", category.products_count || 0, ")"] })] }, category.id)))] }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('price'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u0639\u0631", expandedSections.price ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.price && (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "price-range-container", children: [_jsx("div", { className: "flex justify-between text-sm text-gray-600 mb-2", children: _jsxs("span", { children: ["\u0627\u0644\u0633\u0639\u0631: ", priceRange.min, " - ", priceRange.max, " \u0631\u064A\u0627\u0644"] }) }), _jsxs("div", { className: "relative", children: [_jsx("input", { title: "\u0646\u0637\u0627\u0642 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649", type: "range", min: filterOptions.priceRange?.min || 0, max: filterOptions.priceRange?.max || 1000, value: priceRange.min, onChange: (e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) })), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" }), _jsx("input", { title: "\u0646\u0637\u0627\u0642 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649", type: "range", min: filterOptions.priceRange?.min || 0, max: filterOptions.priceRange?.max || 1000, value: priceRange.max, onChange: (e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) })), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0" })] })] }) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('color'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0627\u0644\u0644\u0648\u0646", expandedSections.color ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.color && (_jsx("div", { className: "grid grid-cols-2 gap-2", children: filterOptions.colors?.map((color, index) => (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50", children: [_jsx("input", { type: "checkbox", checked: selectedColors.includes(color), onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedColors([...selectedColors, color]);
                                        }
                                        else {
                                            setSelectedColors(selectedColors.filter(c => c !== color));
                                        }
                                    }, className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-6 h-6 rounded-full border-2 border-gray-300", style: { backgroundColor: color } }), _jsx("span", { className: "text-gray-700 text-sm", children: colorNames[color] || color })] })] }, index))) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('size'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0627\u0644\u0645\u0642\u0627\u0633", expandedSections.size ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.size && (_jsx("div", { className: "space-y-2", children: filterOptions.sizes?.map((size, index) => (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedSizes.includes(size.value), onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedSizes([...selectedSizes, size.value]);
                                        }
                                        else {
                                            setSelectedSizes(selectedSizes.filter(s => s !== size.value));
                                        }
                                    }, className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: sizeNames[size.value] || size.label })] }, index))) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('openingMethod'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0641\u062A\u062D", expandedSections.openingMethod ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.openingMethod && (_jsx("div", { className: "space-y-2", children: filterOptions.openingMethods?.map((method, index) => (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedOpeningMethods.includes(method.value), onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedOpeningMethods([...selectedOpeningMethods, method.value]);
                                        }
                                        else {
                                            setSelectedOpeningMethods(selectedOpeningMethods.filter(m => m !== method.value));
                                        }
                                    }, className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: method.label })] }, index))) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('railType'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0646\u0648\u0639 \u0627\u0644\u0633\u0643\u0629", expandedSections.railType ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.railType && (_jsx("div", { className: "space-y-2", children: filterOptions.railTypes?.map((type, index) => (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedRailTypes.includes(type.value), onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedRailTypes([...selectedRailTypes, type.value]);
                                        }
                                        else {
                                            setSelectedRailTypes(selectedRailTypes.filter(t => t !== type.value));
                                        }
                                    }, className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: type.label })] }, index))) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('lining'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0648\u062C\u0648\u062F \u0628\u0637\u0627\u0646\u0629", expandedSections.lining ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.lining && (_jsx("div", { className: "space-y-2", children: filterOptions.liningOptions?.map((option, index) => (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedLinings.includes(option.value), onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedLinings([...selectedLinings, option.value]);
                                        }
                                        else {
                                            setSelectedLinings(selectedLinings.filter(l => l !== option.value));
                                        }
                                    }, className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: option.label })] }, index))) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('brand'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0627\u0644\u0645\u0627\u0631\u0643\u0629", expandedSections.brand ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.brand && (_jsx("div", { className: "space-y-2", children: filterOptions.brands?.map((brand, index) => (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedBrands.includes(brand), onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedBrands([...selectedBrands, brand]);
                                        }
                                        else {
                                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                                        }
                                    }, className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: brand })] }, index))) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => toggleSection('collection'), className: "flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3", children: ["\u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629", expandedSections.collection ? _jsx(HiChevronUp, { className: "w-5 h-5" }) : _jsx(HiChevronDown, { className: "w-5 h-5" })] }), expandedSections.collection && (_jsx("div", { className: "space-y-2", children: filterOptions.collections?.map((collection, index) => (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedCollections.includes(collection), onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedCollections([...selectedCollections, collection]);
                                        }
                                        else {
                                            setSelectedCollections(selectedCollections.filter(c => c !== collection));
                                        }
                                    }, className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: collection })] }, index))) }))] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "font-bold text-gray-900 mb-3", children: "\u0627\u0644\u062A\u0648\u0641\u0631" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center px-3 cursor-pointer", children: [_jsx("input", { type: "radio", name: "stock", checked: inStock === 'all', onChange: () => setInStock('all'), className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: "\u0627\u0644\u0643\u0644" })] }), _jsxs("label", { className: "flex items-center px-3 cursor-pointer", children: [_jsx("input", { type: "radio", name: "stock", checked: inStock === 'true', onChange: () => setInStock('true'), className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: "\u0645\u062A\u0648\u0641\u0631" })] }), _jsxs("label", { className: "flex items-center px-3 cursor-pointer", children: [_jsx("input", { type: "radio", name: "stock", checked: inStock === 'false', onChange: () => setInStock('false'), className: "w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow" }), _jsx("span", { className: "text-gray-700", children: "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631" })] })] })] })] }));
};
export default ProductFilters;
