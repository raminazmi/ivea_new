import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';

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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-black mb-2 md:mb-4">
                            التقديم على وظيفة: {job.title}
                        </h2>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">تفاصيل الوظيفة</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>الوصف الوظيفي:</strong></p>
                            <p className="text-gray-600 leading-relaxed">{job.description}</p>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <p><strong>النوع:</strong> {job.type === 'full-time' ? 'دوام كامل' : job.type === 'part-time' ? 'دوام جزئي' : 'عقد مؤقت'}</p>
                                <p><strong>الفئة:</strong> {job.category}</p>
                                {job.location && <p><strong>الموقع:</strong> {job.location}</p>}
                                {job.salary_range && <p><strong>الراتب:</strong> {job.salary_range}</p>}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label htmlFor="first_name" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                                    الاسم الأول
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={handleChange}
                                    className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.first_name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="last_name" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                                    اسم العائلة
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={handleChange}
                                    className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {errors.last_name && (
                                    <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.last_name}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label htmlFor="email" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                                    رقم الجوال
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cover_letter" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                                رسالة تعريفية (اختياري)
                            </label>
                            <textarea
                                id="cover_letter"
                                name="cover_letter"
                                value={data.cover_letter}
                                onChange={handleChange}
                                rows={4}
                                className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.cover_letter ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.cover_letter && (
                                <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.cover_letter}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cv_file" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                                السيرة الذاتية
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-primary-yellow transition-colors">
                                <div className="mb-3 md:mb-4">
                                    <svg
                                        className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="cv_file"
                                    name="cv_file"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required
                                    title="اختر ملف السيرة الذاتية بصيغة PDF أو DOC"
                                />
                                <label htmlFor="cv_file" className="cursor-pointer">
                                    <span className="text-primary-yellow font-medium">اختر الملف</span>
                                    <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX حتى 2MB</p>
                                </label>
                                {data.cv_file && (
                                    <p className="mt-2 text-sm text-green-600">
                                        تم اختيار: {data.cv_file.name}
                                    </p>
                                )}
                            </div>
                            {errors.cv_file && (
                                <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.cv_file}</p>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-primary-yellow text-gray-900 font-bold py-2.5 md:py-3 rounded-md text-sm md:text-base hover:bg-yellow-400 transition-colors duration-300" 
                            disabled={processing}
                        >
                            {processing ? 'جاري الإرسال...' : 'إرسال الطلب'}
                        </button>
                </form>
                </div>
            </div>
        </AppLayout>
    );
};
export default ApplyJob;
