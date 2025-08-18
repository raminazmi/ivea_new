import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiArrowLeft, HiMail, HiPhone, HiCalendar, HiUser } from 'react-icons/hi';

interface ProjectQuiz {
    id: number;
    space_types: string[];
    space_type_other?: string;
    product_needs: string[];
    product_other?: string;
    preferred_styles: string[];
    style_other?: string;
    name: string;
    email: string;
    phone: string;
    additional_notes?: string;
    created_at: string;
}

interface QuizShowProps {
    quiz: ProjectQuiz;
}

const QuizShow: React.FC<QuizShowProps> = ({ quiz }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // تعريف القواميس للتعريب
    const SPACE_TYPES: Record<string, string> = {
        residential: 'سكني',
        offices: 'مكاتب',
        hotels: 'فنادق',
        shops: 'محلات',
        living_room: 'صالة المعيشة',
        bedroom: 'غرفة النوم',
        kitchen: 'المطبخ',
        office: 'المكتب',
        restaurant: 'مطعم',
        hotel: 'فندق',
        other: 'أخرى'
    };
    const PRODUCT_NEEDS: Record<string, string> = {
        curtains: 'ستائر',
        furniture: 'أثاث',
        cabinets: 'خزائن',
        doors: 'أبواب',
        woodwork: 'خشبيات',
        finishes: 'تشطيبات',
        other: 'أخرى'
    };
    const PREFERRED_STYLES: Record<string, string> = {
        modern: 'عصري',
        classic: 'كلاسيكي',
        minimalist: 'بساطة',
        luxury: 'فخم',
        other: 'أخرى'
    };

    return (
        <AdminLayout>
            <Head title={`تفاصيل اختبار - ${quiz.name}`} />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                        العودة للقائمة
                    </Link>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <h1 className="text-2xl font-bold text-gray-900">تفاصيل اختبار الأسلوب</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <HiUser className="w-5 h-5" />
                                المعلومات الشخصية
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                                    <p className="text-gray-900">{quiz.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                                    <div className="flex items-center gap-2">
                                        <HiMail className="w-4 h-4 text-gray-400" />
                                        <a href={`mailto:${quiz.email}`} className="text-blue-600 hover:text-blue-800">
                                            {quiz.email}
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                                    <div className="flex items-center gap-2">
                                        <HiPhone className="w-4 h-4 text-gray-400" />
                                        <a href={`tel:${quiz.phone}`} className="text-blue-600 hover:text-blue-800">
                                            {quiz.phone}
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الإرسال</label>
                                    <div className="flex items-center gap-2">
                                        <HiCalendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-900">{formatDate(quiz.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">أنواع المساحات</h3>
                                <div className="flex flex-wrap gap-2">
                                    {quiz.space_types.map((type, index) => (
                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {SPACE_TYPES[type] || type}
                                        </span>
                                    ))}
                                </div>
                                {quiz.space_type_other && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">أخرى (محددة)</label>
                                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{quiz.space_type_other}</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">احتياجات المنتجات</h3>
                                <div className="flex flex-wrap gap-2">
                                    {quiz.product_needs.map((need, index) => (
                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            {PRODUCT_NEEDS[need] || need}
                                        </span>
                                    ))}
                                </div>
                                {quiz.product_other && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">أخرى (محددة)</label>
                                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{quiz.product_other}</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">الأساليب المفضلة</h3>
                                <div className="flex flex-wrap gap-2">
                                    {quiz.preferred_styles.map((style, index) => (
                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                            {PREFERRED_STYLES[style] || style}
                                        </span>
                                    ))}
                                </div>
                                {quiz.style_other && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">أخرى (محددة)</label>
                                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{quiz.style_other}</p>
                                    </div>
                                )}
                            </div>

                            {quiz.additional_notes && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ملاحظات إضافية</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-900 whitespace-pre-wrap">{quiz.additional_notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <Link
                        href={`/admin/projects/quizzes/${quiz.id}/edit`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        تعديل الاختبار
                    </Link>
                    <a
                        href={`mailto:${quiz.email}?subject=حول اختبار الأسلوب الخاص بك`}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        إرسال رد بالبريد
                    </a>
                    <a
                        href={`tel:${quiz.phone}`}
                        className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        الاتصال بالعميل
                    </a>
                </div>
            </div>
        </AdminLayout>
    );
};

export default QuizShow;
