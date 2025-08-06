import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaSearch,
    FaFilter
} from 'react-icons/fa';

interface Job {
    id: number;
    title: string;
    description: string;
    type: 'full-time' | 'part-time' | 'contract';
    category: string;
    location?: string;
    status: 'active' | 'inactive' | 'closed';
    created_at: string;
    updated_at: string;
}

interface JobsIndexProps {
    jobs: Job[];
    user?: {
        id: number;
        name: string;
        email: string;
        is_admin: boolean;
    };
}

const JobsIndex: React.FC<JobsIndexProps> = ({ jobs, user }) => {
    const pageUser = usePage().props.auth?.user;
    const currentUser = user || pageUser;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
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

    const getStatusColor = (status: string) => {
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

    const getStatusText = (status: string) => {
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

    const getTypeText = (type: string) => {
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

    const handleDeleteClick = (job: Job) => {
        setJobToDelete(job);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (jobToDelete) {
            router.delete(route('admin.jobs.destroy', jobToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setJobToDelete(null);
                    setToast({
                        message: 'تم حذف الوظيفة بنجاح',
                        type: 'success',
                        isVisible: true
                    });
                },
                onError: () => {
                    setToast({
                        message: 'حدث خطأ أثناء حذف الوظيفة',
                        type: 'error',
                        isVisible: true
                    });
                }
            });
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

    return (
        <AdminLayout title="إدارة الوظائف" user={currentUser}>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">إدارة الوظائف</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            إدارة جميع الوظائف المتاحة في الموقع
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Link
                            href="/admin/jobs/create"
                            className="inline-flex items-center justify-center px-4 py-2 bg-primary-yellow border border-transparent rounded-md font-semibold text-primary-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow transition-colors duration-200 text-sm sm:text-base"
                        >
                            <FaPlus className="w-4 h-4 ml-2" />
                            إضافة وظيفة جديدة
                        </Link>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white border border-transparent rounded-md font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 text-sm sm:text-base"
                        >
                            <FaFilter className="w-4 h-4 ml-2" />
                            الفلاتر
                        </button>
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="البحث في الوظائف..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                />
                            </div>

                            <div className="relative">
                                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow appearance-none bg-white"
                                    title="تصفية حسب الحالة"
                                    aria-label="تصفية حسب الحالة"
                                >
                                    <option value="all">جميع الحالات</option>
                                    <option value="active">نشط</option>
                                    <option value="inactive">غير نشط</option>
                                    <option value="closed">مغلق</option>
                                </select>
                            </div>

                            <div className="relative">
                                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow appearance-none bg-white"
                                    title="تصفية حسب الفئة"
                                    aria-label="تصفية حسب الفئة"
                                >
                                    <option value="all">جميع الفئات</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            الوظائف ({filteredJobs.length})
                        </h3>
                    </div>

                    {filteredJobs.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الوظيفة
                                        </th>
                                        <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            النوع
                                        </th>
                                        <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الفئة
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                    {filteredJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50">
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">
                                                        {job.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500 truncate max-w-32 sm:max-w-none">
                                                        {job.location || 'غير محدد'}
                                                    </div>
                                                    <div className="md:hidden text-sm text-gray-500">
                                                        {getTypeText(job.type)}
                                                    </div>
                                                    <div className="lg:hidden text-sm text-gray-500">
                                                        {job.category}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{getTypeText(job.type)}</span>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{job.category}</span>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                                                    {getStatusText(job.status)}
                                                </span>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(job.created_at).toLocaleDateString('ar-SA')}
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-1 sm:gap-2">
                                                    <Link
                                                        href={route('admin.jobs.show', job.id)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                        title="عرض"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={route('admin.jobs.edit', job.id)}
                                                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                                                        title="تعديل"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(job)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                        title="حذف"
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <FaSearch className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد وظائف</h3>
                            <p className="text-gray-500">
                                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                                    ? 'جرب تغيير معايير البحث'
                                    : 'ابدأ بإضافة وظيفة جديدة'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setJobToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف الوظيفة "${jobToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`}
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

export default JobsIndex; 