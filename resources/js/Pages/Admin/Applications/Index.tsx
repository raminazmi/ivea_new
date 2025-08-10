import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import {
    FaEye,
    FaDownload,
    FaCheck,
    FaTimes,
    FaSearch,
    FaFilter,
    FaUser,
    FaBriefcase,
    FaTrash
} from 'react-icons/fa';

interface JobApplication {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    cover_letter?: string;
    cv_file: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    created_at: string;
    job: {
        id: number;
        title: string;
    };
}

interface ApplicationsIndexProps {
    applications: JobApplication[];
    user?: {
        id: number;
        name: string;
        email: string;
        is_admin: boolean;
    };
}

const ApplicationsIndex: React.FC<ApplicationsIndexProps> = ({ applications, user }) => {
    const pageUser = usePage().props.auth?.user;
    const currentUser = user || pageUser;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [applicationToDelete, setApplicationToDelete] = useState<JobApplication | null>(null);
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
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'reviewed':
                return 'bg-blue-100 text-blue-800';
            case 'accepted':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'في الانتظار';
            case 'reviewed':
                return 'تمت المراجعة';
            case 'accepted':
                return 'مقبول';
            case 'rejected':
                return 'مرفوض';
            default:
                return status;
        }
    };

    const handleDeleteClick = (application: JobApplication) => {
        setApplicationToDelete(application);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (applicationToDelete) {
            router.delete(route('admin.applications.destroy', applicationToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setApplicationToDelete(null);
                    setToast({
                        message: 'تم حذف التقديم بنجاح',
                        type: 'success',
                        isVisible: true
                    });
                },
                onError: () => {
                    setToast({
                        message: 'حدث خطأ أثناء حذف التقديم',
                        type: 'error',
                        isVisible: true
                    });
                }
            });
        }
    };

    const filteredApplications = applications.filter(application => {
        const matchesSearch =
            application.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const updateStatus = (applicationId: number, newStatus: string) => {
        router.put(route('admin.applications.update-status', applicationId), { status: newStatus }, {
            onSuccess: () => {
                setToast({
                    message: 'تم تحديث حالة التقديم بنجاح',
                    type: 'success',
                    isVisible: true
                });
                router.reload();
            },
            onError: () => {
                setToast({
                    message: 'حدث خطأ أثناء تحديث حالة التقديم',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    return (
        <AdminLayout title="إدارة التقديمات" user={currentUser}>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">إدارة التقديمات</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            مراجعة وإدارة جميع التقديمات على الوظائف
                        </p>
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white border border-transparent rounded-md font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                        <FaFilter className="w-4 h-4 ml-2" />
                        الفلاتر
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                                <FaUser className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">في الانتظار</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                                <FaUser className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">تمت المراجعة</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'reviewed').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                                <FaUser className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">مقبول</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'accepted').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                                <FaUser className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">مرفوض</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'rejected').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {showFilters && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="البحث في التقديمات..."
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
                                    <option value="pending">في الانتظار</option>
                                    <option value="reviewed">تمت المراجعة</option>
                                    <option value="accepted">مقبول</option>
                                    <option value="rejected">مرفوض</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            التقديمات ({filteredApplications.length})
                        </h3>
                    </div>

                    {filteredApplications.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            المتقدم
                                        </th>
                                        <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الوظيفة
                                        </th>
                                        <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            معلومات الاتصال
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
                                    {filteredApplications.map((application) => (
                                        <tr key={application.id} className="hover:bg-gray-50">
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-yellow rounded-full flex items-center justify-center">
                                                        <FaUser className="w-4 h-4 sm:w-5 sm:h-5 text-primary-black" />
                                                    </div>
                                                    <div className="mr-2 sm:mr-3">
                                                        <div className="text-sm font-medium text-gray-900 truncate max-w-24 sm:max-w-none">
                                                            {application.first_name} {application.last_name}
                                                        </div>
                                                        <div className="text-xs sm:text-sm text-gray-500 truncate max-w-24 sm:max-w-none">
                                                            {application.email}
                                                        </div>
                                                        <div className="md:hidden text-xs text-gray-500">
                                                            {application.job.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FaBriefcase className="w-4 h-4 text-gray-400 ml-2" />
                                                    <span className="text-sm text-gray-900 truncate max-w-32">{application.job.title}</span>
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{application.phone}</div>
                                                <div className="text-sm text-gray-500">{application.email}</div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                                                    {getStatusText(application.status)}
                                                </span>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(application.created_at).toLocaleDateString('ar-EG')}
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-1 sm:gap-2">
                                                    <Link
                                                        href={route('admin.applications.show', application.id)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                        title="عرض التفاصيل"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </Link>
                                                    <a
                                                        href={`/storage/job-applications/${application.cv_file}`}
                                                        download
                                                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                                        title="تحميل السيرة الذاتية"
                                                    >
                                                        <FaDownload className="w-4 h-4" />
                                                    </a>
                                                    {application.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateStatus(application.id, 'accepted')}
                                                                className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                                                title="قبول"
                                                            >
                                                                <FaCheck className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(application.id, 'rejected')}
                                                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                                title="رفض"
                                                            >
                                                                <FaTimes className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteClick(application)}
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
                                <FaUser className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تقديمات</h3>
                            <p className="text-gray-500">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'جرب تغيير معايير البحث'
                                    : 'لا توجد تقديمات على الوظائف بعد'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setApplicationToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف تقديم ${applicationToDelete?.first_name} ${applicationToDelete?.last_name}؟ لا يمكن التراجع عن هذا الإجراء.`}
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

export default ApplicationsIndex; 