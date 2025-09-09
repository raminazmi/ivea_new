import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
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
    created_at: string;
    updated_at: string;
}

interface IndexProps {
    texts: OffersText[];
}

const Index: React.FC<IndexProps> = ({ texts }) => {
    return (
        <AdminLayout>
            <Head title="إدارة نصوص العروض" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    إدارة نصوص العروض
                                </h1>
                                <Link href={route('admin.offers-texts.create')}>
                                    <PrimaryButton>
                                        إضافة نص جديد
                                    </PrimaryButton>
                                </Link>
                            </div>

                            {texts.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">لا توجد نصوص للعروض</p>
                                    <Link href={route('admin.offers-texts.create')}>
                                        <PrimaryButton>
                                            إضافة أول نص
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    المفتاح
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    العنوان (عربي)
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    العنوان (إنجليزي)
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    الحالة
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
                                            {texts.map((text) => (
                                                <tr key={text.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {text.key}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {text.title_ar || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {text.title_en || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            text.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {text.is_active ? 'نشط' : 'غير نشط'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {text.sort_order}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2 space-x-reverse">
                                                            <Link
                                                                href={route('admin.offers-texts.edit', text.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                تعديل
                                                            </Link>
                                                            <Link
                                                                href={route('admin.offers-texts.show', text.id)}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                عرض
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
