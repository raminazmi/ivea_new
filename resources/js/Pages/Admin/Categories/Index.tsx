import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiFilter, HiEye, HiRefresh } from 'react-icons/hi';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    status: string;
    sort_order: number;
    products_count: number;
    created_at: string;
    parent_id?: number;
    children?: Category[];
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
    const [searchTerm, setSearchTerm] = useState(filters?.search ?? '');
    const [statusFilter, setStatusFilter] = useState(filters?.status ?? 'all');
    const [perPage, setPerPage] = useState(filters?.per_page ?? 50);
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
            per_page: perPage,
        });
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        router.get(route('admin.categories.index'), {
            search: searchTerm,
            status: statusFilter,
            per_page: newPerPage,
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
            <Head title="إدارة الفئات">
                <style>{`
                    .categories-table::-webkit-scrollbar {
                        height: 8px;
                    }
                    .categories-table::-webkit-scrollbar-track {
                        background: #f9fafb;
                        border-radius: 4px;
                    }
                    .categories-table::-webkit-scrollbar-thumb {
                        background: #d1d5db;
                        border-radius: 4px;
                    }
                    .categories-table::-webkit-scrollbar-thumb:hover {
                        background: #9ca3af;
                    }
                `}</style>
            </Head>

            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">إدارة الفئات</h1>

                        {/* إحصائيات سريعة */}
                        <div className="flex flex-wrap gap-4 mt-3">
                            <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                                <span className="text-blue-800 text-sm">
                                    {categories.data.filter(cat => !cat.parent_id).length} فئة رئيسية
                                </span>
                            </div>
                            <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                                <span className="text-gray-800 text-sm">
                                    {categories.data.filter(cat => cat.parent_id).length} فئة فرعية
                                </span>
                            </div>
                            <div className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
                                <span className="text-green-800 text-sm">
                                    {categories.data.reduce((sum, cat) => sum + cat.products_count, 0)} منتج إجمالي
                                </span>
                            </div>
                        </div>
                    </div>
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

                {showFilters && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">عدد العناصر</label>
                                <select
                                    value={perPage}
                                    onChange={(e) => handlePerPageChange(Number(e.target.value))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                    title="عدد العناصر في الصفحة"
                                    aria-label="عدد العناصر في الصفحة"
                                >
                                    <option value={10}>10 عناصر</option>
                                    <option value={25}>25 عنصر</option>
                                    <option value={50}>50 عنصر</option>
                                    <option value={100}>100 عنصر</option>
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

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
                        <div className="overflow-x-auto border border-gray-200 rounded-lg categories-table" style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#d1d5db #f9fafb'
                        }}>
                            <table className="min-w-full divide-y divide-gray-200 table-fixed">
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
                                    {categories.data
                                        .filter(category => !category.parent_id)
                                        .sort((a, b) => a.sort_order - b.sort_order)
                                        .map((mainCategory) => (
                                            <React.Fragment key={`main-${mainCategory.id}`}>
                                                {/* Main Category Row */}
                                                <tr className="hover:bg-gray-50 bg-blue-50 border-l-4 border-blue-500">
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-bold text-gray-900 truncate max-w-32 sm:max-w-none flex items-center">
                                                                {mainCategory.name}
                                                            </div>
                                                            <div className="text-sm text-blue-600 truncate max-w-32 sm:max-w-none">
                                                                فئة رئيسية
                                                            </div>
                                                            <div className="md:hidden text-sm text-gray-500">
                                                                {mainCategory.description || '-'}
                                                            </div>
                                                            <div className="md:hidden mt-1">
                                                                {getStatusBadge(mainCategory.status)}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="max-w-xs truncate">
                                                            {mainCategory.description || '-'}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                            {/* Calculate total products including subcategories */}
                                                            {categories.data
                                                                .filter(sub => sub.parent_id === mainCategory.id)
                                                                .reduce((sum, sub) => sum + sub.products_count, 0) + mainCategory.products_count}
                                                        </span>
                                                    </td>
                                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(mainCategory.status)}
                                                    </td>
                                                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(mainCategory.created_at).toLocaleDateString('ar-EG')}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                                            <Link
                                                                href={`/admin/categories/${mainCategory.id}/edit`}
                                                                className="text-primary-yellow hover:text-yellow-600 p-1 rounded hover:bg-yellow-50 flex items-center gap-1"
                                                                title="تعديل"
                                                            >
                                                                <HiPencil className="w-4 h-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDeleteClick(mainCategory)}
                                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 flex items-center gap-1"
                                                                title="حذف"
                                                            >
                                                                <HiTrash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Subcategories */}
                                                {categories.data
                                                    .filter(subCategory => subCategory.parent_id === mainCategory.id)
                                                    .sort((a, b) => a.sort_order - b.sort_order)
                                                    .map((subCategory) => (
                                                        <tr key={`sub-${subCategory.id}`} className="hover:bg-gray-50 bg-gray-25 border-l-4 border-gray-300">
                                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                                <div className="pr-6">
                                                                    <div className="text-sm font-medium text-gray-800 truncate max-w-32 sm:max-w-none flex items-center">
                                                                        {subCategory.name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500 truncate max-w-32 sm:max-w-none">
                                                                        فئة فرعية
                                                                    </div>
                                                                    <div className="md:hidden text-sm text-gray-500 pr-6">
                                                                        {subCategory.description || '-'}
                                                                    </div>
                                                                    <div className="md:hidden mt-1 pr-6">
                                                                        {getStatusBadge(subCategory.status)}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                <div className="max-w-xs truncate">
                                                                    {subCategory.description || '-'}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                                                    {subCategory.products_count}
                                                                </span>
                                                            </td>
                                                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                                {getStatusBadge(subCategory.status)}
                                                            </td>
                                                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(subCategory.created_at).toLocaleDateString('ar-EG')}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                                                    <Link
                                                                        href={`/admin/categories/${subCategory.id}/edit`}
                                                                        className="text-primary-yellow hover:text-yellow-600 p-1 rounded hover:bg-yellow-50 flex items-center gap-1"
                                                                        title="تعديل"
                                                                    >
                                                                        <HiPencil className="w-4 h-4" />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleDeleteClick(subCategory)}
                                                                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 flex items-center gap-1"
                                                                        title="حذف"
                                                                    >
                                                                        <HiTrash className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        {categories.data.length === 0 && (
                            <div className="text-center py-12">
                                {searchTerm || statusFilter !== 'all' ? (
                                    <div>
                                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                        <p className="text-gray-500 text-lg mb-2">لا توجد نتائج للبحث</p>
                                        <p className="text-gray-400 text-sm mb-4">
                                            حاول تغيير كلمات البحث أو الفلاتر المحددة
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setStatusFilter('all');
                                                router.get(route('admin.categories.index'));
                                            }}
                                            className="bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                                        >
                                            إزالة الفلاتر
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-gray-400 text-6xl mb-4">📁</div>
                                        <p className="text-gray-500 text-lg mb-2">لا توجد فئات متاحة</p>
                                        <p className="text-gray-400 text-sm mb-4">
                                            ابدأ بإنشاء فئة رئيسية جديدة
                                        </p>
                                        <Link
                                            href="/admin/categories/create"
                                            className="inline-flex items-center bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors gap-2"
                                        >
                                            <HiPlus className="w-4 h-4" />
                                            إضافة فئة جديدة
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {categories.last_page > 1 && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button
                                        onClick={() => router.get(route('admin.categories.index'), {
                                            ...filters,
                                            page: categories.current_page > 1 ? categories.current_page - 1 : 1
                                        })}
                                        disabled={categories.current_page === 1}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        السابق
                                    </button>
                                    <button
                                        onClick={() => router.get(route('admin.categories.index'), {
                                            ...filters,
                                            page: categories.current_page < categories.last_page ? categories.current_page + 1 : categories.last_page
                                        })}
                                        disabled={categories.current_page === categories.last_page}
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        التالي
                                    </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            عرض{' '}
                                            <span className="font-medium">
                                                {((categories.current_page - 1) * perPage) + 1}
                                            </span>{' '}
                                            إلى{' '}
                                            <span className="font-medium">
                                                {Math.min(categories.current_page * perPage, categories.total)}
                                            </span>{' '}
                                            من{' '}
                                            <span className="font-medium">{categories.total}</span>{' '}
                                            فئة
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px rtl:space-x-reverse" aria-label="Pagination">
                                            {/* Previous button */}
                                            <button
                                                onClick={() => router.get(route('admin.categories.index'), {
                                                    ...filters,
                                                    page: categories.current_page > 1 ? categories.current_page - 1 : 1
                                                })}
                                                disabled={categories.current_page === 1}
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rtl:rounded-r-none rtl:rounded-l-md"
                                            >
                                                <span className="sr-only">السابق</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>

                                            {/* Page numbers */}
                                            {(() => {
                                                const pages = [];
                                                const totalPages = categories.last_page;
                                                const currentPage = categories.current_page;

                                                // Always show first page
                                                if (currentPage > 3) {
                                                    pages.push(
                                                        <button
                                                            key={1}
                                                            onClick={() => router.get(route('admin.categories.index'), { ...filters, page: 1 })}
                                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            1
                                                        </button>
                                                    );
                                                    if (currentPage > 4) {
                                                        pages.push(
                                                            <span key="start-ellipsis" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                                ...
                                                            </span>
                                                        );
                                                    }
                                                }

                                                // Show pages around current page
                                                const start = Math.max(1, currentPage - 2);
                                                const end = Math.min(totalPages, currentPage + 2);

                                                for (let page = start; page <= end; page++) {
                                                    pages.push(
                                                        <button
                                                            key={page}
                                                            onClick={() => router.get(route('admin.categories.index'), { ...filters, page })}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                                ? 'z-10 bg-primary-yellow border-primary-yellow text-gray-900'
                                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                }

                                                // Always show last page
                                                if (currentPage < totalPages - 2) {
                                                    if (currentPage < totalPages - 3) {
                                                        pages.push(
                                                            <span key="end-ellipsis" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                                ...
                                                            </span>
                                                        );
                                                    }
                                                    pages.push(
                                                        <button
                                                            key={totalPages}
                                                            onClick={() => router.get(route('admin.categories.index'), { ...filters, page: totalPages })}
                                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            {totalPages}
                                                        </button>
                                                    );
                                                }

                                                return pages;
                                            })()}

                                            {/* Next button */}
                                            <button
                                                onClick={() => router.get(route('admin.categories.index'), {
                                                    ...filters,
                                                    page: categories.current_page < categories.last_page ? categories.current_page + 1 : categories.last_page
                                                })}
                                                disabled={categories.current_page === categories.last_page}
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rtl:rounded-l-none rtl:rounded-r-md"
                                            >
                                                <span className="sr-only">التالي</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

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