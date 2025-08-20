import React from 'react';
import Hero from '@/Components/LandingPage/Hero';
import FeaturedOffers from '@/Components/LandingPage/FeaturedOffers';
import PreparingForSummer from '@/Components/LandingPage/PreparingForSummer';
import CategoryShowcase from '@/Components/LandingPage/CategoryShowcase';
import ProjectShowcase from '@/Components/LandingPage/ProjectShowcase';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import PartnersCarousel from '@/Components/LandingPage/PartnersCarousel';
import { PageProps } from '@inertiajs/core';
import ContactUs from '@/Components/LandingPage/ContactUs';
import SectionTitle from '@/Components/SectionTitle';
import { useSEO } from '@/hooks/useSEO';
import { Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    base_price: number;
    price_per_sqm?: number;
    pricing_method?: 'fixed' | 'per_sqm' | 'tiered';
    min_price?: number;
    max_price?: number;
    default_width?: number;
    default_height?: number;
    discount?: number;
    image: string;
    rating: number;
    tab: string;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    final_price?: number;
    discount_amount?: number;
    in_stock?: boolean;
    has_discount?: boolean;
    colors?: string[];
    color_names?: string[];
    description?: string;
    collection?: string;
    sku?: string;
    stock?: number;
    featured?: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
    products_count?: number;
}

interface Article {
    id: number;
    title: string;
    category: string;
    image: string;
    date: string;
    read_time: number;
    slug: string;
}

interface HomeProps extends PageProps {
    featuredProducts: Product[];
    categories: Category[];
    latestArticles?: Article[];
}

const Home: React.FC<HomeProps> = ({ featuredProducts, categories, latestArticles = [] }) => {
    useSEO();

    return (
        <AppLayout>
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <Hero categories={categories} />
            </div>
            <FeaturedOffers />
            <PreparingForSummer />
            <CategoryShowcase featuredProducts={featuredProducts} categories={categories} />
            <div className="container mx-auto px-2 sm:px-4 lg:px-8 xl:px-24">
                <SectionTitle text="قائمة المشاريع" />
                <ProjectShowcase />
            </div>
            
            {latestArticles && latestArticles.length > 0 && (
                <section className="py-12 md:py-16 lg:py-20 mx-0 sm:px-4 lg:px-8 xl:px-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-6 md:mb-8">
                            <SectionTitle
                                text="أدوات وإرشادات"
                                size="3xl"
                                align="center"
                            />
                            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                                اكتشف أحدث الأدوات والإرشادات المفيدة لمساعدتك في اختيار أفضل المنتجات وتصميم منزلك
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {latestArticles.slice(0, 6).map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/tools-and-guidelines?article=${article.id}`}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
                                >
                                    <div className="relative">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>{article.date}</span>
                                            <span>{article.read_time} دقائق قراءة</span>
                                        </div>
                                        <div className="text-start">
                                            <span className="inline-flex items-center text-primary-yellow hover:text-yellow-600 font-medium transition-colors">
                                                اقرأ المزيد
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                href="/tools-and-guidelines"
                                className="bg-primary-yellow text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors duration-300"
                            >
                                عرض جميع الأدوات
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <div className="container mx-auto px-2 sm:px-4 lg:px-8 xl:px-20">
                <ContactUs />
            </div>
        </AppLayout>
    );
};

export default Home;