import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Toast from '@/Components/Common/Toast';
import { HiArrowLeft, HiSave } from 'react-icons/hi';

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

interface QuizEditProps {
    quiz: ProjectQuiz;
    spaceTypes: Record<string, string>;
    productNeeds: Record<string, string>;
    preferredStyles: Record<string, string>;
}

const QuizEdit: React.FC<QuizEditProps> = ({ quiz, spaceTypes, productNeeds, preferredStyles }) => {
    const { data, setData, put, processing, errors, wasSuccessful } = useForm({
        name: quiz.name,
        email: quiz.email,
        phone: quiz.phone,
        space_types: quiz.space_types,
        space_type_other: quiz.space_type_other || '',
        product_needs: quiz.product_needs,
        product_other: quiz.product_other || '',
        preferred_styles: quiz.preferred_styles,
        style_other: quiz.style_other || '',
        additional_notes: quiz.additional_notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.projects.quizzes.update', quiz.id));
    };

    const handleCheckboxChange = (field: 'space_types' | 'product_needs' | 'preferred_styles', value: string, checked: boolean) => {
        const currentValues = data[field] as string[];
        if (checked) {
            setData(field, [...currentValues, value]);
        } else {
            setData(field, currentValues.filter(v => v !== value));
        }
    };

    return (
        <AdminLayout>
            <Head title={`تعديل اختبار - ${quiz.name}`} />

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
                    <h1 className="text-2xl font-bold text-gray-900">تعديل اختبار الأسلوب</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الشخصية</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        title="أدخل الاسم"
                                        aria-label="الاسم"
                                        placeholder="أدخل الاسم"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        title="أدخل البريد الإلكتروني"
                                        aria-label="البريد الإلكتروني"
                                        placeholder="أدخل البريد الإلكتروني"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        title="أدخل رقم الهاتف"
                                        aria-label="رقم الهاتف"
                                        placeholder="أدخل رقم الهاتف"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">ملاحظات إضافية</h2>
                            <div>
                                <textarea
                                    value={data.additional_notes}
                                    onChange={(e) => setData('additional_notes', e.target.value)}
                                    rows={8}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="أي ملاحظات إضافية..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">أنواع المساحات</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.entries(spaceTypes).map(([key, label]) => (
                                <div key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`space_${key}`}
                                        checked={data.space_types.includes(key)}
                                        onChange={(e) => handleCheckboxChange('space_types', key, e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`space_${key}`} className="mr-2 block text-sm text-gray-900">
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {data.space_types.includes('other') && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">أخرى (حدد)</label>
                                <input
                                    type="text"
                                    value={data.space_type_other}
                                    onChange={(e) => setData('space_type_other', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    title="أدخل نوع المساحة الأخرى"
                                    aria-label="نوع المساحة الأخرى"
                                    placeholder="أدخل نوع المساحة الأخرى"
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">احتياجات المنتجات</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.entries(productNeeds).map(([key, label]) => (
                                <div key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`product_${key}`}
                                        checked={data.product_needs.includes(key)}
                                        onChange={(e) => handleCheckboxChange('product_needs', key, e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`product_${key}`} className="mr-2 block text-sm text-gray-900">
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {data.product_needs.includes('other') && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">أخرى (حدد)</label>
                                <input
                                    type="text"
                                    value={data.product_other}
                                    onChange={(e) => setData('product_other', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    title="أدخل احتياجات المنتجات الأخرى"
                                    aria-label="احتياجات المنتجات الأخرى"
                                    placeholder="أدخل احتياجات المنتجات الأخرى"
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">الأساليب المفضلة</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.entries(preferredStyles).map(([key, label]) => (
                                <div key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`style_${key}`}
                                        checked={data.preferred_styles.includes(key)}
                                        onChange={(e) => handleCheckboxChange('preferred_styles', key, e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`style_${key}`} className="mr-2 block text-sm text-gray-900">
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {data.preferred_styles.includes('other') && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">أخرى (حدد)</label>
                                <input
                                    type="text"
                                    value={data.style_other}
                                    onChange={(e) => setData('style_other', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    title="أدخل الأسلوب الآخر"
                                    aria-label="الأسلوب الآخر"
                                    placeholder="أدخل الأسلوب الآخر"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <HiSave className="w-4 h-4" />
                            {processing ? 'جار الحفظ...' : 'حفظ التغييرات'}
                        </button>
                        <Link
                            href="/admin/projects"
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            إلغاء
                        </Link>
                    </div>
                </form>

                {wasSuccessful && (
                    <Toast
                        message="تم تحديث الاختبار بنجاح"
                        type="success"
                        isVisible={wasSuccessful}
                        onClose={() => { }}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default QuizEdit;
