import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
const CategoriesIndex = ({ categories, filters, user }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const handleSearch = () => {
        router.get('/admin/categories', {
            search: searchTerm,
            status: statusFilter,
        });
    };
    const handleStatusChange = (categoryId, newStatus) => {
        router.patch(`/admin/categories/${categoryId}/status`, { status: newStatus }, {
            onSuccess: () => {
                router.reload();
            },
        });
    };
    const handleDelete = (categoryId) => {
        if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
            router.delete(`/admin/categories/${categoryId}`, {
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };
    const getStatusBadge = (status) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-red-100 text-red-800',
        };
        return (_jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`, children: status === 'active' ? 'نشط' : 'غير نشط' }));
    };
    return (_jsxs(AdminLayout, { user: user, children: [_jsx(Head, { title: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0641\u0626\u0627\u062A" }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0641\u0626\u0627\u062A" }), _jsx(Link, { href: "/admin/categories/create", className: "bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors", children: "\u0625\u0636\u0627\u0641\u0629 \u0641\u0626\u0629 \u062C\u062F\u064A\u062F\u0629" })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0627\u0644\u0628\u062D\u062B" }), _jsx("input", { type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "\u0627\u0633\u0645 \u0627\u0644\u0641\u0626\u0629...", className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent", title: "\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629", children: [_jsx("option", { value: "all", children: "\u0627\u0644\u0643\u0644" }), _jsx("option", { value: "active", children: "\u0646\u0634\u0637" }), _jsx("option", { value: "inactive", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" })] })] })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { onClick: handleSearch, className: "bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors", children: "\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631" }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0641\u0626\u0629" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0648\u0635\u0641" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0639\u062F\u062F \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u062A\u0631\u062A\u064A\u0628" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: categories.data.map((category) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: category.name }), _jsx("div", { className: "text-sm text-gray-500", children: category.slug })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: category.description || '-' }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: _jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800", children: category.products_count }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: category.sort_order }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: getStatusBadge(category.status) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(category.created_at).toLocaleDateString('ar-SA') }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: _jsxs("div", { className: "flex space-x-2 rtl:space-x-reverse", children: [_jsx(Link, { href: `/admin/categories/${category.id}/edit`, className: "text-primary-yellow hover:text-yellow-600", children: "\u062A\u0639\u062F\u064A\u0644" }), _jsx("button", { onClick: () => handleStatusChange(category.id, category.status === 'active' ? 'inactive' : 'active'), className: `${category.status === 'active'
                                                                        ? 'text-red-600 hover:text-red-800'
                                                                        : 'text-green-600 hover:text-green-800'}`, children: category.status === 'active' ? 'إيقاف' : 'تفعيل' }), _jsx("button", { onClick: () => handleDelete(category.id), className: "text-red-600 hover:text-red-800", children: "\u062D\u0630\u0641" })] }) })] }, category.id))) })] }) }), categories.data.length === 0 && (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500 text-lg", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0626\u0627\u062A \u0645\u062A\u0627\u062D\u0629" }) }))] }), categories.last_page > 1 && (_jsx("div", { className: "mt-6 flex justify-center", children: _jsx("nav", { className: "flex space-x-2 rtl:space-x-reverse", children: Array.from({ length: categories.last_page }, (_, i) => i + 1).map((page) => (_jsx("button", { onClick: () => router.get('/admin/categories', { ...filters, page }), className: `px-3 py-2 text-sm font-medium rounded-lg ${page === categories.current_page
                                    ? 'bg-primary-yellow text-gray-900'
                                    : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`, children: page }, page))) }) }))] })] }));
};
export default CategoriesIndex;
