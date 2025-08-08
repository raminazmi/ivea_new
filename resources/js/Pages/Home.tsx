import React from 'react';
import Hero from '@/Components/LandingPage/Hero';
import FeaturedOffers from '@/Components/LandingPage/FeaturedOffers';
import PreparingForSummer from '@/Components/LandingPage/PreparingForSummer';
import CategoryShowcase from '@/Components/LandingPage/CategoryShowcase';
import ProjectShowcase from '@/Components/LandingPage/ProjectShowcase';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import { PageProps } from '@inertiajs/core';
import ContactUs from '@/Components/LandingPage/ContactUs';
import SectionTitle from '@/Components/SectionTitle';

interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
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
    products_count?: number;
}

interface HomeProps extends PageProps {
    featuredProducts: Product[];
    categories: Category[];
}

const Home: React.FC<HomeProps> = ({ featuredProducts, categories }) => {
    return (
        <AppLayout>
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <Hero />
            </div>
            <FeaturedOffers />
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <PreparingForSummer />
            </div>
            <CategoryShowcase featuredProducts={featuredProducts} />
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <SectionTitle text="قائمة المشاريع" />
                <ProjectShowcase />
                <ContactUs />
            </div>
        </AppLayout>
    );
};

export default Home;