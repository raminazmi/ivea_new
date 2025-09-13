import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface HeroSlide {
    id: number;
    title: string;
    subtitle?: string;
    image_path: string;
    alt_text?: string;
    link_url?: string;
    link_text?: string;
    button_text?: string;
    button_url?: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}


interface PreparingForSummer {
    id: number;
    title_ar: string;
    description_ar: string;
    button_text_ar: string;
    button_url: string;
    image_1_path?: string;
    image_1_alt?: string;
    image_1_url?: string;
    image_2_path?: string;
    image_2_alt?: string;
    image_2_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Offer {
    id: number;
    title: string;
    discount_percentage: number;
    category_slug: string;
    category_name: string;
    image_path?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface OffersText {
    id: number;
    key: string;
    title_ar: string;
    description_ar: string;
    is_active: boolean;
    sort_order: number;
}

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

interface LandingPageIndexProps {
    heroSlides: HeroSlide[];
    preparingForSummer?: PreparingForSummer;
    featuredOffers: Offer[];
    offersTexts: OffersText[];
    nationalDayOffer?: NationalDayOffer;
}

const LandingPageIndex: React.FC<LandingPageIndexProps> = ({ heroSlides, preparingForSummer, featuredOffers, offersTexts, nationalDayOffer }) => {

    const handleDeleteSlide = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الشريحة؟')) {
            router.delete(route('admin.landing-page.slides.destroy', id));
        }
    };

    const toggleSlideStatus = (slide: HeroSlide) => {
        router.put(route('admin.landing-page.slides.update', slide.id), {
            ...slide,
            is_active: !slide.is_active
        });
    };

    const handleDeletePreparingForSummer = (id: number) => {
        if (confirm('هل أنت متأكد من حذف سكشن Preparing For Summer؟')) {
            router.delete(route('admin.landing-page.preparing-for-summer.destroy', id));
        }
    };

    const togglePreparingForSummerStatus = (preparingForSummer: PreparingForSummer) => {
        router.put(route('admin.landing-page.preparing-for-summer.update', preparingForSummer.id), {
            ...preparingForSummer,
            is_active: !preparingForSummer.is_active
        });
    };

