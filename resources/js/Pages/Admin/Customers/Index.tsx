import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { HiSearch, HiDownload, HiFilter, HiEye, HiMail, HiPhone } from 'react-icons/hi';
import AdminLayout from '@/Layouts/AdminLayout';
import Toast from '@/Components/Common/Toast';
import { formatDate } from '@/Utils/dateUtils';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    total_orders: number;
    total_spent: number;
    last_order_date?: string;
    created_at: string;
}

interface CustomersIndexProps {
    customers: {
        data: Customer[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    statistics: {
        total_customers: number;
        active_customers: number;
        total_revenue: number;
        average_order_value: number;
    };
    filters: {
        search?: string;
        date_from?: string;
        date_to?: string;
    };
}

const CustomersIndex: React.FC<CustomersIndexProps> = ({ customers, statistics, filters }) => {
    const [search, setSearch] = useState(filters?.search || '');
    const [dateFrom, setDateFrom] = useState(filters?.date_from || '');
    const [dateTo, setDateTo] = useState(filters?.date_to || '');
    const [toast, setToast] = useState({
        message: '',
        type: 'success' as 'success' | 'error',
        isVisible: false
    });

    const safeCustomers = customers || { data: [], current_page: 1, last_page: 1, per_page: 10, total: 0 };
    const safeStatistics = statistics || {
        total_customers: 0,
        active_customers: 0,
        total_revenue: 0,
        average_order_value: 0
    };

    const handleSearch = () => {
        router.get(route('admin.customers.index'), {
            search,
            date_from: dateFrom,
            date_to: dateTo,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setDateFrom('');
        setDateTo('');
        router.get(route('admin.customers.index'));
    };

    const handleExportExcel = () => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (dateFrom) params.append('date_from', dateFrom);
        if (dateTo) params.append('date_to', dateTo);
        
        const url = `${route('admin.customers.export')}?${params.toString()}`;
        window.open(url, '_blank');
    };

    return (
        <AdminLayout>
            <Head title="إدارة العملاء" />

            <div className="space-y-6">
                {/* إحصائيات العملاء */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-gray-900">{safeStatistics.total_customers}</div>
                        <div className="text-sm text-gray-600">إجمالي العملاء</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-blue-600">{safeStatistics.active_customers}</div>
                        <div className="text-sm text-gray-600">العملاء النشطون</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-green-600">{Number(safeStatistics.total_revenue || 0).toFixed(2)}</div>
                        <div className="text-sm text-gray-600">إجمالي الإيرادات (ر.س)</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-purple-600">{Number(safeStatistics.average_order_value || 0).toFixed(2)}</div>
                        <div className="text-sm text-gray-600">متوسط قيمة الطلب (ر.س)</div>
                    </div>
                </div>

                {/* فلاتر البحث */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="اسم العميل، البريد الإلكتروني..."
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <HiSearch className="absolute left-3 top-2.5 text-gray-400" />
                            </div>
                        </div>
                                                 <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">من تاريخ</label>
                             <input
                                 type="date"
                                 value={dateFrom}
                                 onChange={(e) => setDateFrom(e.target.value)}
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 title="اختر تاريخ البداية"
                                 aria-label="تاريخ البداية"
                             />
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">إلى تاريخ</label>
                             <input
                                 type="date"
                                 value={dateTo}
                                 onChange={(e) => setDateTo(e.target.value)}
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 title="اختر تاريخ النهاية"
                                 aria-label="تاريخ النهاية"
                             />
                         </div>
                        <div className="flex items-end gap-2">
                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <HiFilter className="inline ml-1" />
                                فلترة
                            </button>
                            <button
                                onClick={clearFilters}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                مسح
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleExportExcel}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                        >
                            <HiDownload className="w-4 h-4" />
                            تصدير Excel
                        </button>
                        <div className="text-sm text-gray-600">
                            عرض {safeCustomers.data.length} من {safeCustomers.total} عميل
                        </div>
                    </div>
                </div>

                {/* جدول العملاء */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        العميل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        معلومات التواصل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        عدد الطلبات
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        إجمالي الإنفاق
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        آخر طلب
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        تاريخ التسجيل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {safeCustomers.data.length > 0 ? (
                                    safeCustomers.data.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {customer.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <HiMail className="w-4 h-4 text-gray-400" />
                                                        {customer.email}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <HiPhone className="w-4 h-4 text-gray-400" />
                                                        {customer.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {customer.total_orders} طلب
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {Number(customer.total_spent || 0).toFixed(2)} ر.س
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {customer.last_order_date ? formatDate(customer.last_order_date) : 'لا يوجد'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {formatDate(customer.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route('admin.customers.show', customer.id)}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                    title="عرض تفاصيل العميل"
                                                >
                                                    <HiEye className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                            لا توجد عملاء
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ترقيم الصفحات */}
                {safeCustomers.last_page > 1 && (
                    <div className="bg-white rounded-lg shadow px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                صفحة {safeCustomers.current_page} من {safeCustomers.last_page}
                            </div>
                            <div className="flex gap-2">
                                {safeCustomers.current_page > 1 && (
                                    <Link
                                        href={route('admin.customers.index', { page: safeCustomers.current_page - 1, ...filters })}
                                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    >
                                        السابق
                                    </Link>
                                )}
                                {safeCustomers.current_page < safeCustomers.last_page && (
                                    <Link
                                        href={route('admin.customers.index', { page: safeCustomers.current_page + 1, ...filters })}
                                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    >
                                        التالي
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {toast.isVisible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
                />
            )}
        </AdminLayout>
    );
};

export default CustomersIndex;
