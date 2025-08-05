import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface CreateArticleProps {
    categories: string[];
}

const CreateArticle: React.FC<CreateArticleProps> = ({ categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category: '',
        image: null as File | null,
        date: new Date().toISOString().split('T')[0],
        read_time: 5,
        author: '',
        author_image: null as File | null,
        author_bio: '',
        meta_description: '',
        meta_keywords: '',
        is_published: true,
        featured: false,
        sort_order: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.articles.store'));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    };

    const handleAuthorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('author_image', e.target.files[0]);
        }
    };



    return (
        <AdminLayout>
            <Head title="إضافة مقالة جديدة" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">إضافة مقالة جديدة</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="title" value="عنوان المقالة" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                            title="عنوان المقالة"
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="category" value="الفئة" />
                                        <select
                                            title="الفئة"
                                            id="category"
                                            className="mt-1 block w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            required
                                        >
                                            <option value="">اختر الفئة</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="date" value="تاريخ النشر" />
                                        <TextInput
                                            id="date"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            required
                                            title="تاريخ النشر"
                                        />
                                        <InputError message={errors.date} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="read_time" value="وقت القراءة (بالدقائق)" />
                                        <TextInput
                                            id="read_time"
                                            type="number"
                                            min="1"
                                            max="60"
                                            className="mt-1 block w-full"
                                            value={data.read_time}
                                            onChange={(e) => setData('read_time', parseInt(e.target.value))}
                                            required
                                            title="وقت القراءة"
                                        />
                                        <InputError message={errors.read_time} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="author" value="اسم الكاتب" />
                                        <TextInput
                                            id="author"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
                                            title="اسم الكاتب"
                                        />
                                        <InputError message={errors.author} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="sort_order" value="ترتيب العرض" />
                                        <TextInput
                                            id="sort_order"
                                            type="number"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                                            title="ترتيب العرض"
                                        />
                                        <InputError message={errors.sort_order} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="محتوى المقالة" />
                                    <textarea
                                        title="textarea"
                                        id="content"
                                        className="mt-1 block w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm"
                                        rows={10}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>



                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="image" value="صورة المقالة" />
                                        <input
                                            title="image"
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full"
                                            onChange={handleImageChange}
                                        />
                                        <InputError message={errors.image} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="author_image" value="صورة الكاتب" />
                                        <input
                                            title="author_image"
                                            id="author_image"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full"
                                            onChange={handleAuthorImageChange}
                                        />
                                        <InputError message={errors.author_image} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="author_bio" value="نبذة عن الكاتب" />
                                    <textarea
                                        title="author_bio"
                                        id="author_bio"
                                        className="mt-1 block w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm"
                                        rows={3}
                                        value={data.author_bio}
                                        onChange={(e) => setData('author_bio', e.target.value)}
                                    />
                                    <InputError message={errors.author_bio} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="meta_description" value="وصف الميتا" />
                                        <TextInput
                                            id="meta_description"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            title="وصف الميتا"
                                        />
                                        <InputError message={errors.meta_description} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="meta_keywords" value="كلمات مفتاحية" />
                                        <TextInput
                                            id="meta_keywords"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.meta_keywords}
                                            onChange={(e) => setData('meta_keywords', e.target.value)}
                                            title="كلمات مفتاحية"
                                        />
                                        <InputError message={errors.meta_keywords} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6 space-x-reverse">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-yellow-600 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                        />
                                        <span className="mr-2 text-sm text-gray-600">منشورة</span>
                                    </label>

                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-yellow-600 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                            checked={data.featured}
                                            onChange={(e) => setData('featured', e.target.checked)}
                                        />
                                        <span className="mr-2 text-sm text-gray-600">مميزة</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton
                                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                                        disabled={processing}
                                    >
                                        {processing ? 'جاري الحفظ...' : 'حفظ المقالة'}
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

export default CreateArticle; 