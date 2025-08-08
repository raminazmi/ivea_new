import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import { HiPlus, HiPencil, HiTrash, HiEye, HiSearch, HiFilter } from 'react-icons/hi';

interface Article {
    id: number;
    title: string;
    category_id: number;
    date: string;
    read_time: number;
    is_published: boolean;
    featured: boolean;
    sort_order: number;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
}

interface ArticlesIndexProps {
    articles: {
        data: Article[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
}

const ArticlesIndex: React.FC<ArticlesIndexProps> = ({ articles, categories }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
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

    const handleDeleteClick = (article: Article) => {
        setArticleToDelete(article);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (articleToDelete) {
            router.delete(route('admin.articles.destroy', articleToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setArticleToDelete(null);
                    setToast({
                        message: 'تم حذف المقال بنجاح',
                        type: 'success',
                        isVisible: true
                    });
                },
                onError: () => {
                    setToast({
                        message: 'حدث خطأ أثناء حذف المقال',
                        type: 'error',
                        isVisible: true
                    });
                }
            });
        }
    };

    const togglePublished = (id: number, currentStatus: boolean) => {
        router.put(route('admin.articles.update', id), {
            is_published: !currentStatus
        }, {
            onSuccess: () => {
                setToast({
                    message: 'تم تحديث حالة النشر بنجاح',
                    type: 'success',
                    isVisible: true
                });
                router.reload();
            },
            onError: () => {
                setToast({
                    message: 'حدث خطأ أثناء تحديث حالة النشر',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    const toggleFeatured = (id: number, currentStatus: boolean) => {
        router.put(route('admin.articles.update', id), {
            featured: !currentStatus
        }, {
            onSuccess: () => {
                setToast({
                    message: 'تم تحديث حالة التميز بنجاح',
                    type: 'success',
                    isVisible: true
                });
                router.reload();
            },
            onError: () => {
                setToast({
                    message: 'حدث خطأ أثناء تحديث حالة التميز',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    const handleSearch = () => {
        router.get(route('admin.articles.index'), {
            search: searchTerm,
            status: statusFilter,
        });
    };

    const getCategoryName = (id: number) => {
        if (!categories || !Array.isArray(categories)) return 'غير محدد';
        const category = categories.find(c => c.id === id);
        return category ? category.name : 'غير محدد';
    };

    return (
        <AdminLayout>
            <Head title="إدارة المقالات" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">إدارة المقالات</h2>
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <Link
                                        href={route('admin.articles.create')}
                                        className="bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <HiPlus className="w-4 h-4" />
                                        إضافة مقالة جديدة
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
                                                    placeholder="عنوان المقالة..."
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
                                                <option value="published">منشورة</option>
                                                <option value="draft">مسودة</option>
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

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                العنوان
                                            </th>
                                            <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الفئة
                                            </th>
                                            <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                التاريخ
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الحالة
                                            </th>
                                            <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                مميزة
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الإجراءات
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {articles.data.map((article) => (
                                            <tr key={article.id} className="hover:bg-gray-50">
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">
                                                            {article.title}
                                                        </div>
                                                        <div className="md:hidden text-sm text-gray-500">
                                                            {article.category_id}
                                                        </div>
                                                        <div className="lg:hidden text-sm text-gray-500">
                                                            {new Date(article.date).toLocaleDateString('ar-SA')}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {getCategoryName(Number(article.category_id))}
                                                    </span>
                                                </td>
                                                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(article.date).toLocaleDateString('ar-SA')}
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => togglePublished(article.id, article.is_published)}
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${article.is_published
                                                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                            }`}
                                                        title={article.is_published ? 'إلغاء النشر' : 'نشر'}
                                                    >
                                                        {article.is_published ? 'منشورة' : 'مسودة'}
                                                    </button>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => toggleFeatured(article.id, article.featured)}
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${article.featured
                                                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                            }`}
                                                        title={article.featured ? 'إلغاء التميز' : 'تعيين كمميزة'}
                                                    >
                                                        {article.featured ? 'مميزة' : 'عادية'}
                                                    </button>
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-1 sm:gap-2">
                                                        <Link
                                                            href={route('admin.articles.show', article.id)}
                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                            title="عرض"
                                                        >
                                                            <HiEye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.articles.edit', article.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                                            title="تعديل"
                                                        >
                                                            <HiPencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(article)}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                            title="حذف المقالة"
                                                        >
                                                            <HiTrash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {articles.data.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">لا توجد مقالات متاحة</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {articles.last_page > 1 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex space-x-2 rtl:space-x-reverse">
                                        {Array.from({ length: articles.last_page }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => router.get(route('admin.articles.index'), { page })}
                                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${page === articles.current_page
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
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setArticleToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف المقالة "${articleToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`}
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

export default ArticlesIndex;