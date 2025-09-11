import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface PreparingForSummer {
    id: number;
    title_ar: string;
    description_ar: string;
    button_text_ar: string;
    button_url: string;
    image_1_path?: string;
    image_1_alt?: string;
    image_1_url?: string;
    image_2_path?: string;
    image_2_alt?: string;
    image_2_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface EditPreparingForSummerProps {
    preparingForSummer: PreparingForSummer;
}

const EditPreparingForSummer: React.FC<EditPreparingForSummerProps> = ({ preparingForSummer }) => {
    const { data, setData, post, processing, errors } = useForm({
        title_ar: preparingForSummer.title_ar,
        description_ar: preparingForSummer.description_ar,
        button_text_ar: preparingForSummer.button_text_ar,
        button_url: preparingForSummer.button_url,
        image_1: null as File | null,
        image_1_alt: preparingForSummer.image_1_alt || '',
        image_1_url: preparingForSummer.image_1_url || '',
        image_2: null as File | null,
        image_2_alt: preparingForSummer.image_2_alt || '',
        image_2_url: preparingForSummer.image_2_url || '',
        is_active: preparingForSummer.is_active
    });

    const [image1Preview, setImage1Preview] = useState<string | null>(null);
    const [image2Preview, setImage2Preview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.landing-page.preparing-for-summer.update', preparingForSummer.id), {
            _method: 'PUT'
        });
    };

    const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image_1', file);
            
            // إنشاء معاينة للصورة
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage1Preview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image_2', file);
            
            // إنشاء معاينة للصورة
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage2Preview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage1 = () => {
        setData('image_1', null);
        setImage1Preview(null);
        const fileInput = document.getElementById('image_1') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const removeImage2 = () => {
        setData('image_2', null);
        setImage2Preview(null);
        const fileInput = document.getElementById('image_2') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <AdminLayout>
            <Head title="تعديل سكشن الاستعداد للصيف" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">تعديل سكشن الاستعداد للصيف</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" method="POST" encType="multipart/form-data">
                                {/* العنوان */}
                                <div>
                                    <InputLabel htmlFor="title_ar" value="العنوان" />
                                    <input
                                        type="text"
                                        id="title_ar"
                                        value={data.title_ar}
                                        onChange={(e) => setData('title_ar', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    />
                                    <InputError message={errors.title_ar} className="mt-2" />
                                </div>

                                {/* الوصف */}
                                <div>
                                    <InputLabel htmlFor="description_ar" value="الوصف" />
                                    <textarea
                                        id="description_ar"
                                        value={data.description_ar}
                                        onChange={(e) => setData('description_ar', e.target.value)}
                                        rows={4}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    />
                                    <InputError message={errors.description_ar} className="mt-2" />
                                </div>

                                {/* نص الزر */}
                                <div>
                                    <InputLabel htmlFor="button_text_ar" value="نص الزر" />
                                    <input
                                        type="text"
                                        id="button_text_ar"
                                        value={data.button_text_ar}
                                        onChange={(e) => setData('button_text_ar', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    />
                                    <InputError message={errors.button_text_ar} className="mt-2" />
                                </div>

                                {/* رابط الزر */}
                                <div>
                                    <InputLabel htmlFor="button_url" value="رابط الزر" />
                                    <input
                                        type="url"
                                        id="button_url"
                                        value={data.button_url}
                                        onChange={(e) => setData('button_url', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    />
                                    <InputError message={errors.button_url} className="mt-2" />
                                </div>

                                {/* الصورة الأولى */}
                                <div>
                                    <InputLabel htmlFor="image_1" value="الصورة الأولى (اختياري - لتغيير الصورة الحالية)" />
                                    
                                    {/* Custom File Upload Area */}
                                    <div className="mt-1">
                                        <label
                                            htmlFor="image_1"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">انقر لاختيار صورة جديدة</span> أو اسحب الصورة هنا
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF (أقصى 2MB)</p>
                                            </div>
                                            <input
                                                id="image_1"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImage1Change}
                                            />
                                        </label>
                                    </div>
                                    
                                    <InputError message={errors.image_1} className="mt-2" />

                                    {/* الصورة الحالية */}
                                    {preparingForSummer.image_1_path && !image1Preview && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600 mb-2">الصورة الحالية:</p>
                                            <div className="relative inline-block">
                                                <img
                                                    src={`/storage/${preparingForSummer.image_1_path}`}
                                                    alt={preparingForSummer.image_1_alt || 'الصورة الأولى'}
                                                    className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* معاينة الصورة الجديدة */}
                                    {image1Preview && (
                                        <div className="mt-4">
                                            <p className="text-sm text-blue-600 mb-2">الصورة الجديدة:</p>
                                            <div className="relative inline-block">
                                                <img
                                                    src={image1Preview}
                                                    alt="معاينة الصورة الجديدة"
                                                    className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage1}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                    title="إلغاء تغيير الصورة"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="mt-2 text-sm text-green-600">
                                                ✓ سيتم استبدال الصورة الحالية بهذه الصورة
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <InputLabel htmlFor="image_1_alt" value="نص بديل للصورة الأولى" />
                                    <input
                                        type="text"
                                        id="image_1_alt"
                                        value={data.image_1_alt}
                                        onChange={(e) => setData('image_1_alt', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image_1_url" value="رابط الصورة الأولى (اختياري)" />
                                    <input
                                        type="url"
                                        id="image_1_url"
                                        value={data.image_1_url}
                                        onChange={(e) => setData('image_1_url', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                </div>

                                {/* الصورة الثانية */}
                                <div>
                                    <InputLabel htmlFor="image_2" value="الصورة الثانية (اختياري - لتغيير الصورة الحالية)" />
                                    
                                    {/* Custom File Upload Area */}
                                    <div className="mt-1">
                                        <label
                                            htmlFor="image_2"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">انقر لاختيار صورة جديدة</span> أو اسحب الصورة هنا
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF (أقصى 2MB)</p>
                                            </div>
                                            <input
                                                id="image_2"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImage2Change}
                                            />
                                        </label>
                                    </div>
                                    
                                    <InputError message={errors.image_2} className="mt-2" />

                                    {/* الصورة الحالية */}
                                    {preparingForSummer.image_2_path && !image2Preview && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600 mb-2">الصورة الحالية:</p>
                                            <div className="relative inline-block">
                                                <img
                                                    src={`/storage/${preparingForSummer.image_2_path}`}
                                                    alt={preparingForSummer.image_2_alt || 'الصورة الثانية'}
                                                    className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* معاينة الصورة الجديدة */}
                                    {image2Preview && (
                                        <div className="mt-4">
                                            <p className="text-sm text-blue-600 mb-2">الصورة الجديدة:</p>
                                            <div className="relative inline-block">
                                                <img
                                                    src={image2Preview}
                                                    alt="معاينة الصورة الجديدة"
                                                    className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage2}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                    title="إلغاء تغيير الصورة"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="mt-2 text-sm text-green-600">
                                                ✓ سيتم استبدال الصورة الحالية بهذه الصورة
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <InputLabel htmlFor="image_2_alt" value="نص بديل للصورة الثانية" />
                                    <input
                                        type="text"
                                        id="image_2_alt"
                                        value={data.image_2_alt}
                                        onChange={(e) => setData('image_2_alt', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image_2_url" value="رابط الصورة الثانية (اختياري)" />
                                    <input
                                        type="url"
                                        id="image_2_url"
                                        value={data.image_2_url}
                                        onChange={(e) => setData('image_2_url', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                </div>

                                {/* حالة النشاط */}
                                <div className="flex items-center">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        className="cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />
                                    <InputLabel htmlFor="is_active" value="سكشن نشط" className="ms-2 cursor-pointer" />
                                </div>

                                {/* أزرار الإجراءات */}
                                <div className="flex items-center justify-end mt-6 gap-4">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'جاري التحديث...' : 'تحديث السكشن'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditPreparingForSummer;
