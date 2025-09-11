import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const CreatePreparingForSummer: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        title_ar: '',
        description_ar: '',
        button_text_ar: '',
        button_url: '',
        image_1: null as File | null,
        image_1_alt: '',
        image_1_url: '',
        image_2: null as File | null,
        image_2_alt: '',
        image_2_url: '',
        is_active: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.landing-page.preparing-for-summer.store'));
    };

    return (
        <AdminLayout>
            <Head title="إضافة سكشن الاستعداد للصيف" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">إضافة سكشن الاستعداد للصيف</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* العنوان */}
                                <div>
                                    <label htmlFor="title_ar" className="block text-sm font-medium text-gray-700 mb-2">
                                        العنوان (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        id="title_ar"
                                        value={data.title_ar}
                                        onChange={(e) => setData('title_ar', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.title_ar && <p className="text-red-500 text-sm mt-1">{errors.title_ar}</p>}
                                </div>

                                {/* الوصف */}
                                <div>
                                    <label htmlFor="description_ar" className="block text-sm font-medium text-gray-700 mb-2">
                                        الوصف (عربي)
                                    </label>
                                    <textarea
                                        id="description_ar"
                                        value={data.description_ar}
                                        onChange={(e) => setData('description_ar', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.description_ar && <p className="text-red-500 text-sm mt-1">{errors.description_ar}</p>}
                                </div>

                                {/* نص الزر */}
                                <div>
                                    <label htmlFor="button_text_ar" className="block text-sm font-medium text-gray-700 mb-2">
                                        نص الزر (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        id="button_text_ar"
                                        value={data.button_text_ar}
                                        onChange={(e) => setData('button_text_ar', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.button_text_ar && <p className="text-red-500 text-sm mt-1">{errors.button_text_ar}</p>}
                                </div>

                                {/* رابط الزر */}
                                <div>
                                    <label htmlFor="button_url" className="block text-sm font-medium text-gray-700 mb-2">
                                        رابط الزر
                                    </label>
                                    <input
                                        type="url"
                                        id="button_url"
                                        value={data.button_url}
                                        onChange={(e) => setData('button_url', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.button_url && <p className="text-red-500 text-sm mt-1">{errors.button_url}</p>}
                                </div>

                                {/* الصورة الأولى */}
                                <div>
                                    <label htmlFor="image_1" className="block text-sm font-medium text-gray-700 mb-2">
                                        الصورة الأولى
                                    </label>
                                    <input
                                        type="file"
                                        id="image_1"
                                        accept="image/*"
                                        onChange={(e) => setData('image_1', e.target.files?.[0] || null)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.image_1 && <p className="text-red-500 text-sm mt-1">{errors.image_1}</p>}
                                </div>

                                <div>
                                    <label htmlFor="image_1_alt" className="block text-sm font-medium text-gray-700 mb-2">
                                        نص بديل للصورة الأولى
                                    </label>
                                    <input
                                        type="text"
                                        id="image_1_alt"
                                        value={data.image_1_alt}
                                        onChange={(e) => setData('image_1_alt', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image_1_url" className="block text-sm font-medium text-gray-700 mb-2">
                                        رابط الصورة الأولى (اختياري)
                                    </label>
                                    <input
                                        type="url"
                                        id="image_1_url"
                                        value={data.image_1_url}
                                        onChange={(e) => setData('image_1_url', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* الصورة الثانية */}
                                <div>
                                    <label htmlFor="image_2" className="block text-sm font-medium text-gray-700 mb-2">
                                        الصورة الثانية
                                    </label>
                                    <input
                                        type="file"
                                        id="image_2"
                                        accept="image/*"
                                        onChange={(e) => setData('image_2', e.target.files?.[0] || null)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.image_2 && <p className="text-red-500 text-sm mt-1">{errors.image_2}</p>}
                                </div>

                                <div>
                                    <label htmlFor="image_2_alt" className="block text-sm font-medium text-gray-700 mb-2">
                                        نص بديل للصورة الثانية
                                    </label>
                                    <input
                                        type="text"
                                        id="image_2_alt"
                                        value={data.image_2_alt}
                                        onChange={(e) => setData('image_2_alt', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image_2_url" className="block text-sm font-medium text-gray-700 mb-2">
                                        رابط الصورة الثانية (اختياري)
                                    </label>
                                    <input
                                        type="url"
                                        id="image_2_url"
                                        value={data.image_2_url}
                                        onChange={(e) => setData('image_2_url', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* حالة النشاط */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="mr-2 block text-sm text-gray-900">
                                        نشط
                                    </label>
                                </div>

                                {/* أزرار الإجراءات */}
                                <div className="flex gap-4">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        {processing ? 'جاري الحفظ...' : 'حفظ'}
                                    </PrimaryButton>
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreatePreparingForSummer;
