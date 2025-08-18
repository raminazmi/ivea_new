import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import ProductCard from '@/Components/Products/ProductCard';
import ProductCardSkeleton from '@/Components/Products/ProductCardSkeleton';
import ProductFilters from '@/Components/Products/ProductFilters';
import ProductPagination from '@/Components/Products/ProductPagination';
import ActiveFilters from '@/Components/Products/ActiveFilters';
import DimensionFilter from '@/Components/Products/DimensionFilter';
import ContactUs from '@/Components/LandingPage/ContactUs';
import { Dimensions } from '@/Utils/priceCalculator';

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
    pricesFrom?: number;
    priceRange?: {
        min: number;
        max: number;
    };
    pricingMethod?: 'fixed' | 'area_based' | 'size_based' | 'custom';
}

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
    products_count?: number;
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
    const [activeTab, setActiveTab] = useState(() => {
        // Set initial active tab based on filters
        if (filters.tab) {
            return filters.tab;
        } else if (filters.main_category) {
            return filters.main_category;
        }
        return 'all';
    });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (filters.category) {
            setCurrentFilters((prevFilters: any) => ({
                ...prevFilters,
                category: filters.category
            }));
        }

        // Update active tab based on filters
        if (filters.tab) {
            setActiveTab(filters.tab);
        } else if (filters.main_category) {
            setActiveTab(filters.main_category);
        } else {
            setActiveTab('all');
        }
    }, [filters.category, filters.tab, filters.main_category]);

    const getDefaultDimensions = (): Dimensions => {
        if (products.data.length > 0) {
            const firstProduct = products.data[0];
            return {
                width: firstProduct.default_width || 100,
                height: firstProduct.default_height || 100
            };
        }
        return { width: 100, height: 100 };
    };
    const getDimensionLimits = () => {
        if (products.data.length > 0) {
            const allProducts = products.data;
            const minWidths = allProducts.map(p => (p as any).min_width).filter(Boolean);
            const maxWidths = allProducts.map(p => (p as any).max_width).filter(Boolean);
            const minHeights = allProducts.map(p => (p as any).min_height).filter(Boolean);
            const maxHeights = allProducts.map(p => (p as any).max_height).filter(Boolean);

            return {
                minWidth: minWidths.length > 0 ? Math.min(...minWidths) : 50,
                maxWidth: maxWidths.length > 0 ? Math.max(...maxWidths) : 500,
                minHeight: minHeights.length > 0 ? Math.min(...minHeights) : 50,
                maxHeight: maxHeights.length > 0 ? Math.max(...maxHeights) : 400,
            };
        }
        return { minWidth: 50, maxWidth: 500, minHeight: 50, maxHeight: 400 };
    };

    const [globalDimensions, setGlobalDimensions] = useState<Dimensions>(getDefaultDimensions());
    const [dynamicPrices, setDynamicPrices] = useState<Record<number, number>>({});

    const dimensionLimits = getDimensionLimits();

    // Create tabs from main categories
    const mainCategories = categories.filter(cat => !cat.parent_id);
    const tabs = [
        { id: 'all', label: 'الكل' },
        ...mainCategories.map(category => ({
            id: category.slug,
            label: category.name,
            count: categories.filter(sub => sub.parent_id === category.id).reduce((total, sub) => total + (sub.products_count || 0), 0)
        }))
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
            if (Array.isArray(newFilters[filterType])) {
                newFilters[filterType] = newFilters[filterType].filter((v: string) => v !== value);
                if (newFilters[filterType].length === 0) {
                    delete newFilters[filterType];
                }
            }
        } else {
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
        // Clear all filters and return to main products page
        setCurrentFilters({});
        setCurrentPage(1);
        setActiveTab('all');
        router.get('/products', { page: 1 }, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleTabChange = (tab: string) => {
        setLoading(true);
        setActiveTab(tab);

        // If it's a main category tab, filter by that main category and its subcategories
        let newFilters;
        if (tab === 'all') {
            newFilters = { page: 1 };
        } else {
            // Check if tab is a main category slug
            const mainCategory = categories.find(cat => cat.slug === tab && !cat.parent_id);
            if (mainCategory) {
                // Get all subcategory IDs for this main category
                const subcategoryIds = categories
                    .filter(cat => cat.parent_id === mainCategory.id)
                    .map(cat => cat.id);

                newFilters = {
                    main_category: tab,
                    subcategory_ids: subcategoryIds,
                    page: 1
                };
            } else {
                // Fallback to old tab system
                newFilters = { ...currentFilters, tab, page: 1 };
            }
        }

        setCurrentFilters(newFilters);
        setCurrentPage(1);
        router.get('/products', newFilters, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleDimensionChange = (dimensions: Dimensions) => {
        setGlobalDimensions(dimensions);
    };

    const handleProductPriceChange = (productId: number, price: number) => {
        setDynamicPrices(prev => ({
            ...prev,
            [productId]: price
        }));
    };

    const getSelectedCategoryName = () => {
        if (currentFilters.category) {
            const selectedCategory = categories.find(cat => cat.slug === currentFilters.category);
            return selectedCategory ? selectedCategory.name : 'المنتجات';
        }
        return 'المنتجات';
    };

    const availableProducts = products.data.filter(product => product.in_stock !== false);
    const outOfStockProducts = products.data.filter(product => product.in_stock === false);

    return (
        <AppLayout>
            <Head title="المنتجات" />

            <CoverSection
                imageUrl="/images/products_cover.png"
                title={`تصفح ${getSelectedCategoryName()}`}
                subtitle={currentFilters.category ? `اكتشف مجموعة ${getSelectedCategoryName()}` : "اكتشف مجموعتنا المتنوعة من المنتجات"}
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
                            <div className="lg:w-1/4 space-y-6">
                                <DimensionFilter
                                    onDimensionChange={handleDimensionChange}
                                    defaultWidth={globalDimensions.width}
                                    defaultHeight={globalDimensions.height}
                                    minWidth={dimensionLimits.minWidth}
                                    maxWidth={dimensionLimits.maxWidth}
                                    minHeight={dimensionLimits.minHeight}
                                    maxHeight={dimensionLimits.maxHeight}
                                />
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

                                <div className="flex justify-center mb-8">
                                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => handleTabChange(tab.id)}
                                                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-700 hover:duration-1000 flex items-center gap-2 ${activeTab === tab.id
                                                    ? 'bg-primary-yellow text-white shadow-lg'
                                                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                                                    }`}
                                            >
                                                <span>{tab.label}</span>
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
                                            <ProductCard
                                                key={`${product.id}-${globalDimensions.width}-${globalDimensions.height}`}
                                                product={product}
                                                dimensions={globalDimensions}
                                                onDimensionChange={handleProductPriceChange}
                                            />
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