import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiPlus, HiPencil, HiTrash, HiEye, HiStar, HiTag, HiFire, HiClock } from 'react-icons/hi';
const Products = ({ products }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [tabStats, setTabStats] = useState(null);
    useEffect(() => {
        fetchTabStats();
    }, []);
    const fetchTabStats = async () => {
        try {
            const response = await fetch('/admin/products/tab-statistics');
            if (response.ok) {
                const stats = await response.json();
                setTabStats(stats);
            }
        }
        catch (error) {
            console.error('Error fetching tab statistics:', error);
        }
    };
    const handleTabSettings = async (productId, field, value) => {
        try {
            const response = await fetch(`/admin/products/${productId}/tab-settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ [field]: value }),
            });
            if (response.ok) {
                router.reload();
            }
        }
        catch (error) {
            console.error('Error updating tab settings:', error);
        }
    };
    const handleBulkTabSettings = async (field, action) => {
        if (selectedProducts.length === 0)
            return;
        try {
            const response = await fetch('/admin/products/bulk-tab-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    product_ids: selectedProducts,
                    [field]: true,
                    action: action,
                }),
            });
            if (response.ok) {
                setSelectedProducts([]);
                router.reload();
            }
        }
        catch (error) {
            console.error('Error updating bulk tab settings:', error);
        }
    };
    const toggleProductSelection = (productId) => {
        setSelectedProducts(prev => prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]);
    };
    const toggleAllProducts = () => {
        if (selectedProducts.length === products.data.length) {
            setSelectedProducts([]);
        }
        else {
            setSelectedProducts(products.data.map(p => p.id));
        }
    };
    return (_jsxs(AdminLayout, { children: [_jsx(Head, { title: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A" }), _jsx("div", { className: "py-6", children: _jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: _jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: _jsxs("div", { className: "p-6 bg-white border-b border-gray-200", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A" }), _jsxs(Link, { href: route('admin.products.create'), className: "bg-primary-yellow text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2", children: [_jsx(HiPlus, { className: "w-5 h-5" }), "\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F"] })] }), tabStats && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiStar, { className: "w-5 h-5 text-blue-600" }), _jsx("span", { className: "font-semibold text-blue-900", children: "\u0627\u0644\u0645\u0645\u064A\u0632\u0629" })] }), _jsx("p", { className: "text-2xl font-bold text-blue-900", children: tabStats.featured })] }), _jsxs("div", { className: "bg-green-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiClock, { className: "w-5 h-5 text-green-600" }), _jsx("span", { className: "font-semibold text-green-900", children: "\u0627\u0644\u062C\u062F\u064A\u062F\u0629" })] }), _jsx("p", { className: "text-2xl font-bold text-green-900", children: tabStats.new })] }), _jsxs("div", { className: "bg-orange-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiTag, { className: "w-5 h-5 text-orange-600" }), _jsx("span", { className: "font-semibold text-orange-900", children: "\u0627\u0644\u0639\u0631\u0648\u0636" })] }), _jsx("p", { className: "text-2xl font-bold text-orange-900", children: tabStats.offers })] }), _jsxs("div", { className: "bg-red-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiFire, { className: "w-5 h-5 text-red-600" }), _jsx("span", { className: "font-semibold text-red-900", children: "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B" })] }), _jsx("p", { className: "text-2xl font-bold text-red-900", children: tabStats.bestsellers })] })] })), selectedProducts.length > 0 && (_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg mb-6", children: [_jsxs("h3", { className: "font-semibold mb-3", children: ["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062C\u0645\u0627\u0639\u064A\u0629 (", selectedProducts.length, " \u0645\u0646\u062A\u062C \u0645\u062D\u062F\u062F)"] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { onClick: () => handleBulkTabSettings('featured', 'set'), className: "bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600", children: "\u062A\u0639\u064A\u064A\u0646 \u0643\u0645\u0645\u064A\u0632\u0629" }), _jsx("button", { onClick: () => handleBulkTabSettings('featured', 'unset'), className: "bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600", children: "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0645\u064A\u0632" }), _jsx("button", { onClick: () => handleBulkTabSettings('is_offer', 'set'), className: "bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600", children: "\u062A\u0639\u064A\u064A\u0646 \u0643\u0639\u0631\u0636" }), _jsx("button", { onClick: () => handleBulkTabSettings('is_offer', 'unset'), className: "bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600", children: "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0631\u0636" }), _jsx("button", { onClick: () => handleBulkTabSettings('is_bestseller', 'set'), className: "bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600", children: "\u062A\u0639\u064A\u064A\u0646 \u0643\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B" }), _jsx("button", { onClick: () => handleBulkTabSettings('is_bestseller', 'unset'), className: "bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600", children: "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B" })] })] })), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: _jsx("input", { type: "checkbox", checked: selectedProducts.length === products.data.length, onChange: toggleAllProducts, className: "rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow", title: "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644", "aria-label": "\u062A\u062D\u062F\u064A\u062F \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A" }) }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0645\u0646\u062A\u062C" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0633\u0639\u0631" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: products.data.map((product) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("input", { type: "checkbox", checked: selectedProducts.includes(product.id), onChange: () => toggleProductSelection(product.id), className: "rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow", title: "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0646\u062A\u062C", "aria-label": `تحديد المنتج ${product.name}` }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 h-10 w-10", children: _jsx("img", { className: "h-10 w-10 rounded-lg object-cover", src: product.image || '/images/sofa3.png', alt: product.name }) }), _jsxs("div", { className: "mr-4", children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: product.name }), _jsx("div", { className: "text-sm text-gray-500", children: product.brand })] })] }) }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [_jsxs("div", { className: "text-sm text-gray-900", children: [product.price, " \u0631\u064A\u0627\u0644"] }), product.discount && (_jsxs("div", { className: "text-sm text-green-600", children: ["\u062E\u0635\u0645 ", product.discount, "%"] }))] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'active'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'}`, children: product.status === 'active' ? 'نشط' : 'غير نشط' }) }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleTabSettings(product.id, 'featured', !product.featured), className: `p-1 rounded ${product.featured ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`, title: "\u0645\u0645\u064A\u0632\u0629", children: _jsx(HiStar, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => handleTabSettings(product.id, 'is_offer', !product.is_offer), className: `p-1 rounded ${product.is_offer ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`, title: "\u0639\u0631\u0636", children: _jsx(HiTag, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => handleTabSettings(product.id, 'is_bestseller', !product.is_bestseller), className: `p-1 rounded ${product.is_bestseller ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`, title: "\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B", children: _jsx(HiFire, { className: "w-4 h-4" }) })] }), product.sales_count > 0 && (_jsxs("div", { className: "text-xs text-gray-500 mt-1", children: ["\u0645\u0628\u064A\u0639\u0627\u062A: ", product.sales_count] }))] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { href: route('admin.products.show', product.id), className: "text-blue-600 hover:text-blue-900", children: _jsx(HiEye, { className: "w-4 h-4" }) }), _jsx(Link, { href: route('admin.products.edit', product.id), className: "text-green-600 hover:text-green-900", children: _jsx(HiPencil, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => {
                                                                            if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                                                                                router.delete(route('admin.products.destroy', product.id));
                                                                            }
                                                                        }, className: "text-red-600 hover:text-red-900", "aria-label": "\u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C", children: _jsx(HiTrash, { className: "w-4 h-4" }) })] }) })] }, product.id))) })] }) })] }) }) }) })] }));
};
export default Products;
