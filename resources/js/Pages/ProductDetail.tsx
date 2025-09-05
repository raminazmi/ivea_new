import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '@inertiajs/react';
import { HiChevronLeft, HiShoppingCart, HiCog } from 'react-icons/hi';
import { addToCart } from '@/store/features/cartSlice';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import FeatureList from '@/Components/Common/FeatureList';
import ProductInfo from '@/Components/Common/ProductInfo';
import PriceDisplay from '@/Components/Common/PriceDisplay';
import ActionButtons from '@/Components/Common/ActionButtons';
import ImageGallery from '@/Components/Common/ImageGallery';
import SimilarProducts from '@/Components/Common/SimilarProducts';
import StockStatus from '@/Components/Common/StockStatus';
import DiscountBadge from '@/Components/Common/DiscountBadge';
import DimensionPriceCalculator from '@/Components/Products/DimensionPriceCalculator';
import QuickOrderModal from '@/Components/Common/QuickOrderModal';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactUs from '@/Components/LandingPage/ContactUs';

interface ProductDetailProps {
    product: {
        id: number;
        name: string;
        price: number;
        finalPrice: number;
        description: string;
        category: {
            id: number;
            name: string;
            slug: string;
        };
        brand: string;
        collection: string;
        sku: string;
        discount?: number;
        stock: number;
        inStock: boolean;
        hasDiscount: boolean;
        colors: string[];
        colorNames: string[];
        specifications: any;
        image: string;
        images: string[];
        features: string[];
        rating: number;
        weight?: number;
        dimensions?: any;
        pricesFrom?: number;
        priceRange?: {
            min: number;
            max: number;
        };
        pricingMethod?: 'fixed' | 'area_based' | 'size_based' | 'custom';
        basePrice?: number;
        pricePer_sqm?: number;
        minPrice?: number;
        maxPrice?: number;
        priceModifiers?: any;
        defaultWidth?: number;
        defaultHeight?: number;
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
    };
    relatedProducts: any[];
}

const ProductDetail: React.FC<ProductDetailProps> = React.memo(({ product, relatedProducts }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [showQuickOrderModal, setShowQuickOrderModal] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(product.finalPrice);
    const [selectedDimensions, setSelectedDimensions] = useState({
        width: product.defaultWidth || 150,
        height: product.defaultHeight || 200
    });
    const dispatch = useDispatch();

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: currentPrice,
            image: product.image,
            color: product.colors?.[selectedColor],
            colorName: product.colorNames?.[selectedColor],
            width: selectedDimensions.width,
            height: selectedDimensions.height,
            measurementUnit: 'cm',
            quantity: 1
        }));
    }, [dispatch, product.id, product.name, product.image, product.colors, product.colorNames, selectedColor, currentPrice, selectedDimensions]);

    const handleQuickOrder = useCallback(() => {
        setShowQuickOrderModal(true);
    }, []);

    const handlePriceChange = useCallback((price: number) => {
        setCurrentPrice(price);
    }, []);

    const handleDimensionsChange = useCallback((width: number, height: number) => {
        setSelectedDimensions({ width, height });
    }, []);

    const handleImageSelect = useCallback((index: number) => {
        setSelectedImage(index);
    }, []);

    return (
        <AppLayout>
            <div className="bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
                    <Breadcrumb
                        items={[
                            { name: 'الرئيسية', href: '/' },
                            { name: product.category?.name || 'المنتجات', href: '/products' },
                            { name: product.name }
                        ]}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        <div className="col-span-1">
                            <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                                قد يختلف المنتج الفعلي قليلاً عن الصور المعروضة
                            </div>

                            <ImageGallery
                                images={product.images}
                                productName={product.name}
                                selectedImage={selectedImage}
                                onImageSelect={handleImageSelect}
                            />
                        </div>

                        <div className="space-y-4 md:space-y-6 col-span-2">
                            <StockStatus inStock={product.inStock} />
                            <ProductInfo
                                label="رمز العنصر"
                                value={product.sku}
                            />

                            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4">
                                <PriceDisplay
                                    price={product.price}
                                    finalPrice={product.finalPrice}
                                    hasDiscount={product.hasDiscount}
                                />
                                {product.hasDiscount && (
                                    <DiscountBadge discount={product.discount!} />
                                )}
                            </div>

                            <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                                {product.description}
                            </div>

                            {product.features && product.features.length > 0 && (
                                <FeatureList features={product.features} />
                            )}
                            
                            {product.colors && product.colors.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between px-3">
                                        <div className="">
                                        <h3 className="mb-2 text-base md:text-lg font-semibold text-gray-900">
                                            الألوان المتوفرة
                                        </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        {product.colors.map((color, index) => (
                                            <div
                                                key={index}
                                                className="relative group"
                                                title={product.colorNames?.[index] || `اللون ${index + 1}`}
                                            >
                                                                                                 <div
                                                     className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
                                                     style={{ backgroundColor: color }}
                                                 />
                                                <span className="block text-xs text-gray-600 mt-1 text-center">
                                                    {product.colorNames?.[index] || `اللون ${index + 1}`}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                        </div>
                                    <Link
                                        href={`/products/${product.id}/options`}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                                    >
                                        <HiCog className="w-4 h-4" />
                                            <span>خيارات المنتج</span>
                                    </Link>
                                    </div>
                                </div>
                            )}

                            {product.pricingMethod && product.pricingMethod !== 'fixed' && (
                                <DimensionPriceCalculator
                                    productId={product.id}
                                    defaultWidth={product.defaultWidth || 150}
                                    defaultHeight={product.defaultHeight || 200}
                                    minWidth={product.minWidth}
                                    maxWidth={product.maxWidth || 500}
                                    minHeight={product.minHeight || 50}
                                    maxHeight={product.maxHeight || 400}
                                    discount={product.discount}
                                    basePrice={product.basePrice || product.price}
                                                                         unit="سم"
                                    onPriceChange={handlePriceChange}
                                    onDimensionsChange={handleDimensionsChange}
                                />
                            )}

                            <ActionButtons
                                onAddToCart={handleAddToCart}
                                onQuickOrder={handleQuickOrder}
                                inStock={product.inStock}
                            />
                        </div>
                    </div>

                    {relatedProducts && relatedProducts.length > 0 && (
                        <div className="mt-12 md:mt-16">
                            <SimilarProducts products={relatedProducts} />
                        </div>
                    )}
                </div>
            </div>
            <ContactUs />

            <QuickOrderModal
                isOpen={showQuickOrderModal}
                onClose={() => setShowQuickOrderModal(false)}
                product={{
                    id: product.id,
                    name: product.name,
                    price: currentPrice,
                    image: product.image
                }}
                selectedOptions={{
                    color: product.colors?.[selectedColor],
                    colorName: product.colorNames?.[selectedColor],
                    width: selectedDimensions.width,
                    height: selectedDimensions.height,
                    measurementUnit: 'سم'
                }}
            />
        </AppLayout>
    );
});

ProductDetail.displayName = 'ProductDetail';

export default ProductDetail;