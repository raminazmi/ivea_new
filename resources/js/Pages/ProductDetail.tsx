import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/features/cartSlice';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import FeatureList from '@/Components/Common/FeatureList';
import ColorSelector from '@/Components/Common/ColorSelector';
import ProductInfo from '@/Components/Common/ProductInfo';
import PriceDisplay from '@/Components/Common/PriceDisplay';
import ActionButtons from '@/Components/Common/ActionButtons';
import ImageGallery from '@/Components/Common/ImageGallery';
import SimilarProducts from '@/Components/Common/SimilarProducts';
import StockStatus from '@/Components/Common/StockStatus';
import DiscountBadge from '@/Components/Common/DiscountBadge';
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
    };
    relatedProducts: any[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.finalPrice,
            image: product.image,
        }));
    };

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
                        <div className="space-y-4 col-span-1">
                            <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                                قد يختلف المنتج الفعلي قليلاً عن الصور المعروضة
                            </div>

                            <ImageGallery
                                images={product.images}
                                productName={product.name}
                                selectedImage={selectedImage}
                                onImageSelect={setSelectedImage}
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

                            {product.colors && product.colors.length > 0 && (
                                <ColorSelector
                                    colors={product.colors}
                                    colorNames={product.colorNames}
                                    selectedColor={selectedColor}
                                    onColorSelect={setSelectedColor}
                                />
                            )}

                            {product.features && product.features.length > 0 && (
                                <FeatureList features={product.features} />
                            )}

                            <ActionButtons
                                onAddToCart={handleAddToCart}
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
        </AppLayout>
    );
};

export default ProductDetail;