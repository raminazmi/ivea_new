import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface OffersText {
    id: number;
    key: string;
    title_ar: string;
    description_ar: string;
    is_active: boolean;
    sort_order: number;
}

interface FeaturedOffersSetting {
    id: number;
    title_ar: string;
    description_ar: string;
    button_text_ar: string;
    button_url: string;
    is_active: boolean;
}

interface Category {
    slug: string;
    name: string;
}

interface CreateFeaturedOfferProps {
    offersTexts: OffersText[];
    featuredOffersSettings: FeaturedOffersSetting[];
    categories: Category[];
}

const CreateFeaturedOffer: React.FC<CreateFeaturedOfferProps> = ({ offersTexts, featuredOffersSettings, categories }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        discount_percentage: 10,
        category_slug: '',
        category_name: '',
        offers_text_id: null as number | null,
        featured_offers_setting_id: null as number | null,
        image: null as File | null,
        is_active: true as boolean
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('discount_percentage', data.discount_percentage.toString());
        formData.append('category_slug', data.category_slug);
        formData.append('category_name', data.category_name);
        formData.append('is_active', data.is_active.toString());
        
        if (data.offers_text_id) {
            formData.append('offers_text_id', data.offers_text_id.toString());
        }
        
        if (data.featured_offers_setting_id) {
            formData.append('featured_offers_setting_id', data.featured_offers_setting_id.toString());
        }
        
        if (data.image) {
            formData.append('image', data.image);
        }

        post(route('admin.landing-page.featured-offers.store'), {
            forceFormData: true
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (categorySlug: string) => {
        const category = categories.find(c => c.slug === categorySlug);
        setData({
            ...data,
            category_slug: categorySlug,
            category_name: category?.name || ''
        });
    };

    return (
        <AdminLayout>
            <Head title="إضافة عرض مميز جديد" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">إضافة عرض مميز جديد</h2>
                                <SecondaryButton
                                    onClick={() => window.history.back()}
                                >
                                    رجوع
                                </SecondaryButton>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* العنوان */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        عنوان العرض *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="أدخل عنوان العرض"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* نسبة الخصم */}
                                <div>
                                    <label htmlFor="discount_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                                        نسبة الخصم (%) *
                                    </label>
                                    <input
                                        type="number"
                                        id="discount_percentage"
                                        min="1"
                                        max="100"
                                        value={data.discount_percentage}
                                        onChange={(e) => setData('discount_percentage', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.discount_percentage && (
                                        <p className="mt-1 text-sm text-red-600">{errors.discount_percentage}</p>
                                    )}
                                </div>

                                {/* الفئة */}
                                <div>
                                    <label htmlFor="category_slug" className="block text-sm font-medium text-gray-700 mb-2">
                                        الفئة *
                                    </label>
                                    <select
                                        id="category_slug"
                                        value={data.category_slug}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">اختر الفئة</option>
                                        {categories.map((category) => (
                                            <option key={category.slug} value={category.slug}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_slug && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category_slug}</p>
                                    )}
                                </div>

                                {/* نص العرض */}
                                <div>
                                    <label htmlFor="offers_text_id" className="block text-sm font-medium text-gray-700 mb-2">
                                        نص العرض (اختياري)
                                    </label>
                                    <select
                                        id="offers_text_id"
                                        value={data.offers_text_id || ''}
                                        onChange={(e) => setData('offers_text_id', e.target.value ? parseInt(e.target.value) : null)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">اختر نص العرض</option>
                                        {offersTexts.map((text) => (
                                            <option key={text.id} value={text.id}>
                                                {text.title_ar}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.offers_text_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.offers_text_id}</p>
                                    )}
                                </div>

                                {/* إعدادات العروض المميزة */}
                                <div>
                                    <label htmlFor="featured_offers_setting_id" className="block text-sm font-medium text-gray-700 mb-2">
                                        إعدادات العروض المميزة (اختياري)
                                    </label>
                                    <select
                                        id="featured_offers_setting_id"
                                        value={data.featured_offers_setting_id || ''}
                                        onChange={(e) => setData('featured_offers_setting_id', e.target.value ? parseInt(e.target.value) : null)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">اختر إعدادات العروض</option>
                                        {featuredOffersSettings.map((setting) => (
                                            <option key={setting.id} value={setting.id}>
                                                {setting.title_ar}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.featured_offers_setting_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.featured_offers_setting_id}</p>
                                    )}
                                </div>

                                {/* الصورة */}
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                        صورة العرض (اختياري)
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                    )}
                                    
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img
                                                src={imagePreview}
                                                alt="معاينة الصورة"
                                                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* الحالة */}
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

                                {/* أزرار التحكم */}
                                <div className="flex gap-4 pt-6">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        {processing ? 'جاري الحفظ...' : 'حفظ العرض'}
                                    </PrimaryButton>
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateFeaturedOffer;
