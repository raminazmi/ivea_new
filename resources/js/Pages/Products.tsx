import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import ProductCard from '@/Components/Products/ProductCard';
import ProductCardSkeleton from '@/Components/Products/ProductCardSkeleton';
import ProductFilters from '@/Components/Products/ProductFilters';
import ProductPagination from '@/Components/Products/ProductPagination';
import ActiveFilters from '@/Components/Products/ActiveFilters';
import ContactUs from '@/Components/LandingPage/ContactUs';

interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    discount?: number;
    image: string;
    rating: number;
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
    tab?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductsProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    categories: Category[];
    filters: any;
    filterOptions: any;
}

const Products: React.FC<ProductsProps> = ({ products, categories, filters, filterOptions }) => {
    const [currentPage, setCurrentPage] = useState(products.current_page);
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [activeTab, setActiveTab] = useState(filters.tab || 'all');
    const [loading, setLoading] = useState(false);

    const tabs = [
        { id: 'all', label: 'الكل' },
        { id: 'new', label: 'جديد' },
        { id: 'offers', label: 'عروض' },
        { id: 'bestsellers', label: 'الأكثر مبيعاً' },
    ];

    const handlePageChange = (page: number) => {
        setLoading(true);
        setCurrentPage(page);
        router.get('/products', { ...currentFilters, page }, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleFilterChange = (newFilters: any) => {
        setLoading(true);
        setCurrentFilters(newFilters);
        setCurrentPage(1);
        router.get('/products', { ...newFilters, page: 1 }, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleRemoveFilter = (filterType: string, value?: string) => {
        setLoading(true);
        const newFilters = { ...currentFilters };

        if (value) {
            // Remove specific value from array filters
            if (Array.isArray(newFilters[filterType])) {
                newFilters[filterType] = newFilters[filterType].filter((v: string) => v !== value);
                if (newFilters[filterType].length === 0) {
                    delete newFilters[filterType];
                }
            }
        } else {
            // Remove entire filter
            delete newFilters[filterType];
        }

        setCurrentFilters(newFilters);
        setCurrentPage(1);
        router.get('/products', { ...newFilters, page: 1 }, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleClearAllFilters = () => {
        setLoading(true);
        setCurrentFilters({});
        setCurrentPage(1);
        router.get('/products', { page: 1 }, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleTabChange = (tab: string) => {
        setLoading(true);
        setActiveTab(tab);
        const newFilters = { ...currentFilters, tab, page: 1 };
        setCurrentFilters(newFilters);
        setCurrentPage(1);
        router.get('/products', newFilters, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    // حساب عدد المنتجات المتاحة
    const availableProducts = products.data.filter(product => product.in_stock !== false);
    const outOfStockProducts = products.data.filter(product => product.in_stock === false);

    return (
        <AppLayout>
            <Head title="المنتجات" />

            <CoverSection
                imageUrl="/images/products_cover.png"
                title="تصفح المنتجات"
                subtitle="اكتشف مجموعتنا المتنوعة من المنتجات"
                description="ستائر، أثاث، وأكثر من ذلك"
                socialLinks={{
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                }}
            />
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <section className="py-8 md:py-12 lg:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                            <div className="lg:w-1/4">
                                <ProductFilters
                                    onFilterChange={handleFilterChange}
                                    activeTab={activeTab}
                                    categories={categories}
                                    filterOptions={filterOptions}
                                    currentFilters={currentFilters}
                                />
                            </div>

                            <div className="lg:w-3/4">
                                <ActiveFilters
                                    filters={currentFilters}
                                    onRemoveFilter={handleRemoveFilter}
                                    onClearAll={handleClearAllFilters}
                                />

                                <div className="flex justify-between items-center mb-6 md:mb-8">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                            المنتجات ({products.total})
                                        </h2>
                                        {outOfStockProducts.length > 0 && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {availableProducts.length} متاح، {outOfStockProducts.length} نفذت
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <select
                                            className="border border-gray-300 rounded-lg px-2.5 md:px-3 py-2 md:py-2.5 focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                            onChange={(e) => handleFilterChange({ ...currentFilters, sort: e.target.value })}
                                            value={currentFilters.sort || 'created_at'}
                                            title="ترتيب المنتجات"
                                        >
                                            <option value="created_at">الأحدث</option>
                                            <option value="price">السعر: من الأقل للأعلى</option>
                                            <option value="price_desc">السعر: من الأعلى للأقل</option>
                                            <option value="name">الاسم: أ-ي</option>
                                            <option value="name_desc">الاسم: ي-أ</option>
                                            <option value="featured">المميزة أولاً</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex justify-center mb-8">
                                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => handleTabChange(tab.id)}
                                                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-700 hover:duration-1000 ${activeTab === tab.id
                                                    ? 'bg-primary-yellow text-white shadow-lg'
                                                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                                        {[...Array(6)].map((_, i) => (
                                            <ProductCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : products.data.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                                        {products.data.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 md:py-16">
                                        <div className="text-gray-500">
                                            <svg className="mx-auto h-12 w-12 md:h-16 md:w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
                                            <p className="text-sm md:text-base text-gray-500">جرب تغيير الفلاتر أو البحث عن منتجات أخرى</p>
                                        </div>
                                    </div>
                                )}

                                {products.data.length > 0 && (
                                    <div className="mt-8 md:mt-12">
                                        <ProductPagination
                                            currentPage={currentPage}
                                            totalPages={products.last_page}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                    <ContactUs />
                </div>
            </div>
        </AppLayout>
    );
};

export default Products;