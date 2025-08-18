import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { HiPlus, HiEye, HiTrash, HiDownload, HiFilter, HiSearch } from 'react-icons/hi';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import { formatDate } from '@/Utils/dateUtils';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    color?: string;
    colorName?: string;
    customizations?: Record<string, {
        type: string;
        label: string;
        value?: any;
        values?: any[];
        displayValue?: string;
        displayValues?: string[];
        width?: number;
        height?: number;
        length?: number;
        unit?: string;
    }>;
    uploadedFiles?: Array<{
        name: string;
        size?: number;
        type?: string;
    }> | string[];
    cartId?: string;
}

interface Order {
    id: number;
    order_number: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    total_amount: number;
    total_items: number;
    cart_items: CartItem[];
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    notes?: string;
    confirmed_at?: string;
    created_at: string;
    updated_at: string;
}

interface OrdersIndexProps {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    statistics: {
        total: number;
        pending: number;
        confirmed: number;
        processing: number;
        shipped: number;
        delivered: number;
        cancelled: number;
        total_amount: number;
    };
    filters: {
        search?: string;
        status?: string;
        date_from?: string;
        date_to?: string;
    };
}

const OrdersIndex: React.FC<OrdersIndexProps> = ({ orders, statistics, filters }) => {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [dateFrom, setDateFrom] = useState(filters?.date_from || '');
    const [dateTo, setDateTo] = useState(filters?.date_to || '');
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toast, setToast] = useState({
        message: '',
        type: 'success' as 'success' | 'error',
        isVisible: false
    });

    const safeOrders = orders || { data: [], current_page: 1, last_page: 1, per_page: 10, total: 0 };
    const safeStatistics = statistics || {
        total: 0, pending: 0, confirmed: 0, processing: 0,
        shipped: 0, delivered: 0, cancelled: 0, total_amount: 0
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        processing: 'bg-purple-100 text-purple-800',
        shipped: 'bg-indigo-100 text-indigo-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    const statusLabels = {
        pending: 'قيد الانتظار',
        confirmed: 'مؤكد',
        processing: 'قيد المعالجة',
        shipped: 'تم الشحن',
        delivered: 'تم التوصيل',
        cancelled: 'ملغي'
    };

    const handleSearch = () => {
        router.get(route('admin.orders.index'), {
            search,
            status,
            date_from: dateFrom,
            date_to: dateTo,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('');
        setDateFrom('');
        setDateTo('');
        router.get(route('admin.orders.index'));
    };

    const handleBulkDelete = () => {
        if (selectedOrders.length === 0) return;
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        console.log('Attempting to delete orders:', selectedOrders);
        router.delete(route('admin.orders.bulk-delete'), {
            data: { order_ids: selectedOrders },
            onSuccess: () => {
                console.log('Delete successful');
                setShowDeleteModal(false);
                setSelectedOrders([]);
                setToast({
                    message: `تم حذف ${selectedOrders.length} طلب بنجاح`,
                    type: 'success',
                    isVisible: true
                });
            },
            onError: (errors) => {
                console.error('Delete failed:', errors);
                setShowDeleteModal(false);
                setToast({
                    message: 'حدث خطأ أثناء حذف الطلبات',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedOrders(safeOrders.data.map(order => order.id));
        } else {
            setSelectedOrders([]);
        }
    };

    const handleSelectOrder = (orderId: number, checked: boolean) => {
        if (checked) {
            setSelectedOrders([...selectedOrders, orderId]);
        } else {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        }
    };

    return (
        <AdminLayout>
            <Head title="إدارة الطلبات" />

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-gray-900">{safeStatistics.total}</div>
                        <div className="text-sm text-gray-600">إجمالي الطلبات</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-yellow-600">{safeStatistics.pending}</div>
                        <div className="text-sm text-gray-600">قيد الانتظار</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-blue-600">{safeStatistics.confirmed}</div>
                        <div className="text-sm text-gray-600">مؤكدة</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-purple-600">{safeStatistics.processing}</div>
                        <div className="text-sm text-gray-600">قيد المعالجة</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-indigo-600">{safeStatistics.shipped}</div>
                        <div className="text-sm text-gray-600">تم الشحن</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-green-600">{safeStatistics.delivered}</div>
                        <div className="text-sm text-gray-600">تم التوصيل</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-red-600">{safeStatistics.cancelled}</div>
                        <div className="text-sm text-gray-600">ملغية</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-gray-900">{Number(safeStatistics.total_amount || 0).toFixed(2)}</div>
                        <div className="text-sm text-gray-600">المبلغ الإجمالي (ر.س)</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="رقم الطلب، اسم العميل، البريد..."
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <HiSearch className="absolute left-3 top-2.5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">جميع الحالات</option>
                                <option value="pending">قيد الانتظار</option>
                                <option value="confirmed">مؤكد</option>
                                <option value="processing">قيد المعالجة</option>
                                <option value="shipped">تم الشحن</option>
                                <option value="delivered">تم التوصيل</option>
                                <option value="cancelled">ملغي</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">من تاريخ</label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">إلى تاريخ</label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <div className="flex space-x-2">
                            {selectedOrders.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <HiTrash className="inline ml-1" />
                                    حذف المحدد ({selectedOrders.length})
                                </button>
                            )}
                        </div>
                        <div className="text-sm text-gray-600">
                            عرض {safeOrders.data.length} من {safeOrders.total} طلب
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.length === safeOrders.data.length && safeOrders.data.length > 0}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الطلب</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العناصر</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {safeOrders.data.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes(order.id)}
                                                onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{order.order_number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {order.first_name} {order.last_name}
                                            </div>
                                            <div className="text-sm text-gray-500">{order.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {Number(order.total_amount || 0).toFixed(2)} ر.س
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {order.total_items} عنصر
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                                                {statusLabels[order.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(order.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={route('admin.orders.show', order.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <HiEye className="inline" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {safeOrders.last_page > 1 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                عرض {((safeOrders.current_page - 1) * safeOrders.per_page) + 1} إلى {Math.min(safeOrders.current_page * safeOrders.per_page, safeOrders.total)} من {safeOrders.total} نتيجة
                            </div>
                            <div className="flex space-x-2">
                                {Array.from({ length: safeOrders.last_page }, (_, i) => i + 1).map((page) => (
                                    <Link
                                        key={page}
                                        href={route('admin.orders.index', { page, search, status, date_from: dateFrom, date_to: dateTo })}
                                        className={`px-3 py-2 rounded-lg text-sm ${page === safeOrders.current_page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {page}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف ${selectedOrders.length} طلب؟ لا يمكن التراجع عن هذا الإجراء.`}
                confirmText="حذف"
                cancelText="إلغاء"
                type="danger"
            />

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

export default OrdersIndex;
