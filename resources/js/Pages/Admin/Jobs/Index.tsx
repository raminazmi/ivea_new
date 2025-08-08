import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';

interface Job {
    id: number;
    title: string;
    description: string;
    type: string;
    category: string;
    location?: string;
    salary_range?: string;
    status: string;
}

interface JobsIndexProps {
    jobs: Job[];
}

const JobsIndex: React.FC<JobsIndexProps> = ({ jobs }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('هل أنت متأكد من حذف الوظيفة؟')) {
            router.delete(route('admin.jobs.destroy', id));
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'نشطة';
            case 'inactive':
                return 'غير نشطة';
            case 'closed':
                return 'مغلقة';
            default:
                return status;
        }
    };

    return (
        <AdminLayout title="إدارة الوظائف">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">إدارة الوظائف</h1>
                <Link href={route('admin.jobs.create')} className="bg-primary-yellow text-gray-900 px-4 py-2 rounded font-bold">إضافة وظيفة جديدة</Link>
            </div>
            <div className="bg-white rounded-lg shadow p-4 overflow-x-auto border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jobs.map(job => (
                            <tr key={job.id} className="hover:bg-gray-50">
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium truncate max-w-32" title={job.title}>{job.title}</td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-48" title={job.description}>{job.description}</td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.type}</td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.category}</td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${job.status === 'active' ? 'bg-green-100 text-green-800' : job.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {getStatusText(job.status)}
                                    </span>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-1 sm:gap-2 min-w-0">
                                        <Link
                                            href={route('admin.jobs.show', job.id)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 flex-shrink-0"
                                            title="عرض"
                                        >
                                            <HiEye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={route('admin.jobs.edit', job.id)}
                                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 flex-shrink-0"
                                            title="تعديل"
                                        >
                                            <HiPencil className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 flex-shrink-0"
                                            title="حذف الوظيفة"
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
        </AdminLayout>
    );
};

export default JobsIndex;