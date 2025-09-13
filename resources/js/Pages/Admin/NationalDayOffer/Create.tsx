import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const Create: React.FC = () => {
    const [offer1ImagePreview, setOffer1ImagePreview] = useState<string | null>(null);
    const [offer2ImagePreview, setOffer2ImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title_ar: '',
        description_ar: '',
        button_text_ar: 'افتح المتجر',
        button_url: '/products',
        offer1_title: '',
        offer1_discount_percentage: 25,
        offer1_category_slug: 'curtains',
        offer1_category_name: 'ستائر',
        offer1_image: null as File | null,
        offer1_link: '/products?main_category=curtains',
        offer2_title: '',
        offer2_discount_percentage: 30,
        offer2_category_slug: 'sofas',
        offer2_category_name: 'أرائك',
        offer2_image: null as File | null,
        offer2_link: '/products?main_category=sofas',
        is_active: true as boolean
    });

    const categories = [
        { slug: 'curtains', name: 'ستائر' },
        { slug: 'sofas', name: 'أرائك' },
        { slug: 'cabinets', name: 'خزائن' },
        { slug: 'wooden', name: 'خشبي' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title_ar', data.title_ar);
        formData.append('description_ar', data.description_ar);
        formData.append('button_text_ar', data.button_text_ar);
        formData.append('button_url', data.button_url);
        formData.append('offer1_title', data.offer1_title);
        formData.append('offer1_discount_percentage', data.offer1_discount_percentage.toString());
        formData.append('offer1_category_slug', data.offer1_category_slug);
        formData.append('offer1_category_name', data.offer1_category_name);
        formData.append('offer1_link', data.offer1_link);
        formData.append('offer2_title', data.offer2_title);
        formData.append('offer2_discount_percentage', data.offer2_discount_percentage.toString());
        formData.append('offer2_category_slug', data.offer2_category_slug);
        formData.append('offer2_category_name', data.offer2_category_name);
        formData.append('offer2_link', data.offer2_link);
        formData.append('is_active', data.is_active.toString());
        
        if (data.offer1_image) {
            formData.append('offer1_image', data.offer1_image);
        }
        
        if (data.offer2_image) {
            formData.append('offer2_image', data.offer2_image);
        }

        post(route('admin.national-day-offer.store'), {
            forceFormData: true
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'offer1' | 'offer2') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'offer1') {
                    setOffer1ImagePreview(e.target?.result as string);
                    setData('offer1_image', file);
                } else {
                    setOffer2ImagePreview(e.target?.result as string);
                    setData('offer2_image', file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (categorySlug: string, type: 'offer1' | 'offer2') => {
        const category = categories.find(c => c.slug === categorySlug);
        if (category) {
            if (type === 'offer1') {
                setData('offer1_category_slug', categorySlug);
                setData('offer1_category_name', category.name);
                setData('offer1_link', `/products?main_category=${categorySlug}`);
            } else {
                setData('offer2_category_slug', categorySlug);
                setData('offer2_category_name', category.name);
                setData('offer2_link', `/products?main_category=${categorySlug}`);
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="إنشاء سكشن عرض اليوم الوطني" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    إنشاء سكشن عرض اليوم الوطني
                                </h1>
                                <SecondaryButton
                                    onClick={() => window.history.back()}
                                >
                                    العودة
                                </SecondaryButton>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* معلومات السكشن */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">معلومات السكشن</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="title_ar" className="block text-sm font-medium text-gray-700 mb-2">
                                                العنوان
                                            </label>
                                            <input
                                                type="text"
                                                id="title_ar"
                                                value={data.title_ar}
                                                onChange={(e) => setData('title_ar', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="عــــرض اليوم الوطـنـي"
                                            />
                                            {errors.title_ar && (
                                                <p className="mt-1 text-sm text-red-600">{errors.title_ar}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="button_text_ar" className="block text-sm font-medium text-gray-700 mb-2">
                                                نص الزر
                                            </label>
                                            <input
                                                type="text"
                                                id="button_text_ar"
                                                value={data.button_text_ar}
                                                onChange={(e) => setData('button_text_ar', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="افتح المتجر"
                                            />
                                            {errors.button_text_ar && (
                                                <p className="mt-1 text-sm text-red-600">{errors.button_text_ar}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="description_ar" className="block text-sm font-medium text-gray-700 mb-2">
                                            الوصف
                                        </label>
                                        <textarea
                                            id="description_ar"
                                            value={data.description_ar}
                                            onChange={(e) => setData('description_ar', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل..."
                                        />
                                        {errors.description_ar && (
                                            <p className="mt-1 text-sm text-red-600">{errors.description_ar}</p>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="button_url" className="block text-sm font-medium text-gray-700 mb-2">
                                            رابط الزر
                                        </label>
                                        <input
                                            type="text"
                                            id="button_url"
                                            value={data.button_url}
                                            onChange={(e) => setData('button_url', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="/products"
                                        />
                                        {errors.button_url && (
                                            <p className="mt-1 text-sm text-red-600">{errors.button_url}</p>
                                        )}
                                    </div>
                                </div>

                                {/* العرض الأول */}
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">العرض الأول</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="offer1_title" className="block text-sm font-medium text-gray-700 mb-2">
                                                عنوان العرض
                                            </label>
                                            <input
                                                type="text"
                                                id="offer1_title"
                                                value={data.offer1_title}
                                                onChange={(e) => setData('offer1_title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="خصم على الستائر"
                                            />
                                            {errors.offer1_title && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer1_title}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="offer1_discount_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                                                نسبة الخصم (%)
                                            </label>
                                            <input
                                                type="number"
                                                id="offer1_discount_percentage"
                                                value={data.offer1_discount_percentage}
                                                onChange={(e) => setData('offer1_discount_percentage', parseInt(e.target.value))}
                                                min="1"
                                                max="100"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {errors.offer1_discount_percentage && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer1_discount_percentage}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="offer1_category_slug" className="block text-sm font-medium text-gray-700 mb-2">
                                                الفئة
                                            </label>
                                            <select
                                                id="offer1_category_slug"
                                                value={data.offer1_category_slug}
                                                onChange={(e) => handleCategoryChange(e.target.value, 'offer1')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {categories.map((category) => (
                                                    <option key={category.slug} value={category.slug}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.offer1_category_slug && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer1_category_slug}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="offer1_link" className="block text-sm font-medium text-gray-700 mb-2">
                                                رابط العرض
                                            </label>
                                            <input
                                                type="text"
                                                id="offer1_link"
                                                value={data.offer1_link}
                                                onChange={(e) => setData('offer1_link', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="/products?main_category=curtains"
                                            />
                                            {errors.offer1_link && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer1_link}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="offer1_image" className="block text-sm font-medium text-gray-700 mb-2">
                                            صورة العرض (اختياري)
                                        </label>
                                        <input
                                            type="file"
                                            id="offer1_image"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'offer1')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {offer1ImagePreview && (
                                            <div className="mt-2">
                                                <img src={offer1ImagePreview} alt="معاينة الصورة" className="h-32 w-32 object-cover rounded" />
                                            </div>
                                        )}
                                        {errors.offer1_image && (
                                            <p className="mt-1 text-sm text-red-600">{errors.offer1_image}</p>
                                        )}
                                    </div>
                                </div>

                                {/* العرض الثاني */}
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">العرض الثاني</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="offer2_title" className="block text-sm font-medium text-gray-700 mb-2">
                                                عنوان العرض
                                            </label>
                                            <input
                                                type="text"
                                                id="offer2_title"
                                                value={data.offer2_title}
                                                onChange={(e) => setData('offer2_title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="عرض الأرائك"
                                            />
                                            {errors.offer2_title && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer2_title}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="offer2_discount_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                                                نسبة الخصم (%)
                                            </label>
                                            <input
                                                type="number"
                                                id="offer2_discount_percentage"
                                                value={data.offer2_discount_percentage}
                                                onChange={(e) => setData('offer2_discount_percentage', parseInt(e.target.value))}
                                                min="1"
                                                max="100"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {errors.offer2_discount_percentage && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer2_discount_percentage}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="offer2_category_slug" className="block text-sm font-medium text-gray-700 mb-2">
                                                الفئة
                                            </label>
                                            <select
                                                id="offer2_category_slug"
                                                value={data.offer2_category_slug}
                                                onChange={(e) => handleCategoryChange(e.target.value, 'offer2')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {categories.map((category) => (
                                                    <option key={category.slug} value={category.slug}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.offer2_category_slug && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer2_category_slug}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="offer2_link" className="block text-sm font-medium text-gray-700 mb-2">
                                                رابط العرض
                                            </label>
                                            <input
                                                type="text"
                                                id="offer2_link"
                                                value={data.offer2_link}
                                                onChange={(e) => setData('offer2_link', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="/products?main_category=sofas"
                                            />
                                            {errors.offer2_link && (
                                                <p className="mt-1 text-sm text-red-600">{errors.offer2_link}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="offer2_image" className="block text-sm font-medium text-gray-700 mb-2">
                                            صورة العرض (اختياري)
                                        </label>
                                        <input
                                            type="file"
                                            id="offer2_image"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'offer2')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {offer2ImagePreview && (
                                            <div className="mt-2">
                                                <img src={offer2ImagePreview} alt="معاينة الصورة" className="h-32 w-32 object-cover rounded" />
                                            </div>
                                        )}
                                        {errors.offer2_image && (
                                            <p className="mt-1 text-sm text-red-600">{errors.offer2_image}</p>
                                        )}
                                    </div>
                                </div>

                                {/* حالة النشاط */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="mr-2 block text-sm text-gray-900">
                                        نشط
                                    </label>
                                </div>

                                {/* أزرار الإجراءات */}
                                <div className="flex justify-end space-x-3 space-x-reverse">
                                    <SecondaryButton
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </SecondaryButton>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? 'جاري الحفظ...' : 'حفظ'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Create;
