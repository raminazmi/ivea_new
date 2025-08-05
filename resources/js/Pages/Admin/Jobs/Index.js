import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
const JobsIndex = ({ jobs, user }) => {
    const pageUser = usePage().props.auth?.user;
    const currentUser = user || pageUser;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'closed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'active':
                return 'نشط';
            case 'inactive':
                return 'غير نشط';
            case 'closed':
                return 'مغلق';
            default:
                return status;
        }
    };
    const getTypeText = (type) => {
        switch (type) {
            case 'full-time':
                return 'دوام كامل';
            case 'part-time':
                return 'دوام جزئي';
            case 'contract':
                return 'عقد مؤقت';
            default:
                return type;
        }
    };
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });
    const categories = [...new Set(jobs.map(job => job.category))];
    return (_jsx(AdminLayout, { title: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0648\u0638\u0627\u0626\u0641", user: currentUser, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0648\u0638\u0627\u0626\u0641" }), _jsx("p", { className: "mt-1 text-sm text-gray-600", children: "\u0625\u062F\u0627\u0631\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0642\u0639" })] }), _jsx("div", { className: "mt-4 sm:mt-0", children: _jsxs(Link, { href: "/admin/jobs/create", className: "inline-flex items-center px-4 py-2 bg-primary-yellow border border-transparent rounded-md font-semibold text-primary-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow transition-colors duration-200", children: [_jsx(FaPlus, { className: "w-4 h-4 ml-2" }), "\u0625\u0636\u0627\u0641\u0629 \u0648\u0638\u064A\u0641\u0629 \u062C\u062F\u064A\u062F\u0629"] }) })] }), _jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(FaSearch, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0648\u0638\u0627\u0626\u0641...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow" })] }), _jsxs("div", { className: "relative", children: [_jsx(FaFilter, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow appearance-none bg-white", title: "\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629", children: [_jsx("option", { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" }), _jsx("option", { value: "active", children: "\u0646\u0634\u0637" }), _jsx("option", { value: "inactive", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" }), _jsx("option", { value: "closed", children: "\u0645\u063A\u0644\u0642" })] })] }), _jsxs("div", { className: "relative", children: [_jsx(FaFilter, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow appearance-none bg-white", title: "\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629", children: [_jsx("option", { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A" }), categories.map(category => (_jsx("option", { value: category, children: category }, category)))] })] })] }) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", children: [_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsxs("h3", { className: "text-lg font-semibold text-gray-900", children: ["\u0627\u0644\u0648\u0638\u0627\u0626\u0641 (", filteredJobs.length, ")"] }) }), filteredJobs.length > 0 ? (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0648\u0638\u064A\u0641\u0629" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0646\u0648\u0639" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0641\u0626\u0629" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredJobs.map((job) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: job.title }), _jsx("div", { className: "text-sm text-gray-500", children: job.location || 'غير محدد' })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: "text-sm text-gray-900", children: getTypeText(job.type) }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: "text-sm text-gray-900", children: job.category }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`, children: getStatusText(job.status) }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(job.created_at).toLocaleDateString('ar-SA') }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: _jsxs("div", { className: "flex items-center space-x-2 rtl:space-x-reverse", children: [_jsx(Link, { href: `/admin/jobs/${job.id}`, className: "text-blue-600 hover:text-blue-900 p-1", title: "\u0639\u0631\u0636", children: _jsx(FaEye, { className: "w-4 h-4" }) }), _jsx(Link, { href: `/admin/jobs/${job.id}/edit`, className: "text-yellow-600 hover:text-yellow-900 p-1", title: "\u062A\u0639\u062F\u064A\u0644", children: _jsx(FaEdit, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => {
                                                                    if (confirm('هل أنت متأكد من حذف هذه الوظيفة؟')) {
                                                                    }
                                                                }, className: "text-red-600 hover:text-red-900 p-1", title: "\u062D\u0630\u0641", children: _jsx(FaTrash, { className: "w-4 h-4" }) })] }) })] }, job.id))) })] }) })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-400 mb-4", children: _jsx(FaSearch, { className: "w-12 h-12 mx-auto" }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0648\u0638\u0627\u0626\u0641" }), _jsx("p", { className: "text-gray-500", children: searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                                        ? 'جرب تغيير معايير البحث'
                                        : 'ابدأ بإضافة وظيفة جديدة' })] }))] })] }) }));
};
export default JobsIndex;
