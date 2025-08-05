import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiArrowRight, HiPencil, HiTrash } from 'react-icons/hi';

interface Article {
    id: number;
    title: string;
    content: string;
    category: string;
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
    created_at: string;
    updated_at: string;
}

interface ShowArticleProps {
    article: Article;
}

const ShowArticle: React.FC<ShowArticleProps> = ({ article }) => {
    return (
        <AdminLayout>
            <Head title={`عرض المقالة - ${article.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">عرض المقالة</h2>
                                <div className="flex space-x-2 space-x-reverse">
                                    <Link
                                        href={route('admin.articles.edit', article.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <HiPencil className="ml-2" />
                                        تعديل
                                    </Link>
                                    <Link
                                        href={route('admin.articles.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <HiArrowRight className="ml-2" />
                                        العودة للقائمة
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>

                                        <div className="flex items-center space-x-4 space-x-reverse mb-6">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {article.category}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(article.date).toLocaleDateString('ar-SA')}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {article.read_time} دقائق للقراءة
                                            </span>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${article.is_published
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {article.is_published ? 'منشورة' : 'مسودة'}
                                            </span>
                                            {article.featured && (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    مميزة
                                                </span>
                                            )}
                                        </div>

                                        {article.image && (
                                            <div className="mb-6">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-64 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}

                                        <div className="prose prose-lg max-w-none">
                                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                        </div>


                                    </div>

                                    {article.author && (
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-start gap-4">
                                                {article.author_image && (
                                                    <img
                                                        src={article.author_image}
                                                        alt={article.author}
                                                        className="w-16 h-16 rounded-full object-cover"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                        {article.author}
                                                    </h3>
                                                    {article.author_bio && (
                                                        <p className="text-sm text-gray-700 leading-relaxed">
                                                            {article.author_bio}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل المقالة</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">الترتيب</label>
                                                <p className="text-sm text-gray-900">{article.sort_order}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">تاريخ الإنشاء</label>
                                                <p className="text-sm text-gray-900">
                                                    {new Date(article.created_at).toLocaleDateString('ar-SA')}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">آخر تحديث</label>
                                                <p className="text-sm text-gray-900">
                                                    {new Date(article.updated_at).toLocaleDateString('ar-SA')}
                                                </p>
                                            </div>

                                            {article.meta_description && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">وصف الميتا</label>
                                                    <p className="text-sm text-gray-900">{article.meta_description}</p>
                                                </div>
                                            )}

                                            {article.meta_keywords && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">كلمات مفتاحية</label>
                                                    <p className="text-sm text-gray-900">{article.meta_keywords}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ShowArticle; 