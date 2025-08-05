import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle';
import ProductCard from '../Products/ProductCard';
import ProductCardSkeleton from '../Products/ProductCardSkeleton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    discount?: number;
    image: string;
    rating: number;
    tab?: string;
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

interface CategoryShowcaseProps {
    featuredProducts: Product[];
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ featuredProducts }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const tabs = [
        { id: 'all', label: 'الكل' },
        { id: 'new', label: 'جديد' },
        { id: 'offers', label: 'عروض' },
        { id: 'bestsellers', label: 'الأكثر مبيعاً' },
    ];

    // Use featured products when tab is 'all', otherwise fetch from API
    useEffect(() => {
        if (activeTab === 'all') {
            setProducts(featuredProducts);
            setLoading(false);
        } else {
            const fetchProducts = async () => {
                try {
                    setLoading(true);
                    let url = '';

                    switch (activeTab) {
                        case 'new':
                            url = '/api/products/new';
                            break;
                        case 'offers':
                            url = '/api/products/offers';
                            break;
                        case 'bestsellers':
                            url = '/api/products/bestsellers';
                            break;
                        default:
                            url = '/api/products';
                            break;
                    }

                    const response = await fetch(url);
                    if (response.ok) {
                        const data = await response.json();
                        setProducts(Array.isArray(data) ? data : data.data || []);
                    } else {
                        console.error('Error fetching products:', response.status);
                        setProducts([]);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, [activeTab, featuredProducts]);

    // GSAP animations
    useEffect(() => {
        // Section animation
        if (sectionRef.current) {
            gsap.fromTo(sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="min-h-screen py-8 md:py-16 px-4 relative"
        >
            <div className="absolute inset-0 -z-10">
                <img
                    src="/images/bgCategory.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionTitle text="منتجاتنا المميزة" />

                {/* Tabs */}
                <div className="flex justify-center mb-8 md:mb-12">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-700 hover:duration-1000 ${activeTab === tab.id
                                    ? 'bg-primary-yellow text-white shadow-lg'
                                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {loading ? (
                        // Show skeleton loading
                        Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    ) : products.length > 0 ? (
                        // Show actual products
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        // Show empty state
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">لا توجد منتجات متاحة</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryShowcase;