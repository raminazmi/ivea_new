import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    FaEye,
    FaDownload,
    FaCheck,
    FaTimes,
    FaSearch,
    FaFilter,
    FaUser,
    FaBriefcase
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
        // Handle status update
        console.log(`Update application ${applicationId} to ${newStatus}`);
    };

    return (
        <AdminLayout title="إدارة التقديمات" user={currentUser}>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">إدارة التقديمات</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            مراجعة وإدارة جميع التقديمات على الوظائف
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <FaUser className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FaUser className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">تمت المراجعة</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'reviewed').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-full">
                                <FaUser className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">مقبول</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'accepted').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-full">
                                <FaUser className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">مرفوض</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applications.filter(app => app.status === 'rejected').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            التقديمات ({filteredApplications.length})
                        </h3>
                    </div>

                    {filteredApplications.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            المتقدم
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الوظيفة
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            معلومات الاتصال
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الحالة
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            التاريخ
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الإجراءات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredApplications.map((application) => (
                                        <tr key={application.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center">
                                                        <FaUser className="w-5 h-5 text-primary-black" />
                                                    </div>
                                                    <div className="mr-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {application.first_name} {application.last_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {application.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FaBriefcase className="w-4 h-4 text-gray-400 ml-2" />
                                                    <span className="text-sm text-gray-900">{application.job.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{application.phone}</div>
                                                <div className="text-sm text-gray-500">{application.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                                                    {getStatusText(application.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(application.created_at).toLocaleDateString('ar-SA')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                    <Link
                                                        href={`/admin/applications/${application.id}`}
                                                        className="text-blue-600 hover:text-blue-900 p-1"
                                                        title="عرض التفاصيل"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </Link>
                                                    <a
                                                        href={`/storage/job-applications/${application.cv_file}`}
                                                        download
                                                        className="text-green-600 hover:text-green-900 p-1"
                                                        title="تحميل السيرة الذاتية"
                                                    >
                                                        <FaDownload className="w-4 h-4" />
                                                    </a>
                                                    {application.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateStatus(application.id, 'accepted')}
                                                                className="text-green-600 hover:text-green-900 p-1"
                                                                title="قبول"
                                                            >
                                                                <FaCheck className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(application.id, 'rejected')}
                                                                className="text-red-600 hover:text-red-900 p-1"
                                                                title="رفض"
                                                            >
                                                                <FaTimes className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
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
        </AdminLayout>
    );
};

export default ApplicationsIndex; 