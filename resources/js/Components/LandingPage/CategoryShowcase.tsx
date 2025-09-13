import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle';
import ProductCard from '../Products/ProductCard';
import ProductCardSkeleton from '../Products/ProductCardSkeleton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
    products_count?: number;
}

interface CategoryShowcaseProps {
    featuredProducts: Product[];
    categories?: Category[];
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ featuredProducts, categories = [] }) => {
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
                        setProducts([]);
                    }
                } catch (error) {
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, [activeTab, featuredProducts]);

    useEffect(() => {
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="min-h-screen py-6 md:py-10 lg:py-16 px-4 lg:px-24 relative"
        >
            <div className="absolute inset-0 -z-10">
                <img
                    src="/images/bgCategory.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container mx-auto relative z-10">
                <SectionTitle text="منتجاتنا المميزة" />

                <div className="flex justify-center mb-6 md:mb-8">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-700 hover:duration-1000 ${activeTab === tab.id
                                    ? 'bg-primary-yellow text-white shadow-lg'
                                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500 text-xs md:text-sm">لا توجد منتجات متاحة</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryShowcase;