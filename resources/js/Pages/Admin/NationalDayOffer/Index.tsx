import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface NationalDayOffer {
    id: number;
    title_ar: string;
    description_ar: string;
    button_text_ar: string;
    button_url: string;
    offer1_title: string;
    offer1_discount_percentage: number;
    offer1_category_slug: string;
    offer1_category_name: string;
    offer1_image_path?: string;
    offer1_link: string;
    offer2_title: string;
    offer2_discount_percentage: number;
    offer2_category_slug: string;
    offer2_category_name: string;
    offer2_image_path?: string;
    offer2_link: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface IndexProps {
    nationalDayOffer?: NationalDayOffer;
}

const Index: React.FC<IndexProps> = ({ nationalDayOffer }) => {
    return (
        <AdminLayout>
            <Head title="إدارة سكشن عرض اليوم الوطني" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    إدارة سكشن عرض اليوم الوطني
                                </h1>
                                {!nationalDayOffer && (
                                    <Link
                                        href={route('admin.national-day-offer.create')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        إنشاء سكشن جديد
                                    </Link>
                                )}
                            </div>

                            {nationalDayOffer ? (
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="px-6 py-4 bg-gray-50 border-b">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {nationalDayOffer.title_ar}
                                            </h2>
                                            <div className="flex space-x-2 space-x-reverse">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    nationalDayOffer.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {nationalDayOffer.is_active ? 'نشط' : 'غير نشط'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* معلومات السكشن */}
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">معلومات السكشن</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">العنوان</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.title_ar}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">الوصف</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.description_ar}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">نص الزر</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.button_text_ar}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">رابط الزر</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.button_url}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* العرض الأول */}
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">العرض الأول</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">العنوان</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer1_title}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">نسبة الخصم</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer1_discount_percentage}%</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">الفئة</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer1_category_name}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">الرابط</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer1_link}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* العرض الثاني */}
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">العرض الثاني</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">العنوان</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer2_title}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">نسبة الخصم</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer2_discount_percentage}%</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">الفئة</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer2_category_name}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">الرابط</label>
                                                        <p className="mt-1 text-sm text-gray-900">{nationalDayOffer.offer2_link}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* أزرار الإجراءات */}
                                        <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
                                            <Link
                                                href={route('admin.national-day-offer.edit', nationalDayOffer.id)}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                تعديل
                                            </Link>
                                            
                                            <Link
                                                href={route('admin.national-day-offer.toggle-status', nationalDayOffer.id)}
                                                method="patch"
                                                className={`font-bold py-2 px-4 rounded ${
                                                    nationalDayOffer.is_active
                                                        ? 'bg-red-500 hover:bg-red-700 text-white'
                                                        : 'bg-green-500 hover:bg-green-700 text-white'
                                                }`}
                                            >
                                                {nationalDayOffer.is_active ? 'إخفاء' : 'إظهار'}
                                            </Link>

                                            <Link
                                                href={route('admin.national-day-offer.destroy', nationalDayOffer.id)}
                                                method="delete"
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onBefore={() => confirm('هل أنت متأكد من حذف هذا السكشن؟')}
                                            >
                                                حذف
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 text-lg mb-4">
                                        لا يوجد سكشن عرض اليوم الوطني
                                    </div>
                                    <Link
                                        href={route('admin.national-day-offer.create')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        إنشاء سكشن جديد
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

export default Index;
