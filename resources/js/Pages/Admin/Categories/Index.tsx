import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    status: string;
    sort_order: number;
    products_count: number;
    created_at: string;
}

interface CategoriesIndexProps {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: any;
    user: any;
}

const CategoriesIndex: React.FC<CategoriesIndexProps> = ({ categories, filters, user }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const handleSearch = () => {
        router.get('/admin/categories', {
            search: searchTerm,
            status: statusFilter,
        });
    };

    const handleStatusChange = (categoryId: number, newStatus: string) => {
        router.patch(`/admin/categories/${categoryId}/status`, { status: newStatus }, {
            onSuccess: () => {
                router.reload();
            },
        });
    };

    const handleDelete = (categoryId: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
            router.delete(`/admin/categories/${categoryId}`, {
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
                {status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
        );
    };

    return (
        <AdminLayout user={user}>
            <Head title="إدارة الفئات" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الفئات</h1>
                    <Link
                        href="/admin/categories/create"
                        className="bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                    >
                        إضافة فئة جديدة
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="اسم الفئة..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                title="فلتر الحالة"
                            >
                                <option value="all">الكل</option>
                                <option value="active">نشط</option>
                                <option value="inactive">غير نشط</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleSearch}
                            className="bg-primary-yellow text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                        >
                            تطبيق الفلاتر
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الفئة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الوصف
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        عدد المنتجات
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الترتيب
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الحالة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        التاريخ
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.data.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {category.slug}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {category.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                {category.products_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {category.sort_order}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(category.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(category.created_at).toLocaleDateString('ar-SA')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2 rtl:space-x-reverse">
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    className="text-primary-yellow hover:text-yellow-600"
                                                >
                                                    تعديل
                                                </Link>
                                                <button
                                                    onClick={() => handleStatusChange(category.id, category.status === 'active' ? 'inactive' : 'active')}
                                                    className={`${category.status === 'active'
                                                        ? 'text-red-600 hover:text-red-800'
                                                        : 'text-green-600 hover:text-green-800'
                                                        }`}
                                                >
                                                    {category.status === 'active' ? 'إيقاف' : 'تفعيل'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {categories.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">لا توجد فئات متاحة</p>
                        </div>
                    )}
                </div>

                {categories.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex space-x-2 rtl:space-x-reverse">
                            {Array.from({ length: categories.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => router.get('/admin/categories', { ...filters, page })}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg ${page === categories.current_page
                                        ? 'bg-primary-yellow text-gray-900'
                                        : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default CategoriesIndex;
