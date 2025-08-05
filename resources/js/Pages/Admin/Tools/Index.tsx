import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { HiPlus, HiPencil, HiTrash, HiEye, HiEyeOff, HiStar, HiOutlineStar } from 'react-icons/hi';
import AdminLayout from '@/Layouts/AdminLayout';

interface Tool {
    id: number;
    title: string;
    slug: string;
    category: string;
    date: string;
    readTime: string;
    isPublished: boolean;
    featured: boolean;
    sortOrder: number;
    createdAt: string;
}

interface ToolsIndexProps {
    tools: Tool[];
}

const ToolsIndex: React.FC<ToolsIndexProps> = ({ tools }) => {
    const handleTogglePublished = (toolId: number) => {
        router.patch(`/admin/tools/${toolId}/toggle-published`);
    };

    const handleToggleFeatured = (toolId: number) => {
        router.patch(`/admin/tools/${toolId}/toggle-featured`);
    };

    const handleDelete = (toolId: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الأداة؟')) {
            router.delete(`/admin/tools/${toolId}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="إدارة أدوات وإرشادات" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">إدارة أدوات وإرشادات</h2>
                                <Link
                                    href="/admin/articles/create"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                >
                                    <HiPlus className="w-5 h-5" />
                                    <span>إضافة أداة جديدة</span>
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
                                                مميز
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
                                        {tools.map((tool) => (
                                            <tr key={tool.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {tool.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {tool.slug}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        {tool.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {tool.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleTogglePublished(tool.id)}
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tool.isPublished
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {tool.isPublished ? (
                                                            <>
                                                                <HiEye className="w-3 h-3 ml-1" />
                                                                منشور
                                                            </>
                                                        ) : (
                                                            <>
                                                                <HiEyeOff className="w-3 h-3 ml-1" />
                                                                مسودة
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleToggleFeatured(tool.id)}
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tool.featured
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                    >
                                                        {tool.featured ? (
                                                            <>
                                                                <HiStar className="w-3 h-3 ml-1" />
                                                                مميز
                                                            </>
                                                        ) : (
                                                            <>
                                                                <HiOutlineStar className="w-3 h-3 ml-1" />
                                                                عادي
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {tool.sortOrder}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-2 space-x-reverse">
                                                        <Link
                                                            href={`/admin/tools/${tool.id}/edit`}
                                                            className="text-yellow-600 hover:text-yellow-900"
                                                        >
                                                            <HiPencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(tool.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="حذف الأداة"
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

                            {tools.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">لا توجد أدوات وإرشادات حتى الآن</p>
                                    <Link
                                        href="/admin/articles/create"
                                        className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
                                    >
                                        <HiPlus className="w-4 h-4 ml-2" />
                                        إضافة أول أداة
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ToolsIndex; 