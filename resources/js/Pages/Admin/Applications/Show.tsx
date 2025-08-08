import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { usePage, Link } from '@inertiajs/react';
import { FaDownload, FaUser, FaBriefcase } from 'react-icons/fa';

const ApplicationShow: React.FC = () => {
    const { application } = usePage<any>().props;
    if (!application) {
        return <AdminLayout title="تفاصيل الطلب"><div className="text-center text-red-500 py-12">لا يوجد بيانات لهذا الطلب.</div></AdminLayout>;
    }

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

    return (
        <AdminLayout title={`تفاصيل طلب: ${application.first_name} ${application.last_name}`}>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center">
                        <FaUser className="w-6 h-6 text-primary-black" />
                    </div>
                    <div className="mr-4">
                        <h2 className="text-xl font-bold text-gray-900">{application.first_name} {application.last_name}</h2>
                        <p className="text-gray-500">{application.email}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-medium text-gray-700">رقم الجوال:</span> {application.phone}
                </div>
                <div className="mb-4">
                    <span className="font-medium text-gray-700">الوظيفة:</span> <FaBriefcase className="inline-block w-4 h-4 text-gray-400 ml-1" /> {application.job?.title}
                </div>
                <div className="mb-4">
                    <span className="font-medium text-gray-700">رسالة تعريفية:</span>
                    <div className="bg-gray-50 rounded p-3 mt-1 text-gray-800 text-sm">{application.cover_letter || 'لا يوجد'}</div>
                </div>
                <div className="mb-4">
                    <span className="font-medium text-gray-700">السيرة الذاتية:</span>
                    {application.cv_file ? (
                        <a href={`/storage/job-applications/${application.cv_file}`} download className="ml-2 text-green-600 hover:text-green-900 font-bold inline-flex items-center">
                            <FaDownload className="w-4 h-4 mx-1.5" /> تحميل
                        </a>
                    ) : (
                        <span className="text-gray-500 ml-2">لا يوجد ملف مرفق</span>
                    )}
                </div>
                <div className="mb-4">
                    <span className="font-medium text-gray-700">الحالة:</span> <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 font-semibold">{getStatusText(application.status)}</span>
                </div>
                <div className="mt-6">
                    <Link href={route('admin.applications.index')} className="bg-primary-yellow text-gray-900 font-bold px-4 py-2 rounded">رجوع للتقديمات</Link>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApplicationShow;
