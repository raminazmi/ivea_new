import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';

interface Offer {
    id: number;
    title: string;
    discount_percentage: number;
    category_slug: string;
    category_name: string;
    image_path?: string;
    created_at: string;
    updated_at: string;
}

interface OffersIndexProps {
    offers: {
        data: Offer[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const OffersIndex: React.FC<OffersIndexProps> = ({ offers }) => {
    const handleDelete = (offer: Offer) => {
        if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
            router.delete(route('admin.offers.destroy', offer.id));
        }
    };

    const getCategoryBadge = (categorySlug: string) => {
        const colors = {
            curtains: 'bg-blue-100 text-blue-800',
            sofas: 'bg-purple-100 text-purple-800',
            cabinets: 'bg-green-100 text-green-800',
            wooden: 'bg-yellow-100 text-yellow-800'
        };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[categorySlug as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
                {categorySlug}
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title="إدارة العروض" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">إدارة العروض</h2>
                                    <p className="text-gray-600 mt-1">إدارة عروض اليوم الوطني والعروض الخاصة</p>
                                </div>
                                <Link
                                    href={route('admin.offers.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <FaPlus className="w-4 h-4 me-2" />
                                    إضافة عرض جديد
                                </Link>
                            </div>

                            {offers.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">🎁</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عروض</h3>
                                    <p className="text-gray-500 mb-6">ابدأ بإنشاء عرض جديد لجذب العملاء</p>
                                    <Link
                                        href={route('admin.offers.create')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <FaPlus className="w-4 h-4 me-2" />
                                        إضافة عرض جديد
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    العرض
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    الفئة
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    نسبة الخصم
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
                                            {offers.data.map((offer) => (
                                                <tr key={offer.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {offer.image_path && (
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img
                                                                        className="h-10 w-10 rounded-lg object-cover"
                                                                        src={`/storage/${offer.image_path}`}
                                                                        alt={offer.title}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="me-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {offer.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-sm text-gray-500">
                                                                {offer.category_name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            {offer.discount_percentage}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(offer.created_at).toLocaleDateString('en')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2 space-x-reverse">
                                                            <Link
                                                                href={route('admin.offers.show', offer.id)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                                title="عرض"
                                                            >
                                                                <FaEye className="w-4 h-4" />
                                                            </Link>
                                                            <Link
                                                                href={route('admin.offers.edit', offer.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                                title="تعديل"
                                                            >
                                                                <FaEdit className="w-4 h-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(offer)}
                                                                className="text-red-600 hover:text-red-900"
                                                                title="حذف"
                                                            >
                                                                <FaTrash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination */}
                            {offers.last_page > 1 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        عرض {((offers.current_page - 1) * offers.per_page) + 1} إلى {Math.min(offers.current_page * offers.per_page, offers.total)} من {offers.total} عرض
                                    </div>
                                    <div className="flex space-x-2 space-x-reverse">
                                        {offers.current_page > 1 && (
                                            <Link
                                                href={route('admin.offers.index', { page: offers.current_page - 1 })}
                                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                            >
                                                السابق
                                            </Link>
                                        )}
                                        {offers.current_page < offers.last_page && (
                                            <Link
                                                href={route('admin.offers.index', { page: offers.current_page + 1 })}
                                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                            >
                                                التالي
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default OffersIndex;
