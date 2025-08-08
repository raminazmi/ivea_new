import React from 'react';
import { usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

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

const ShowJob: React.FC = () => {
    const page = usePage<any>();
    const job: Job | undefined = page.props.job;
    if (!job) {
        return (
            <AdminLayout title="تفاصيل الوظيفة">
                <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-center text-red-500">
                    لا يوجد تفاصيل لهذه الوظيفة.
                </div>
            </AdminLayout>
        );
    }

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
        <AdminLayout title={`تفاصيل الوظيفة: ${job.title}`}>
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">{job.title}</h2>
                <p className="mb-2"><strong>الوصف:</strong> {job.description}</p>
                <p className="mb-2"><strong>النوع:</strong> {job.type}</p>
                <p className="mb-2"><strong>الفئة:</strong> {job.category}</p>
                <p className="mb-2"><strong>الموقع:</strong> {job.location || '-'}</p>
                <p className="mb-2"><strong>الراتب:</strong> {job.salary_range || '-'}</p>
                <p className="mb-2"><strong>الحالة:</strong> {getStatusText(job.status)}</p>
            </div>
        </AdminLayout>
    );
};

export default ShowJob;
