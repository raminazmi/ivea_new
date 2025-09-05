import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaArrowRight, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

interface Offer {
    id: number;
    title: string;
    discount_percentage: number;
    category_slug: string;
    category_name: string;
    created_at: string;
    updated_at: string;
}

interface ShowOfferProps {
    offer: Offer;
}

const ShowOffer: React.FC<ShowOfferProps> = ({ offer }) => {
    const getCategoryImage = (categorySlug: string) => {
        const categoryImages = {
            curtains: '/images/curtain.png',
            sofas: '/images/sofa3.png',
            cabinets: '/images/treasury.png',
            wooden: '/images/chair.png'
        };
        return categoryImages[categorySlug as keyof typeof categoryImages] || '/images/default-offer.png';
    };

    const getCategoryBadge = (categorySlug: string) => {
        const colors = {
            curtains: 'bg-blue-100 text-blue-800',
            sofas: 'bg-purple-100 text-purple-800',
            cabinets: 'bg-green-100 text-green-800',
            wooden: 'bg-yellow-100 text-yellow-800'
        };
        
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[categorySlug as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
                {categorySlug}
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title={`عرض: ${offer.title}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">تفاصيل العرض</h2>
                                    <p className="text-gray-600 mt-1">عرض تفصيلي للعرض: {offer.title}</p>
                                </div>
                                <div className="flex space-x-3 space-x-reverse">
                                    <Link
                                        href={route('admin.offers.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <FaArrowRight className="w-4 h-4 me-2" />
                                        العودة للقائمة
                                    </Link>
                                    <Link
                                        href={route('admin.offers.edit', offer.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <FaEdit className="w-4 h-4 me-2" />
                                        تعديل
                                    </Link>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Info */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Title */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">الفئة</h4>
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                                {getCategoryBadge(offer.category_slug)}
                                                <span className="text-sm text-gray-900">{offer.category_name}</span>
                                            </div>
                                        </div>

                                        <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">نسبة الخصم</h4>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-lg font-bold bg-yellow-100 text-yellow-800">
                                                {offer.discount_percentage}%
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                {/* Image Preview */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">صورة الفئة</h4>
                                        <div className="space-y-3">
                                            <img
                                                src={getCategoryImage(offer.category_slug)}
                                                alt={offer.title}
                                                className="w-full h-48 object-contain rounded-lg border border-gray-300"
                                            />
                                            <div className="text-xs text-gray-500">
                                                <p>صورة تلقائية حسب الفئة: {offer.category_name}</p>
                                            </div>
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

export default ShowOffer;
