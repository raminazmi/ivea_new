import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
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

const EditJob: React.FC = () => {
    const page = usePage<any>();
    const job: Job | undefined = page.props.job;
    const [form, setForm] = useState<Job>(job || {
        id: 0,
        title: '',
        description: '',
        type: 'full-time',
        category: '',
        location: '',
        salary_range: '',
        status: 'active',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            title: form.title,
            description: form.description,
            type: form.type,
            category: form.category,
            location: form.location,
            salary_range: form.salary_range,
            status: form.status,
        };
        router.put(route('admin.jobs.update', form.id), payload, {
            onFinish: () => setLoading(false)
        });
    };
    if (!job) {
        return (
            <AdminLayout title="تعديل الوظيفة">
                <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-center text-red-500">
                    لا يوجد تفاصيل لهذه الوظيفة.
                </div>
            </AdminLayout>
        );
    }
    return (
        <AdminLayout title="تعديل الوظيفة">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-6">تعديل الوظيفة</h2>
                <input name="title" value={form.title} onChange={handleChange} placeholder="عنوان الوظيفة" className="mb-4 w-full p-2 border rounded" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="وصف الوظيفة" className="mb-4 w-full p-2 border rounded" required />
                <select name="type" value={form.type} onChange={handleChange} className="mb-4 w-full p-2 border rounded">
                    <option value="full-time">دوام كامل</option>
                    <option value="part-time">دوام جزئي</option>
                    <option value="contract">عقد مؤقت</option>
                </select>
                <input name="category" value={form.category} onChange={handleChange} placeholder="الفئة" className="mb-4 w-full p-2 border rounded" required />
                <input name="location" value={form.location} onChange={handleChange} placeholder="الموقع" className="mb-4 w-full p-2 border rounded" />
                <input name="salary_range" value={form.salary_range} onChange={handleChange} placeholder="الراتب" className="mb-4 w-full p-2 border rounded" />
                <select name="status" value={form.status} onChange={handleChange} className="mb-4 w-full p-2 border rounded">
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="closed">مغلق</option>
                </select>
                <button type="submit" className="w-full bg-primary-yellow text-gray-900 font-bold py-2 rounded" disabled={loading}>حفظ التعديلات</button>
            </form>
        </AdminLayout>
    );
};
export default EditJob;
