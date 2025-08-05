import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiPlus, HiPencil, HiTrash, HiEye } from 'react-icons/hi';

interface Article {
    id: number;
    title: string;
    category: string;
    date: string;
    read_time: number;
    is_published: boolean;
    featured: boolean;
    sort_order: number;
    created_at: string;
}

interface ArticlesIndexProps {
    articles: {
        data: Article[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const ArticlesIndex: React.FC<ArticlesIndexProps> = ({ articles }) => {
    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه المقالة؟')) {
            router.delete(route('admin.articles.destroy', id));
        }
    };

    const togglePublished = (id: number, currentStatus: boolean) => {
        router.put(route('admin.articles.update', id), {
            is_published: !currentStatus
        });
    };

    const toggleFeatured = (id: number, currentStatus: boolean) => {
        router.put(route('admin.articles.update', id), {
            featured: !currentStatus
        });
    };

    return (
        <AdminLayout>
            <Head title="إدارة المقالات" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">إدارة المقالات</h2>
                                <Link
                                    href={route('admin.articles.create')}
                                    className="inline-flex items-center px-4 py-2 bg-yellow-400 border border-transparent rounded-md font-semibold text-xs text-gray-900 uppercase tracking-widest hover:bg-yellow-500 focus:bg-yellow-500 active:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <HiPlus className="ml-2" />
                                    إضافة مقالة جديدة
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                العنوان
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الفئة
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                التاريخ
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الحالة
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                مميزة
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الترتيب
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الإجراءات
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {articles.data.map((article) => (
                                            <tr key={article.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {article.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {article.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(article.date).toLocaleDateString('ar-SA')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => togglePublished(article.id, article.is_published)}
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            article.is_published
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {article.is_published ? 'منشورة' : 'مسودة'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => toggleFeatured(article.id, article.featured)}
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            article.featured
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {article.featured ? 'مميزة' : 'عادية'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {article.sort_order}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2 space-x-reverse">
                                                        <Link
                                                            href={route('admin.articles.show', article.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            <HiEye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.articles.edit', article.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <HiPencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(article.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="حذف المقالة"
                                                        >
                                                            <HiTrash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {articles.data.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">لا توجد مقالات متاحة</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ArticlesIndex; 