import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const CreateSection: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        section_key: '',
        title_ar: '',
        subtitle_ar: '',
        description_ar: '',
        button_text_ar: '',
        button_url: '',
        image: null as File | null,
        background_image: null as File | null,
        is_active: true as boolean,
        sort_order: 0,
        settings: {} as Record<string, any>,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.landing-page.sections.store'));
    };

    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [backgroundImagePreview, setBackgroundImagePreview] = React.useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            
            // إنشاء معاينة للصورة
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('background_image', file);
            
            // إنشاء معاينة لصورة الخلفية
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackgroundImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const removeBackgroundImage = () => {
        setData('background_image', null);
        setBackgroundImagePreview(null);
        const fileInput = document.getElementById('background_image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSettingChange = (key: string, value: string) => {
        setData('settings', {
            ...data.settings,
            [key]: value
        });
    };

    return (
        <AdminLayout>
            <Head title="إضافة قسم جديد" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">إضافة قسم جديد</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="section_key" value="مفتاح القسم" />
                                        <TextInput
                                            id="section_key"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.section_key}
                                            onChange={(e) => setData('section_key', e.target.value)}
                                            placeholder="preparing-for-summer"
                                            required
                                        />
                                        <InputError message={errors.section_key} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500">
                                            مفتاح فريد للقسم (بالإنجليزية، بدون مسافات)
                                        </p>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="sort_order" value="ترتيب العرض" />
                                        <TextInput
                                            id="sort_order"
                                            type="number"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        />
                                        <InputError message={errors.sort_order} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="title_ar" value="العنوان الرئيسي" />
                                    <TextInput
                                        id="title_ar"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.title_ar}
                                        onChange={(e) => setData('title_ar', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title_ar} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="subtitle_ar" value="العنوان الفرعي" />
                                    <TextInput
                                        id="subtitle_ar"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.subtitle_ar}
                                        onChange={(e) => setData('subtitle_ar', e.target.value)}
                                    />
                                    <InputError message={errors.subtitle_ar} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description_ar" value="الوصف" />
                                    <textarea
                                        id="description_ar"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={4}
                                        value={data.description_ar}
                                        onChange={(e) => setData('description_ar', e.target.value)}
                                        title="وصف القسم"
                                    />
                                    <InputError message={errors.description_ar} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="button_text_ar" value="نص الزر" />
                                        <TextInput
                                            id="button_text_ar"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.button_text_ar}
                                            onChange={(e) => setData('button_text_ar', e.target.value)}
                                        />
                                        <InputError message={errors.button_text_ar} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="button_url" value="رابط الزر" />
                                        <TextInput
                                            id="button_url"
                                            type="url"
                                            className="mt-1 block w-full"
                                            value={data.button_url}
                                            onChange={(e) => setData('button_url', e.target.value)}
                                            placeholder="https://example.com"
                                        />
                                        <InputError message={errors.button_url} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="image" value="صورة القسم" />
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            onChange={handleImageChange}
                                            title="صورة القسم"
                                        />
                                        <InputError message={errors.image} className="mt-2" />

                                        {/* معاينة صورة القسم */}
                                        {imagePreview && (
                                            <div className="mt-4">
                                                <div className="relative inline-block">
                                                    <img
                                                        src={imagePreview}
                                                        alt="معاينة صورة القسم"
                                                        className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                        title="حذف الصورة"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="mt-2 text-sm text-green-600">
                                                    ✓ تم اختيار صورة القسم بنجاح
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="background_image" value="صورة الخلفية" />
                                        <input
                                            id="background_image"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            onChange={handleBackgroundImageChange}
                                            title="صورة الخلفية"
                                        />
                                        <InputError message={errors.background_image} className="mt-2" />

                                        {/* معاينة صورة الخلفية */}
                                        {backgroundImagePreview && (
                                            <div className="mt-4">
                                                <div className="relative inline-block">
                                                    <img
                                                        src={backgroundImagePreview}
                                                        alt="معاينة صورة الخلفية"
                                                        className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeBackgroundImage}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                        title="حذف صورة الخلفية"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="mt-2 text-sm text-green-600">
                                                    ✓ تم اختيار صورة الخلفية بنجاح
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* إعدادات إضافية */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-4">إعدادات إضافية</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="bg_color" value="لون الخلفية" />
                                            <TextInput
                                                id="bg_color"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.settings.bg_color || ''}
                                                onChange={(e) => handleSettingChange('bg_color', e.target.value)}
                                                placeholder="#F5F5F5"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="text_color" value="لون النص" />
                                            <TextInput
                                                id="text_color"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.settings.text_color || ''}
                                                onChange={(e) => handleSettingChange('text_color', e.target.value)}
                                                placeholder="#000000"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="layout" value="تخطيط القسم" />
                                            <select
                                                id="layout"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.settings.layout || 'default'}
                                                onChange={(e) => handleSettingChange('layout', e.target.value)}
                                                title="تخطيط القسم"
                                            >
                                                <option value="default">افتراضي</option>
                                                <option value="reverse">معكوس</option>
                                                <option value="centered">وسط</option>
                                            </select>
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="animation" value="نوع الحركة" />
                                            <select
                                                id="animation"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.settings.animation || 'fade'}
                                                onChange={(e) => handleSettingChange('animation', e.target.value)}
                                                title="نوع الحركة"
                                            >
                                                <option value="fade">تلاشي</option>
                                                <option value="slide">انزلاق</option>
                                                <option value="zoom">تكبير</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        className="cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        title="تفعيل القسم"
                                    />
                                    <InputLabel htmlFor="is_active" value="قسم نشط" className="ms-2 cursor-pointer" />
                                </div>

                                <div className="flex items-center justify-end mt-6 gap-4">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'جاري الإنشاء...' : 'إنشاء القسم'}
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

export default CreateSection;
