import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaArrowRight, FaSave } from 'react-icons/fa';

interface Offer {
    id: number;
    title: string;
    discount_percentage: number;
    category_slug: string;
    category_name: string;
    created_at: string;
    updated_at: string;
}

interface EditOfferProps {
    offer: Offer;
}

const EditOffer: React.FC<EditOfferProps> = ({ offer }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: offer.title,
        discount_percentage: offer.discount_percentage,
        category_slug: offer.category_slug,
        category_name: offer.category_name
    });

    const categories = [
        { slug: 'curtains', name: 'ستائر' },
        { slug: 'sofas', name: 'كنب' },
        { slug: 'cabinets', name: 'خزائن' },
        { slug: 'wooden', name: 'خشبيات' }
    ];


    const handleCategoryChange = (categorySlug: string) => {
        const category = categories.find(cat => cat.slug === categorySlug);
        setData('category_slug', categorySlug);
        setData('category_name', category?.name || '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.offers.update', offer.id));
    };

    return (
        <AdminLayout>
            <Head title={`تعديل العرض: ${offer.title}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">تعديل العرض</h2>
                                    <p className="text-gray-600 mt-1">تعديل بيانات العرض: {offer.title}</p>
                                </div>
                                <Link
                                    href={route('admin.offers.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <FaArrowRight className="w-4 h-4 me-2" />
                                    العودة للقائمة
                                </Link>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            عنوان العرض *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="مثال: عرض اليوم الوطني"
                                            required
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>


                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category_slug" className="block text-sm font-medium text-gray-700 mb-2">
                                            الفئة *
                                        </label>
                                        <select
                                            id="category_slug"
                                            value={data.category_slug}
                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
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

                                    {/* Discount Percentage */}
                                    <div>
                                        <label htmlFor="discount_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                                            نسبة الخصم (%) *
                                        </label>
                                        <input
                                            type="number"
                                            id="discount_percentage"
                                            value={data.discount_percentage}
                                            onChange={(e) => setData('discount_percentage', parseInt(e.target.value))}
                                            min="1"
                                            max="100"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        {errors.discount_percentage && (
                                            <p className="mt-1 text-sm text-red-600">{errors.discount_percentage}</p>
                                        )}
                                    </div>


                                    {/* Category Image Preview */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            معاينة صورة الفئة
                                        </label>
                                        <div className="flex justify-center p-4 border border-gray-300 rounded-md bg-gray-50">
                                            <img
                                                src={`/images/${data.category_slug === 'curtains' ? 'curtain.png' :
                                                    data.category_slug === 'sofas' ? 'sofa.png' :
                                                        data.category_slug === 'cabinets' ? 'treasury_new.png' :
                                                            data.category_slug === 'wooden' ? 'door.png' : 'curtain.png'}`}
                                                alt={data.category_name}
                                                className="h-24 w-24 object-contain"
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500 text-center">
                                            ستظهر هذه الصورة تلقائياً حسب الفئة المختارة
                                        </p>
                                    </div>

                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-3 space-x-reverse">
                                    <Link
                                        href={route('admin.offers.index')}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        إلغاء
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        <FaSave className="w-4 h-4 me-2" />
                                        {processing ? 'جاري التحديث...' : 'تحديث العرض'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditOffer;
