import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import { HiPlus, HiPencil, HiTrash, HiEye, HiSearch, HiFilter, HiDownload, HiMail, HiPhone, HiCalendar } from 'react-icons/hi';

interface ProjectQuiz {
    id: number;
    space_types: string[];
    product_needs: string[];
    preferred_styles: string[];
    name: string;
    email: string;
    phone: string;
    additional_notes?: string;
    created_at: string;
}

interface ProjectSubmission {
    id: number;
    name: string;
    email: string;
    phone: string;
    product_type: string;
    description: string;
    images: string[];
    created_at: string;
}

interface ProjectsProps {
    quizzes: {
        data: ProjectQuiz[];
        current_page: number;
        last_page: number;
        total: number;
    };
    submissions: {
        data: ProjectSubmission[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: any;
}

const SPACE_TYPES: Record<string, string> = {
    residential: 'سكني',
    offices: 'مكاتب',
    hotels: 'فنادق',
    shops: 'محلات',
    living_room: 'صالة المعيشة',
    bedroom: 'غرفة النوم',
    kitchen: 'المطبخ',
    office: 'المكتب',
    restaurant: 'مطعم',
    hotel: 'فندق',
    other: 'أخرى'
};

const PRODUCT_NEEDS: Record<string, string> = {
    curtains: 'ستائر',
    furniture: 'أثاث',
    sofas: 'كنب',
    cabinets: 'خزائن',
    doors: 'أبواب',
    woodwork: 'خشبيات',
    finishes: 'تشطيبات',
    other: 'أخرى'
};

const PREFERRED_STYLES: Record<string, string> = {
    modern: 'عصري',
    classic: 'كلاسيكي',
    minimalist: 'بساطة',
    luxury: 'فخم',
    other: 'أخرى'
};

const Projects: React.FC<ProjectsProps> = ({ quizzes, submissions, filters }) => {
    const { flash } = usePage().props as any;
    const [activeTab, setActiveTab] = useState<'quizzes' | 'submissions'>(filters.tab || 'quizzes');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<ProjectQuiz | ProjectSubmission | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [dateFilter, setDateFilter] = useState(filters.date || 'all');
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

    useEffect(() => {
        if (flash?.success) {
            setToast({
                message: flash.success,
                type: 'success',
                isVisible: true
            });
        } else if (flash?.error) {
            setToast({
                message: flash.error,
                type: 'error',
                isVisible: true
            });
        }
    }, [flash]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set('search', searchTerm);
        params.set('date', dateFilter);
        params.set('tab', activeTab);

        router.get(`/admin/projects?${params.toString()}`);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setDateFilter('all');
        router.get('/admin/projects');
    };

    const handleDelete = async (id: number) => {
        router.delete(`/admin/projects/${activeTab}/${id}`, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setItemToDelete(null);
                setSelectedItems([]);
            },
            onError: () => {
                setToast({
                    message: 'حدث خطأ أثناء الحذف',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) return;

        router.delete('/admin/projects/bulk-delete', {
            data: { ids: selectedItems, type: activeTab },
            onSuccess: () => {
                setSelectedItems([]);
            },
            onError: () => {
                setToast({
                    message: 'حدث خطأ أثناء الحذف',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    const handleExport = () => {
        window.location.href = `/admin/projects/export?type=${activeTab}`;
    };

    const toggleSelection = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const currentData = activeTab === 'quizzes' ? quizzes.data : submissions.data;
        if (selectedItems.length === currentData.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(currentData.map(item => item.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderQuizzesTable = () => (
        <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === quizzes.data.length && quizzes.data.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-300"
                                        title="تحديد جميع الاختبارات"
                                    />
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    المعلومات الشخصية
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    نوع المساحة
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    احتياجات المنتج
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الأساليب المفضلة
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    تاريخ الإرسال
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {quizzes.data.map((quiz) => (
                                <tr key={quiz.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(quiz.id)}
                                            onChange={() => toggleSelection(quiz.id)}
                                            className="rounded border-gray-300"
                                            title={`تحديد اختبار ${quiz.name}`}
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{quiz.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <HiMail className="w-4 h-4" />
                                                {quiz.email}
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <HiPhone className="w-4 h-4" />
                                                {quiz.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {quiz.space_types.map((type, index) => (
                                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {SPACE_TYPES[type] || type}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {quiz.product_needs.map((need, index) => (
                                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {PRODUCT_NEEDS[need] || need}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {quiz.preferred_styles.map((style, index) => (
                                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                    {PREFERRED_STYLES[style] || style}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center gap-1">
                                            <HiCalendar className="w-4 h-4 text-gray-400" />
                                            {formatDate(quiz.created_at)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/projects/quizzes/${quiz.id}`}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                title="عرض التفاصيل"
                                            >
                                                <HiEye className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setItemToDelete(quiz);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                title="حذف الاختبار"
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
    );

    const renderSubmissionsTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input
                                type="checkbox"
                                checked={selectedItems.length === submissions.data.length && submissions.data.length > 0}
                                onChange={toggleSelectAll}
                                className="rounded border-gray-300"
                                title="تحديد جميع المشاريع"
                            />
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            المعلومات الشخصية
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            نوع المنتج
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الوصف
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الصور
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            تاريخ الإرسال
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الإجراءات
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.data.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(submission.id)}
                                    onChange={() => toggleSelection(submission.id)}
                                    className="rounded border-gray-300"
                                    title={`تحديد مشروع ${submission.name}`}
                                />
                            </td>
                            <td className="px-4 py-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                        <HiMail className="w-4 h-4" />
                                        {submission.email}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                        <HiPhone className="w-4 h-4" />
                                        {submission.phone}
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    {submission.product_type}
                                </span>
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900 max-w-xs truncate" title={submission.description}>
                                    {submission.description}
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex -space-x-2">
                                    {submission.images.slice(0, 3).map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`صورة ${index + 1}`}
                                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                        />
                                    ))}
                                    {submission.images.length > 3 && (
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                                            +{submission.images.length - 3}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex items-center gap-1">
                                    <HiCalendar className="w-4 h-4 text-gray-400" />
                                    {formatDate(submission.created_at)}
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/projects/submissions/${submission.id}`}
                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                        title="عرض التفاصيل"
                                    >
                                        <HiEye className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setItemToDelete(submission);
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                        title="حذف المشروع"
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
    );

    return (
        <AdminLayout>
            <Head title="إدارة المشاريع والاختبارات" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">إدارة المشاريع والاختبارات</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            إدارة اختبارات الأسلوب ومشاريع العملاء المرسلة
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <HiSearch className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="mr-3">
                                <p className="text-sm font-medium text-blue-600">إجمالي الاختبارات</p>
                                <p className="text-2xl font-bold text-blue-900">{quizzes.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <HiPlus className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="mr-3">
                                <p className="text-sm font-medium text-green-600">المشاريع المرسلة</p>
                                <p className="text-2xl font-bold text-green-900">{submissions.total}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="البحث في البيانات..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                title="اختر فترة زمنية للفلترة"
                            >
                                <option value="all">جميع التواريخ</option>
                                <option value="today">اليوم</option>
                                <option value="week">هذا الأسبوع</option>
                                <option value="month">هذا الشهر</option>
                            </select>
                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                تطبيق الفلاتر
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                مسح الفلاتر
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6" aria-label="التبويبات">
                            <button
                                onClick={() => setActiveTab('quizzes')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quizzes'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                اختبارات الأسلوب ({quizzes.total})
                            </button>
                            <button
                                onClick={() => setActiveTab('submissions')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'submissions'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                المشاريع المرسلة ({submissions.total})
                            </button>
                        </nav>
                    </div>

                    {selectedItems.length > 0 && (
                        <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-700">
                                    تم تحديد {selectedItems.length} عنصر
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleBulkDelete}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                    >
                                        حذف المحدد
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6">
                        {activeTab === 'quizzes' ? renderQuizzesTable() : renderSubmissionsTable()}
                    </div>

                    {((activeTab === 'quizzes' && quizzes.last_page > 1) || (activeTab === 'submissions' && submissions.last_page > 1)) && (
                        <div className="px-6 py-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    صفحة {activeTab === 'quizzes' ? quizzes.current_page : submissions.current_page} من{' '}
                                    {activeTab === 'quizzes' ? quizzes.last_page : submissions.last_page}
                                </div>
                                <div className="flex gap-2">
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <ConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={() => itemToDelete && handleDelete(itemToDelete.id)}
                    title="تأكيد الحذف"
                    message="هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء."
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
            </div>
        </AdminLayout>
    );
};

export default Projects;
