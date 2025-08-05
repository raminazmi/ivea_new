import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import ProductCard from '@/Components/Products/ProductCard';
import ProductFilters from '@/Components/Products/ProductFilters';
import ProductPagination from '@/Components/Products/ProductPagination';
import ActiveFilters from '@/Components/Products/ActiveFilters';
import ContactUs from '@/Components/LandingPage/ContactUs';
const Products = ({ products, categories, filters, filterOptions }) => {
    const [currentPage, setCurrentPage] = useState(products.current_page);
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [activeTab, setActiveTab] = useState(filters.tab || 'all');
    const tabs = [
        { id: 'all', label: 'الكل' },
        { id: 'new', label: 'جديد' },
        { id: 'offers', label: 'عروض' },
        { id: 'bestsellers', label: 'الأكثر مبيعاً' },
    ];
    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.get('/products', { ...currentFilters, page }, { preserveState: true });
    };
    const handleFilterChange = (newFilters) => {
        setCurrentFilters(newFilters);
        setCurrentPage(1);
        router.get('/products', { ...newFilters, page: 1 }, { preserveState: true });
    };
    const handleRemoveFilter = (filterType, value) => {
        const newFilters = { ...currentFilters };
        if (value) {
            // Remove specific value from array filters
            if (Array.isArray(newFilters[filterType])) {
                newFilters[filterType] = newFilters[filterType].filter((v) => v !== value);
                if (newFilters[filterType].length === 0) {
                    delete newFilters[filterType];
                }
            }
        }
        else {
            // Remove entire filter
            delete newFilters[filterType];
        }
        setCurrentFilters(newFilters);
        setCurrentPage(1);
        router.get('/products', { ...newFilters, page: 1 }, { preserveState: true });
    };
    const handleClearAllFilters = () => {
        setCurrentFilters({});
        setCurrentPage(1);
        router.get('/products', { page: 1 }, { preserveState: true });
    };
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        const newFilters = { ...currentFilters, tab, page: 1 };
        setCurrentFilters(newFilters);
        setCurrentPage(1);
        router.get('/products', newFilters, { preserveState: true });
    };
    // حساب عدد المنتجات المتاحة
    const availableProducts = products.data.filter(product => product.in_stock !== false);
    const outOfStockProducts = products.data.filter(product => product.in_stock === false);
    return (_jsxs(AppLayout, { children: [_jsx(Head, { title: "\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A" }), _jsx(CoverSection, { imageUrl: "/images/products_cover.png", title: "\u062A\u0635\u0641\u062D \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A", subtitle: "\u0627\u0643\u062A\u0634\u0641 \u0645\u062C\u0645\u0648\u0639\u062A\u0646\u0627 \u0627\u0644\u0645\u062A\u0646\u0648\u0639\u0629 \u0645\u0646 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A", description: "\u0633\u062A\u0627\u0626\u0631\u060C \u0623\u062B\u0627\u062B\u060C \u0648\u0623\u0643\u062B\u0631 \u0645\u0646 \u0630\u0644\u0643", socialLinks: {
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                } }), _jsx("section", { className: "py-8 md:py-12 lg:py-16", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-6 md:gap-8", children: [_jsx("div", { className: "lg:w-1/4", children: _jsx(ProductFilters, { onFilterChange: handleFilterChange, activeTab: activeTab, categories: categories, filterOptions: filterOptions, currentFilters: currentFilters }) }), _jsxs("div", { className: "lg:w-3/4", children: [_jsx(ActiveFilters, { filters: currentFilters, onRemoveFilter: handleRemoveFilter, onClearAll: handleClearAllFilters }), _jsxs("div", { className: "flex justify-between items-center mb-6 md:mb-8", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl md:text-2xl font-bold text-gray-900", children: ["\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A (", products.total, ")"] }), outOfStockProducts.length > 0 && (_jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [availableProducts.length, " \u0645\u062A\u0627\u062D\u060C ", outOfStockProducts.length, " \u0646\u0641\u0630\u062A"] }))] }), _jsx("div", { className: "flex items-center space-x-3 md:space-x-4", children: _jsxs("select", { className: "border border-gray-300 rounded-lg px-2.5 md:px-3 py-2 md:py-2.5 focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base", onChange: (e) => handleFilterChange({ ...currentFilters, sort: e.target.value }), value: currentFilters.sort || 'created_at', title: "\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A", children: [_jsx("option", { value: "created_at", children: "\u0627\u0644\u0623\u062D\u062F\u062B" }), _jsx("option", { value: "price", children: "\u0627\u0644\u0633\u0639\u0631: \u0645\u0646 \u0627\u0644\u0623\u0642\u0644 \u0644\u0644\u0623\u0639\u0644\u0649" }), _jsx("option", { value: "price_desc", children: "\u0627\u0644\u0633\u0639\u0631: \u0645\u0646 \u0627\u0644\u0623\u0639\u0644\u0649 \u0644\u0644\u0623\u0642\u0644" }), _jsx("option", { value: "name", children: "\u0627\u0644\u0627\u0633\u0645: \u0623-\u064A" }), _jsx("option", { value: "name_desc", children: "\u0627\u0644\u0627\u0633\u0645: \u064A-\u0623" }), _jsx("option", { value: "featured", children: "\u0627\u0644\u0645\u0645\u064A\u0632\u0629 \u0623\u0648\u0644\u0627\u064B" })] }) })] }), _jsx("div", { className: "flex justify-center mb-8", children: _jsx("div", { className: "flex flex-wrap justify-center gap-2 md:gap-4", children: tabs.map((tab) => (_jsx("button", { onClick: () => handleTabChange(tab.id), className: `px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-700 hover:duration-1000 ${activeTab === tab.id
                                                    ? 'bg-primary-yellow text-white shadow-lg'
                                                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'}`, children: tab.label }, tab.id))) }) }), products.data.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6", children: products.data.map((product) => (_jsx(ProductCard, { product: product }, product.id))) }), _jsx("div", { className: "mt-8 md:mt-12", children: _jsx(ProductPagination, { currentPage: currentPage, totalPages: products.last_page, onPageChange: handlePageChange }) })] })) : (_jsx("div", { className: "text-center py-12 md:py-16", children: _jsxs("div", { className: "text-gray-500", children: [_jsx("svg", { className: "mx-auto h-12 w-12 md:h-16 md:w-16 mb-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) }), _jsx("h3", { className: "text-lg md:text-xl font-medium text-gray-900 mb-2", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A" }), _jsx("p", { className: "text-sm md:text-base text-gray-500", children: "\u062C\u0631\u0628 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0623\u0648 \u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u062A\u062C\u0627\u062A \u0623\u062E\u0631\u0649" })] }) }))] })] }) }) }), _jsx(ContactUs, {})] }));
};
export default Products;
