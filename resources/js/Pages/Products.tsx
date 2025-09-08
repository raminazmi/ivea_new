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
interface Dimensions {
    width: number;
    height: number;
}

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
    const [currentFilters, setCurrentFilters] = useState({
        ...filters,
        sort: filters.sort || 'created_at'
    });
    const [activeTab, setActiveTab] = useState(() => {
        if (filters.tab) {
            return filters.tab;
        } else if (filters.main_category) {
            return filters.main_category;
        }
        return 'all';
    });
    const [activeSubTab, setActiveSubTab] = useState(() => {
        if (filters.category) {
            return filters.category;
        }
        return '';
    });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (filters.category) {
            setCurrentFilters((prevFilters: any) => ({
                ...prevFilters,
                category: filters.category
            }));
            setActiveSubTab(filters.category);
        }

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
                width:  1,
                height:  1
            };
        }
        return { width: 1, height: 1 };
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
        const updatedFilters = {
            ...currentFilters,
            page,
            sort: currentFilters.sort || 'created_at'
        };
        router.get('/products', updatedFilters, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleFilterChange = (newFilters: any) => {
        setLoading(true);
        const updatedFilters = {
            ...newFilters,
            sort: newFilters.sort || 'created_at'
        };
        setCurrentFilters(updatedFilters);
        setCurrentPage(1);
        router.get('/products', { ...updatedFilters, page: 1 }, {
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
        setCurrentFilters({ sort: 'created_at' });
        setCurrentPage(1);
        setActiveTab('all');
        router.get('/products', { page: 1, sort: 'created_at' }, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleTabChange = (tab: string) => {
        setLoading(true);
        setActiveTab(tab);
        setActiveSubTab(''); 
        let newFilters;
        if (tab === 'all') {
            newFilters = { page: 1 };
        } else {
            const mainCategory = categories.find(cat => cat.slug === tab && !cat.parent_id);
            if (mainCategory) {
                const subcategoryIds = categories
                    .filter(cat => cat.parent_id === mainCategory.id)
                    .map(cat => cat.id);

                newFilters = {
                    main_category: tab,
                    subcategory_ids: subcategoryIds,
                    page: 1
                };
            } else {
                newFilters = { ...currentFilters, tab, page: 1 };
            }
        }

        const updatedFilters = {
            ...newFilters,
            sort: currentFilters.sort || 'created_at'
        };
        setCurrentFilters(updatedFilters);
        setCurrentPage(1);
        router.get('/products', updatedFilters, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    const handleSubTabChange = (subTab: string) => {
        setLoading(true);
        setActiveSubTab(subTab);

        let newFilters;
        if (subTab === '') {
            const mainCategory = categories.find(cat => cat.slug === activeTab && !cat.parent_id);
            if (mainCategory) {
                const subcategoryIds = categories
                    .filter(cat => cat.parent_id === mainCategory.id)
                    .map(cat => cat.id);

                newFilters = {
                    main_category: activeTab,
                    subcategory_ids: subcategoryIds,
                    page: 1
                };
            } else {
                newFilters = { ...currentFilters, page: 1 };
            }
        } else {
            newFilters = {
                ...currentFilters,
                category: subTab,
                page: 1
            };
        }

        const updatedFilters = {
            ...newFilters,
            sort: currentFilters.sort || 'created_at'
        };
        setCurrentFilters(updatedFilters);
        setCurrentPage(1);
        router.get('/products', updatedFilters, {
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
                    instagram: 'https://www.instagram.com/ivea.sa',
                    snapchat: 'https://www.snapchat.com/add/ivea_sa?share_id=ws9Bef6xzOc&locale=ar-AE',
                    tiktok: 'https://www.tiktok.com/@ivea_sa',
                }}
            />
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <section className="py-8 md:py-12 lg:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                            <div className="lg:w-1/4 space-y-6 md:mt-[120px]">
                                <DimensionFilter
                                    onDimensionChange={handleDimensionChange}
                                    defaultWidth={globalDimensions.width}
                                    defaultHeight={globalDimensions.height}
                                    minWidth={1}
                                    maxWidth={20}
                                    minHeight={1}
                                    maxHeight={20}
                                />
                                {/* <ProductFilters
                                    onFilterChange={handleFilterChange}
                                    activeTab={activeTab}
                                    categories={categories}
                                    filterOptions={filterOptions}
                                    currentFilters={currentFilters}
                                /> */}
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

                                <div className="space-y-4 mb-10 relative px-2">
                                    <div className="relative">
                                        <div className="flex justify-center">
                                            <div className="bg-primary-gray py-1.5 px-2 rounded-xl md:rounded-full flex flex-wrap justify-center gap-1 shadow-sm border border-gray-100 max-w-full overflow-x-auto">
                                                {tabs.map((tab) => (
                                                    <button
                                                        key={tab.id}
                                                        onClick={() => handleTabChange(tab.id)}
                                                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative overflow-hidden group hover:scale-102 whitespace-nowrap ${activeTab === tab.id
                                                            ? 'bg-primary-black text-white shadow-md'
                                                            : 'text-gray-700 hover:bg-primary-gray hover:text-gray-800'
                                                            }`}
                                                    >
                                                        <span className="relative z-10">{tab.label}</span>
                                                        {activeTab === tab.id && (
                                                            <div className="absolute inset-0 bg-primary-yellow opacity-10 rounded-full"></div>
                                                        )}
                                                        <div className={`absolute inset-0 bg-primary-yellow opacity-0 group-hover:opacity-5 transition-opacity duration-200 rounded-full ${activeTab === tab.id ? 'hidden' : ''}`}></div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {activeTab !== 'all' && (() => {
                                        const mainCategory = categories.find(cat => cat.slug === activeTab && !cat.parent_id);
                                        if (!mainCategory) return null;

                                        const subcategories = categories.filter(cat => cat.parent_id === mainCategory.id);
                                        if (subcategories.length === 0) return null;

                                        const subTabs = [
                                            { id: '', label: `الكل`, count: 0 },
                                            ...subcategories.map(subCat => ({
                                                id: subCat.slug,
                                                label: subCat.name,
                                                count: subCat.products_count || 0
                                            }))
                                        ];

                                        return (
                                            <div className="relative">
                                                <div className="flex justify-center">
                                                    <div className="bg-white border border-gray-100 py-1.5 px-2 rounded-xl md:rounded-full flex flex-wrap justify-center gap-1 shadow-sm max-w-full overflow-x-auto">
                                                        {subTabs.map((subTab) => (
                                                            <button
                                                                key={subTab.id}
                                                                onClick={() => handleSubTabChange(subTab.id)}
                                                                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 relative overflow-hidden group hover:scale-102 whitespace-nowrap ${activeSubTab === subTab.id
                                                                    ? 'bg-primary-yellow text-white shadow-sm'
                                                                    : 'text-gray-600 hover:bg-primary-gray hover:text-gray-700'
                                                                    }`}
                                                            >
                                                                <span className="relative z-10">{subTab.label}</span>
                                                                {activeSubTab === subTab.id && (
                                                                    <div className="absolute inset-0 bg-primary-yellow opacity-10 rounded-full"></div>
                                                                )}
                                                                <div className={`absolute inset-0 bg-primary-yellow opacity-0 group-hover:opacity-5 transition-opacity duration-200 rounded-full ${activeSubTab === subTab.id ? 'hidden' : ''}`}></div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-transparent via-primary-yellow to-transparent"></div>
                                            </div>
                                        );
                                    })()}
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