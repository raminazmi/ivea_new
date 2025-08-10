import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface Article {
    id: number;
    title: string;
    content: string;
    category_id: number;
    image: string | null;
    date: string;
    read_time: number;
    author: string | null;
    author_image: string | null;
    author_bio: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    is_published: boolean;
    featured: boolean;
    sort_order: number;
    slug: string | null;
}

interface Category {
    id: number;
    name: string;
}

interface EditArticleProps {
    article: Article;
    categories: Category[];
}

const EditArticle: React.FC<EditArticleProps> = ({ article, categories = [] }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: article.title || '',
        content: article.content || '',
        category_id: String(article.category_id) || '',
        image: null as File | null,
        date: article.date || '',
        read_time: article.read_time || 5,
        author: article.author || '',
        author_image: null as File | null,
        author_bio: article.author_bio || '',
        meta_description: article.meta_description || '',
        meta_keywords: article.meta_keywords || '',
        is_published: article.is_published || false,
        featured: article.featured || false,
        sort_order: article.sort_order || 0,
        slug: article.slug || ''
    });

    const [localErrors, setLocalErrors] = React.useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let errors: { [key: string]: string } = {};
        if (!data.title || data.title.trim() === '') errors.title = 'العنوان مطلوب';
        if (!data.category_id || data.category_id === '') errors.category_id = 'الفئة مطلوبة';
        if (!data.content || data.content.trim() === '') errors.content = 'المحتوى مطلوب';
        if (!data.date || data.date === '') errors.date = 'تاريخ النشر مطلوب';
        if (!data.read_time || isNaN(Number(data.read_time))) errors.read_time = 'وقت القراءة مطلوب';
        if (Object.keys(errors).length > 0) {
            setLocalErrors(errors);
            return;
        } else {
            setLocalErrors({});
        }

        const slug = data.title
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .toLowerCase();
        const generateSlug = (title: string) => {
            return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        };
        setData('slug', generateSlug(data.title));
        post(route('admin.articles.update', article.id), {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
            },
            onError: (errors) => {
            }
        });
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
            <Head title="تعديل المقالة" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">تعديل المقالة</h2>

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
                                        <InputError message={errors.title || localErrors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="category_id" value="الفئة" />
                                        <select
                                            id="category_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            required
                                            title="الفئة"
                                        >
                                            <option value="">اختر الفئة</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id || localErrors.category_id} className="mt-2" />
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
                                        <InputError message={errors.date || localErrors.date} className="mt-2" />
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
                                            onChange={(e) => setData('read_time', Number(e.target.value) || 5)}
                                            required
                                            title="وقت القراءة"
                                        />
                                        <InputError message={errors.read_time || localErrors.read_time} className="mt-2" />
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
                                            onChange={(e) => setData('sort_order', Number(e.target.value) || 0)}
                                            title="ترتيب العرض"
                                        />
                                        <InputError message={errors.sort_order} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="محتوى المقالة" />
                                    <textarea
                                        id="content"
                                        className="mt-1 block w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm resize-y"
                                        rows={10}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        required
                                        title="محتوى المقالة"
                                    />
                                    <InputError message={errors.content || localErrors.content} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="image" value="صورة المقالة" />
                                        {article.image && (
                                            <div className="mb-2">
                                                <img src={article.image} alt="صورة المقالة الحالية" className="w-32 h-32 object-cover rounded" />
                                            </div>
                                        )}
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                            onChange={handleImageChange}
                                            title="صورة المقالة"
                                        />
                                        <InputError message={errors.image} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="author_image" value="صورة الكاتب" />
                                        {article.author_image && (
                                            <div className="mb-2">
                                                <img src={article.author_image} alt="صورة الكاتب الحالية" className="w-32 h-32 object-cover rounded" />
                                            </div>
                                        )}
                                        <input
                                            id="author_image"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                            onChange={handleAuthorImageChange}
                                            title="صورة الكاتب"
                                        />
                                        <InputError message={errors.author_image} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="author_bio" value="نبذة عن الكاتب" />
                                    <textarea
                                        id="author_bio"
                                        className="mt-1 block w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm resize-y"
                                        rows={3}
                                        value={data.author_bio}
                                        onChange={(e) => setData('author_bio', e.target.value)}
                                        title="نبذة عن الكاتب"
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
                                            title="منشورة"
                                        />
                                        <span className="mr-2 text-sm text-gray-600">منشورة</span>
                                    </label>

                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-yellow-600 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                            checked={data.featured}
                                            onChange={(e) => setData('featured', e.target.checked)}
                                            title="مميزة"
                                        />
                                        <span className="mr-2 text-sm text-gray-600">مميزة</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton
                                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                                        disabled={processing}
                                        title="تحديث المقالة"
                                    >
                                        {processing ? 'جاري التحديث...' : 'تحديث المقالة'}
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

export default EditArticle;