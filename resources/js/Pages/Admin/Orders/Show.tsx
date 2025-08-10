import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { HiArrowRight, HiUser, HiLocationMarker, HiPhone, HiMail, HiCash, HiCalendar } from 'react-icons/hi';
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

interface OrderShowProps {
    order: Order;
}

const OrderShow: React.FC<OrderShowProps> = ({ order }) => {
    const [newStatus, setNewStatus] = useState(order.status);
    const [updating, setUpdating] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toast, setToast] = useState({
        message: '',
        type: 'success' as 'success' | 'error',
        isVisible: false
    });

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
        processing: 'bg-purple-100 text-purple-800 border-purple-200',
        shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        delivered: 'bg-green-100 text-green-800 border-green-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200'
    };

    const statusLabels = {
        pending: 'قيد الانتظار',
        confirmed: 'مؤكد',
        processing: 'قيد المعالجة',
        shipped: 'تم الشحن',
        delivered: 'تم التوصيل',
        cancelled: 'ملغي'
    };

    const handleUpdateStatus = () => {
        if (newStatus === order.status) return;

        setUpdating(true);
        router.put(route('admin.orders.update-status', order.id),
            { status: newStatus },
            {
                onSuccess: () => {
                    setUpdating(false);
                },
                onError: () => {
                    setUpdating(false);
                    setNewStatus(order.status);
                }
            }
        );
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        router.delete(route('admin.orders.destroy', order.id), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setToast({
                    message: 'تم حذف الطلب بنجاح',
                    type: 'success',
                    isVisible: true
                });
                // Redirect to orders index after successful deletion
                setTimeout(() => {
                    router.visit(route('admin.orders.index'));
                }, 1500);
            },
            onError: () => {
                setShowDeleteModal(false);
                setToast({
                    message: 'حدث خطأ أثناء حذف الطلب',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    return (
        <AdminLayout>
            <Head title={`طلب #${order.order_number}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.orders.index')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <HiArrowRight className="text-xl" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">طلب #{order.order_number}</h1>
                            <p className="text-gray-600">تاريخ الطلب: {formatDate(order.created_at)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-2 text-sm font-medium rounded-lg border ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">معلومات العميل</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <HiUser className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">الاسم</p>
                                        <p className="font-medium">{order.first_name} {order.last_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <HiMail className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                                        <p className="font-medium">{order.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <HiPhone className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">رقم الهاتف</p>
                                        <p className="font-medium">{order.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <HiLocationMarker className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">المدينة</p>
                                        <p className="font-medium">{order.city}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-1">العنوان التفصيلي</p>
                                <p className="font-medium">{order.address}</p>
                            </div>
                            {order.notes && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-1">ملاحظات العميل</p>
                                    <p className="font-medium bg-gray-50 p-3 rounded-lg">{order.notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">عناصر الطلب</h2>
                            <div className="space-y-4">
                                {order.cart_items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            )}
                                            <div>
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900">{(Number(item.price) * Number(item.quantity)).toFixed(2)} ر.س</p>
                                            <p className="text-sm text-gray-600">{Number(item.price).toFixed(2)} ر.س / القطعة</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">ملخص الطلب</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">عدد العناصر:</span>
                                    <span className="font-medium">{order.total_items}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
                                    <span>المجموع الكلي:</span>
                                    <span className="text-blue-600">{Number(order.total_amount || 0).toFixed(2)} ر.س</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">تحديث حالة الطلب</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الحالة الحالية</label>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value as any)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="pending">قيد الانتظار</option>
                                        <option value="confirmed">مؤكد</option>
                                        <option value="processing">قيد المعالجة</option>
                                        <option value="shipped">تم الشحن</option>
                                        <option value="delivered">تم التوصيل</option>
                                        <option value="cancelled">ملغي</option>
                                    </select>
                                </div>
                                {newStatus !== order.status && (
                                    <button
                                        onClick={handleUpdateStatus}
                                        disabled={updating}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {updating ? 'جاري التحديث...' : 'تحديث الحالة'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">الجدول الزمني</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <HiCalendar className="text-gray-400" />
                                    <div>
                                        <p className="font-medium">تم إنشاء الطلب</p>
                                        <p className="text-gray-600">{formatDate(order.created_at, true)}</p>
                                    </div>
                                </div>
                                {order.confirmed_at && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <HiCalendar className="text-blue-400" />
                                        <div>
                                            <p className="font-medium">تم التأكيد</p>
                                            <p className="text-gray-600">{formatDate(order.confirmed_at, true)}</p>
                                        </div>
                                    </div>
                                )}
                                {order.updated_at !== order.created_at && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <HiCalendar className="text-green-400" />
                                        <div>
                                            <p className="font-medium">آخر تحديث</p>
                                            <p className="text-gray-600">{formatDate(order.updated_at, true)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={handleDelete}
                                    className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    حذف الطلب
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف الطلب #${order.order_number}؟ لا يمكن التراجع عن هذا الإجراء.`}
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

export default OrderShow;
