import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const CreateJob: React.FC = () => {
    const [form, setForm] = useState({
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
        router.post(route('admin.jobs.store'), form, {
            onFinish: () => setLoading(false)
        });
    };
    return (
        <AdminLayout title="إضافة وظيفة جديدة">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-6">إضافة وظيفة جديدة</h2>
                <input name="title" value={form.title} onChange={handleChange} placeholder="عنوان الوظيفة" className="mb-4 w-full p-2 border rounded" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="وصف الوظيفة" className="mb-4 w-full p-2 border rounded" required />
                <select name="type" value={form.type} onChange={handleChange} className="mb-4 w-full p-2 border rounded" title="اختر نوع الوظيفة" aria-label="نوع الوظيفة">
                    <option value="full-time">دوام كامل</option>
                    <option value="part-time">دوام جزئي</option>
                    <option value="contract">عقد مؤقت</option>
                </select>
                <input name="category" value={form.category} onChange={handleChange} placeholder="الفئة" className="mb-4 w-full p-2 border rounded" required />
                <input name="location" value={form.location} onChange={handleChange} placeholder="الموقع" className="mb-4 w-full p-2 border rounded" />
                <input name="salary_range" value={form.salary_range} onChange={handleChange} placeholder="الراتب" className="mb-4 w-full p-2 border rounded" />
                <select name="status" value={form.status} onChange={handleChange} className="mb-4 w-full p-2 border rounded" title="اختر حالة الوظيفة" aria-label="حالة الوظيفة">
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="closed">مغلق</option>
                </select>
                <button type="submit" className="w-full bg-primary-yellow text-gray-900 font-bold py-2 rounded" disabled={loading}>حفظ</button>
            </form>
        </AdminLayout>
    );
};
export default CreateJob;
