import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { HiPlus, HiPencil, HiTrash, HiEye, HiEyeOff, HiStar, HiOutlineStar, HiSearch, HiFilter } from 'react-icons/hi';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';

interface Tool {
    id: number;
    title: string;
    slug: string;
    category: string;
    date: string;
    readTime: string;
    isPublished: boolean;
    featured: boolean;
    sortOrder: number;
    createdAt: string;
}

interface ToolsIndexProps {
    tools: Tool[];
}

const ToolsIndex: React.FC<ToolsIndexProps> = ({ tools }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toolToDelete, setToolToDelete] = useState<Tool | null>(null);
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

    const handleTogglePublished = (toolId: number) => {
        router.patch(route('admin.tools.toggle-published', toolId), {}, {
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

    const handleToggleFeatured = (toolId: number) => {
        router.patch(route('admin.tools.toggle-featured', toolId), {}, {
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

    const handleDeleteClick = (tool: Tool) => {
        setToolToDelete(tool);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (toolToDelete) {
            router.delete(route('admin.tools.destroy', toolToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setToolToDelete(null);
                    setToast({
                        message: 'تم حذف الأداة بنجاح',
                        type: 'success',
                        isVisible: true
                    });
                },
                onError: () => {
                    setToast({
                        message: 'حدث خطأ أثناء حذف الأداة',
                        type: 'error',
                        isVisible: true
                    });
                }
            });
        }
    };

    const handleSearch = () => {
        router.get(route('admin.tools.index'), {
            search: searchTerm,
            status: statusFilter,
        });
    };

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'published' && tool.isPublished) ||
            (statusFilter === 'draft' && !tool.isPublished);

        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>
            <Head title="إدارة أدوات وإرشادات" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">إدارة أدوات وإرشادات</h2>
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <Link
                                        href={route('admin.tools.create')}
                                        className="bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <HiPlus className="w-4 h-4" />
                                        إضافة أداة جديدة
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
                                                    placeholder="عنوان الأداة..."
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
                                                <option value="published">منشور</option>
                                                <option value="draft">مسودة</option>
                                            </select>
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                onClick={handleSearch}
                                                className="w-full bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
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
                                                مميز
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الإجراءات
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredTools.map((tool) => (
                                            <tr key={tool.id} className="hover:bg-gray-50">
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">
                                                            {tool.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500 truncate max-w-32 sm:max-w-none">
                                                            {tool.slug}
                                                        </div>
                                                        <div className="md:hidden text-xs text-gray-500">
                                                            {tool.category}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        {tool.category}
                                                    </span>
                                                </td>
                                                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {tool.date}
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleTogglePublished(tool.id)}
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${tool.isPublished
                                                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                            }`}
                                                        title={tool.isPublished ? 'إلغاء النشر' : 'نشر'}
                                                    >
                                                        {tool.isPublished ? (
                                                            <>
                                                                <HiEye className="w-3 h-3 ml-1" />
                                                                منشور
                                                            </>
                                                        ) : (
                                                            <>
                                                                <HiEyeOff className="w-3 h-3 ml-1" />
                                                                مسودة
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleToggleFeatured(tool.id)}
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${tool.featured
                                                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                            }`}
                                                        title={tool.featured ? 'إلغاء التميز' : 'تعيين كمميز'}
                                                    >
                                                        {tool.featured ? (
                                                            <>
                                                                <HiStar className="w-3 h-3 ml-1" />
                                                                مميز
                                                            </>
                                                        ) : (
                                                            <>
                                                                <HiOutlineStar className="w-3 h-3 ml-1" />
                                                                عادي
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-1 sm:gap-2">
                                                        <Link
                                                            href={route('admin.tools.edit', tool.id)}
                                                            className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                                                            title="تعديل"
                                                        >
                                                            <HiPencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(tool)}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                            title="حذف الأداة"
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

                            {filteredTools.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">لا توجد أدوات وإرشادات حتى الآن</p>
                                    <Link
                                        href={route('admin.tools.create')}
                                        className="mt-4 inline-flex items-center px-4 py-2 bg-primary-yellow hover:bg-yellow-400 text-gray-900 rounded-lg transition-colors"
                                    >
                                        <HiPlus className="w-4 h-4 ml-2" />
                                        إضافة أول أداة
                                    </Link>
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
                    setToolToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف الأداة "${toolToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`}
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

export default ToolsIndex; 