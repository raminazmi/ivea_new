import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';

interface Job {
    id: number;
    title: string;
}

const ApplyJob: React.FC = () => {
    const page = usePage<any>();
    const job: Job | undefined = page.props.job;
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        cover_letter: '',
        cv_file: null as File | null,
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('cv_file', e.target.files ? e.target.files[0] : null);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!job || !job.id) return;
        post(route('jobs.apply.submit', { id: job.id }), {
            preserveScroll: true,
            onFinish: () => reset('cv_file'),
        });
    };
    if (!job) {
        return <AppLayout><div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-center text-red-500">لا يوجد وظيفة محددة للتقديم.</div></AppLayout>;
    }
    return (
        <AppLayout>
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
                <h2 className="text-xl font-bold mb-4">التقديم على وظيفة: {job.title}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label className="block mb-1 font-medium text-gray-700">الاسم الأول</label>
                    <input name="first_name" value={data.first_name} onChange={handleChange} placeholder="الاسم الأول" className="mb-1 w-full p-2 border rounded" required />
                    {errors.first_name && <div className="text-red-500 text-sm mb-2">{errors.first_name}</div>}

                    <label className="block mb-1 font-medium text-gray-700">اسم العائلة</label>
                    <input name="last_name" value={data.last_name} onChange={handleChange} placeholder="اسم العائلة" className="mb-1 w-full p-2 border rounded" required />
                    {errors.last_name && <div className="text-red-500 text-sm mb-2">{errors.last_name}</div>}

                    <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني</label>
                    <input name="email" value={data.email} onChange={handleChange} placeholder="البريد الإلكتروني" className="mb-1 w-full p-2 border rounded" required type="email" />
                    {errors.email && <div className="text-red-500 text-sm mb-2">{errors.email}</div>}

                    <label className="block mb-1 font-medium text-gray-700">رقم الجوال</label>
                    <input name="phone" value={data.phone} onChange={handleChange} placeholder="رقم الجوال" className="mb-1 w-full p-2 border rounded" required />
                    {errors.phone && <div className="text-red-500 text-sm mb-2">{errors.phone}</div>}

                    <label className="block mb-1 font-medium text-gray-700">رسالة تعريفية (اختياري)</label>
                    <textarea name="cover_letter" value={data.cover_letter} onChange={handleChange} placeholder="رسالة تعريفية (اختياري)" className="mb-1 w-full p-2 border rounded" />
                    {errors.cover_letter && <div className="text-red-500 text-sm mb-2">{errors.cover_letter}</div>}

                    <label className="block mb-1 font-medium text-gray-700">السيرة الذاتية</label>
                    <input name="cv_file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="mb-1 w-full p-2 border rounded" required />
                    {errors.cv_file && <div className="text-red-500 text-sm mb-2">{errors.cv_file}</div>}

                    <button type="submit" className="w-full bg-primary-yellow text-gray-900 font-bold py-2 rounded mt-2" disabled={processing}>إرسال الطلب</button>
                </form>
            </div>
        </AppLayout>
    );
};
export default ApplyJob;
