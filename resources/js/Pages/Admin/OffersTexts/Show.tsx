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

interface ShowProps {
    text: OffersText;
}

const Show: React.FC<ShowProps> = ({ text }) => {
    return (
        <AdminLayout>
            <Head title={`عرض نص العروض: ${text.key}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    عرض نص العروض: {text.key}
                                </h1>
                                <div className="flex space-x-2 space-x-reverse">
                                    <Link href={route('admin.offers-texts.edit', text.id)}>
                                        <PrimaryButton>
                                            تعديل
                                        </PrimaryButton>
                                    </Link>
                                    <Link href={route('admin.offers-texts.index')}>
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                            العودة للقائمة
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* العربية */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">النص العربي</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                العنوان
                                            </label>
                                            <div className="bg-white p-3 rounded border">
                                                {text.title_ar || 'غير محدد'}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                الوصف
                                            </label>
                                            <div className="bg-white p-3 rounded border min-h-[100px]">
                                                {text.description_ar || 'غير محدد'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* الإنجليزية */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">النص الإنجليزي</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                العنوان
                                            </label>
                                            <div className="bg-white p-3 rounded border">
                                                {text.title_en || 'غير محدد'}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                الوصف
                                            </label>
                                            <div className="bg-white p-3 rounded border min-h-[100px]">
                                                {text.description_en || 'غير محدد'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* معلومات إضافية */}
                            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات إضافية</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            المفتاح (Key)
                                        </label>
                                        <div className="bg-white p-3 rounded border font-mono">
                                            {text.key}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            الحالة
                                        </label>
                                        <div className="bg-white p-3 rounded border">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                text.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {text.is_active ? 'نشط' : 'غير نشط'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            ترتيب العرض
                                        </label>
                                        <div className="bg-white p-3 rounded border">
                                            {text.sort_order}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            تاريخ الإنشاء
                                        </label>
                                        <div className="bg-white p-3 rounded border">
                                            {new Date(text.created_at).toLocaleDateString('ar-SA')}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            آخر تحديث
                                        </label>
                                        <div className="bg-white p-3 rounded border">
                                            {new Date(text.updated_at).toLocaleDateString('ar-SA')}
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

export default Show;
