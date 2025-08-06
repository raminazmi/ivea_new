import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiFilter, HiEye } from 'react-icons/hi';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    status: string;
    sort_order: number;
    products_count: number;
    created_at: string;
}

interface CategoriesIndexProps {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: any;
    user: any;
}

const CategoriesIndex: React.FC<CategoriesIndexProps> = ({ categories, filters, user }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
        isVisible: boolean;
    }>({
        message: '',
        type: 'success',
        isVisible: false
    });

    const handleSearch = () => {
        router.get(route('admin.categories.index'), {
            search: searchTerm,
            status: statusFilter,
        });
    };

    const handleStatusChange = (categoryId: number, newStatus: string) => {
        router.patch(`/admin/categories/${categoryId}/status`, { status: newStatus }, {
            onSuccess: () => {
                router.reload();
            },
        });
    };

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (categoryToDelete) {
            router.delete(route('admin.categories.destroy', categoryToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
                    setToast({
                        message: 'تم حذف الفئة بنجاح',
                        type: 'success',
                        isVisible: true
                    });
                },
                onError: () => {
                    setToast({
                        message: 'حدث خطأ أثناء حذف الفئة',
                        type: 'error',
                        isVisible: true
                    });
                }
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
                {status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
        );
    };

    return (
        <AdminLayout user={user}>
            <Head title="إدارة الفئات" />

            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">إدارة الفئات</h1>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Link
                            href="/admin/categories/create"
                            className="bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <HiPlus className="w-4 h-4" />
                            إضافة فئة جديدة
                        </Link>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <HiFilter className="w-4 h-4" />
                            الفلاتر
                        </button>
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                                <div className="relative">
                                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="اسم الفئة..."
                                        className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                    title="فلتر الحالة"
                                    aria-label="فلتر الحالة"
                                >
                                    <option value="all">الكل</option>
                                    <option value="active">نشط</option>
                                    <option value="inactive">غير نشط</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                                >
                                    تطبيق الفلاتر
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الفئة
                                    </th>
                                    <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الوصف
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        عدد المنتجات
                                    </th>
                                    <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الترتيب
                                    </th>
                                    <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الحالة
                                    </th>
                                    <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        التاريخ
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.data.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">
                                                    {category.name}
                                                </div>
                                                <div className="text-sm text-gray-500 truncate max-w-32 sm:max-w-none">
                                                    {category.slug}
                                                </div>
                                                <div className="md:hidden text-sm text-gray-500">
                                                    {category.description || '-'}
                                                </div>
                                                <div className="md:hidden mt-1">
                                                    {getStatusBadge(category.status)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="max-w-xs truncate">
                                                {category.description || '-'}
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                {category.products_count}
                                            </span>
                                        </td>
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {category.sort_order}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(category.status)}
                                        </td>
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(category.created_at).toLocaleDateString('ar-SA')}
                                        </td>
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                                <Link
                                                    href={`/admin/categories/${category.id}`}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 flex items-center gap-1"
                                                    title="عرض"
                                                >
                                                    <HiEye className="w-4 h-4" />
                                                    <span className="hidden sm:inline">عرض</span>
                                                </Link>
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    className="text-primary-yellow hover:text-yellow-600 p-1 rounded hover:bg-yellow-50 flex items-center gap-1"
                                                    title="تعديل"
                                                >
                                                    <HiPencil className="w-4 h-4" />
                                                    <span className="hidden sm:inline">تعديل</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleStatusChange(category.id, category.status === 'active' ? 'inactive' : 'active')}
                                                    className={`${category.status === 'active'
                                                        ? 'text-red-600 hover:text-red-800'
                                                        : 'text-green-600 hover:text-green-800'
                                                        } p-1 rounded hover:bg-gray-50 flex items-center gap-1`}
                                                    title={category.status === 'active' ? 'إيقاف' : 'تفعيل'}
                                                >
                                                    <span className="hidden sm:inline">
                                                        {category.status === 'active' ? 'إيقاف' : 'تفعيل'}
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(category)}
                                                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 flex items-center gap-1"
                                                    title="حذف"
                                                >
                                                    <HiTrash className="w-4 h-4" />
                                                    <span className="hidden sm:inline">حذف</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {categories.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">لا توجد فئات متاحة</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {categories.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex space-x-2 rtl:space-x-reverse">
                            {Array.from({ length: categories.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => router.get(route('admin.categories.index'), { ...filters, page })}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        page === categories.current_page
                                            ? 'bg-primary-yellow text-gray-900'
                                            : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف الفئة "${categoryToDelete?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
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

export default CategoriesIndex;
