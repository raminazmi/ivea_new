import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface OffersText {
    id: number;
    key: string;
    title_ar: string;
    description_ar: string;
    title_en: string;
    description_en: string;
    is_active: boolean;
    sort_order: number;
}

interface EditProps {
    text: OffersText;
}

const Edit: React.FC<EditProps> = ({ text }) => {
    const { data, setData, put, processing, errors } = useForm({
        key: text.key,
        title_ar: text.title_ar || '',
        description_ar: text.description_ar || '',
        title_en: text.title_en || '',
        description_en: text.description_en || '',
        is_active: text.is_active,
        sort_order: text.sort_order
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.offers-texts.update', text.id));
    };

    return (
        <AdminLayout>
            <Head title="تعديل نص العروض" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                                تعديل نص العروض: {text.key}
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="key" value="المفتاح (Key)" />
                                    <TextInput
                                        id="key"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.key}
                                        onChange={(e) => setData('key', e.target.value)}
                                        placeholder="مثال: main_title, main_description"
                                        required
                                    />
                                    <InputError message={errors.key} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="title_ar" value="العنوان (عربي)" />
                                        <TextInput
                                            id="title_ar"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.title_ar}
                                            onChange={(e) => setData('title_ar', e.target.value)}
                                            placeholder="العنوان باللغة العربية"
                                        />
                                        <InputError message={errors.title_ar} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="title_en" value="العنوان (إنجليزي)" />
                                        <TextInput
                                            id="title_en"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.title_en}
                                            onChange={(e) => setData('title_en', e.target.value)}
                                            placeholder="Title in English"
                                        />
                                        <InputError message={errors.title_en} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="description_ar" value="الوصف (عربي)" />
                                        <textarea
                                            id="description_ar"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.description_ar}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description_ar', e.target.value)}
                                            placeholder="الوصف باللغة العربية"
                                            rows={4}
                                        />
                                        <InputError message={errors.description_ar} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="description_en" value="الوصف (إنجليزي)" />
                                        <textarea
                                            id="description_en"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.description_en}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description_en', e.target.value)}
                                            placeholder="Description in English"
                                            rows={4}
                                        />
                                        <InputError message={errors.description_en} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="sort_order" value="ترتيب العرض" />
                                        <TextInput
                                            id="sort_order"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                            min="0"
                                        />
                                        <InputError message={errors.sort_order} className="mt-2" />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            checked={data.is_active}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('is_active', e.target.checked)}
                                            title="تفعيل النص"
                                        />
                                        <InputLabel htmlFor="is_active" value="نشط" className="mr-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4 space-x-reverse">
                                    <a
                                        href={route('admin.offers-texts.index')}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        إلغاء
                                    </a>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'جاري التحديث...' : 'تحديث'}
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

export default Edit;