    const handleDeleteFeaturedOffer = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا العرض المميز؟')) {
            router.delete(route('admin.landing-page.featured-offers.destroy', id));
        }
    };

    const toggleFeaturedOfferStatus = (offer: Offer) => {
        router.patch(route('admin.landing-page.featured-offers.update-status', offer.id), {
            is_active: !offer.is_active
        });
    };

    const handleDeleteNationalDayOffer = (id: number) => {
        if (confirm('هل أنت متأكد من حذف سكشن عرض اليوم الوطني؟')) {
            router.delete(route('admin.landing-page.national-day-offer.destroy', id));
        }
    };

    const toggleNationalDayOfferStatus = (nationalDayOffer: NationalDayOffer) => {
        router.patch(route('admin.landing-page.national-day-offer.toggle-status', nationalDayOffer.id));
    };

    return (
        <AdminLayout>
            <Head title="إدارة الصفحة الرئيسية" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">إدارة الصفحة الرئيسية</h2>
                                <div className="flex gap-2">
                                    <Link href={route('admin.landing-page.slides.create')}>
                                        <PrimaryButton>إضافة بنر جديد</PrimaryButton>
                                    </Link>
                                    {!preparingForSummer && (
                                        <Link href={route('admin.landing-page.preparing-for-summer.create')}>
                                            <PrimaryButton>إضافة سكشن الصيف</PrimaryButton>
                                        </Link>
                                    )}
                                    {!nationalDayOffer && (
                                        <Link href={route('admin.landing-page.national-day-offer.create')}>
                                            <PrimaryButton>إضافة سكشن عرض اليوم الوطني</PrimaryButton>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Hero Slides */}
                            <div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold">البانرات</h3>
                                </div>

                                    {heroSlides.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500 mb-4">لا توجد بنرات حالياً</p>
                                            <Link href={route('admin.landing-page.slides.create')}>
                                                <PrimaryButton>إضافة أول بنر</PrimaryButton>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {heroSlides.map((slide) => (
                                                <div key={slide.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                                    <div className="aspect-video bg-gray-100">
                                                        <img
                                                            src={slide.image_path ? `/storage/${slide.image_path}` : '/images/placeholder.jpg'}
                                                            alt={slide.alt_text || slide.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <h4 className="font-semibold text-lg mb-2">{slide.title}</h4>
                                                        <div className="flex items-center justify-between">
                                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                                slide.is_active 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {slide.is_active ? 'نشط' : 'غير نشط'}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2 mt-4">
                                                            <Link
                                                                href={route('admin.landing-page.slides.edit', slide.id)}
                                                                className="flex-1 text-center py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                            >
                                                                تعديل
                                                            </Link>
                                                            <button
                                                                onClick={() => toggleSlideStatus(slide)}
                                                                className={`flex-1 py-2 px-3 rounded text-sm ${
                                                                    slide.is_active
                                                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                                        : 'bg-green-500 text-white hover:bg-green-600'
                                                                }`}
                                                            >
                                                                {slide.is_active ? 'غير نشط' : 'نشط'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteSlide(slide.id)}
                                                                className="flex-1 py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                            >
                                                                حذف
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            {/* National Day Offer Section */}
                            <div className="mt-8">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold">سكشن عرض اليوم الوطني</h3>
                                </div>

                                {!nationalDayOffer ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-4">لا يوجد سكشن عرض اليوم الوطني حالياً</p>
                                        <Link href={route('admin.landing-page.national-day-offer.create')}>
                                            <PrimaryButton>إضافة سكشن عرض اليوم الوطني</PrimaryButton>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-semibold text-lg">{nationalDayOffer.title_ar}</h4>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    nationalDayOffer.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {nationalDayOffer.is_active ? 'نشط' : 'غير نشط'}
                                                </span>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4">{nationalDayOffer.description_ar}</p>
                                            
                                            <div className="flex gap-2 mb-4">
                                                <span className="text-sm text-gray-500">الزر:</span>
                                                <span className="text-sm font-medium">{nationalDayOffer.button_text_ar}</span>
                                                <span className="text-sm text-gray-500">الرابط:</span>
                                                <span className="text-sm font-medium">{nationalDayOffer.button_url}</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="bg-blue-50 p-3 rounded">
                                                    <h5 className="font-medium text-sm mb-2">العرض الأول</h5>
                                                    <p className="text-sm text-gray-600">{nationalDayOffer.offer1_title}</p>
                                                    <p className="text-sm text-gray-600">خصم: {nationalDayOffer.offer1_discount_percentage}%</p>
                                                    <p className="text-sm text-gray-600">الفئة: {nationalDayOffer.offer1_category_name}</p>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded">
                                                    <h5 className="font-medium text-sm mb-2">العرض الثاني</h5>
                                                    <p className="text-sm text-gray-600">{nationalDayOffer.offer2_title}</p>
                                                    <p className="text-sm text-gray-600">خصم: {nationalDayOffer.offer2_discount_percentage}%</p>
                                                    <p className="text-sm text-gray-600">الفئة: {nationalDayOffer.offer2_category_name}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('admin.landing-page.national-day-offer.edit', nationalDayOffer.id)}
                                                    className="flex-1 text-center py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                >
                                                    تعديل
                                                </Link>
                                                <button
                                                    onClick={() => toggleNationalDayOfferStatus(nationalDayOffer)}
                                                    className={`flex-1 py-2 px-3 rounded text-sm ${
                                                        nationalDayOffer.is_active
                                                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                        : 'bg-green-500 text-white hover:bg-green-600'
                                                    }`}
                                                >
                                                    {nationalDayOffer.is_active ? 'غير نشط' : 'نشط'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteNationalDayOffer(nationalDayOffer.id)}
                                                    className="flex-1 py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Preparing For Summer Section */}
                            <div className="mt-8">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold">سكشن الاستعداد للصيف</h3>
                                </div>

                                {!preparingForSummer ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-4">لا يوجد سكشن للصيف حالياً</p>
                                        <Link href={route('admin.landing-page.preparing-for-summer.create')}>
                                            <PrimaryButton>إضافة سكشن الصيف</PrimaryButton>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-semibold text-lg">{preparingForSummer.title_ar}</h4>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    preparingForSummer.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {preparingForSummer.is_active ? 'نشط' : 'غير نشط'}
                                                </span>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4">{preparingForSummer.description_ar}</p>
                                            
                                            <div className="flex gap-2 mb-4">
                                                <span className="text-sm text-gray-500">الزر:</span>
                                                <span className="text-sm font-medium">{preparingForSummer.button_text_ar}</span>
                                                <span className="text-sm text-gray-500">الرابط:</span>
                                                <span className="text-sm font-medium">{preparingForSummer.button_url}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('admin.landing-page.preparing-for-summer.edit', preparingForSummer.id)}
                                                    className="flex-1 text-center py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                >
                                                    تعديل
                                                </Link>
                                                <button
                                                    onClick={() => togglePreparingForSummerStatus(preparingForSummer)}
                                                    className={`flex-1 py-2 px-3 rounded text-sm ${
                                                        preparingForSummer.is_active
                                                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                        : 'bg-green-500 text-white hover:bg-green-600'
                                                    }`}
                                                >
                                                    {preparingForSummer.is_active ? 'غير نشط' : 'نشط'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePreparingForSummer(preparingForSummer.id)}
                                                    className="flex-1 py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LandingPageIndex;
