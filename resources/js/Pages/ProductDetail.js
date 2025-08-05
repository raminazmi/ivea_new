import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
const ProductDetail = ({ product, relatedProducts }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.finalPrice,
            quantity: 1,
            image: product.image,
        }));
    };
    return (_jsxs(AppLayout, { children: [_jsxs("div", { className: "bg-white min-h-screen", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6", children: _jsx(Breadcrumb, { items: [
                                { name: 'الرئيسية', href: '/' },
                                { name: product.category?.name || 'المنتجات', href: '/products' },
                                { name: product.name }
                            ] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12", children: [_jsxs("div", { className: "space-y-4 col-span-1", children: [_jsx("div", { className: "text-xs md:text-sm text-gray-500 mb-3 md:mb-4", children: "\u0642\u062F \u064A\u062E\u062A\u0644\u0641 \u0627\u0644\u0645\u0646\u062A\u062C \u0627\u0644\u0641\u0639\u0644\u064A \u0642\u0644\u064A\u0644\u0627\u064B \u0639\u0646 \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629" }), _jsx(ImageGallery, { images: product.images, productName: product.name, selectedImage: selectedImage, onImageSelect: setSelectedImage })] }), _jsxs("div", { className: "space-y-4 md:space-y-6 col-span-2", children: [_jsx(StockStatus, { inStock: product.inStock }), _jsx(ProductInfo, { label: "\u0631\u0645\u0632 \u0627\u0644\u0639\u0646\u0635\u0631", value: product.sku }), _jsx("h1", { className: "text-xl md:text-2xl font-bold text-gray-900 leading-tight", children: product.name }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(PriceDisplay, { price: product.price, finalPrice: product.finalPrice, hasDiscount: product.hasDiscount }), product.hasDiscount && (_jsx(DiscountBadge, { discount: product.discount }))] }), _jsx("div", { className: "text-sm md:text-base text-gray-600 leading-relaxed", children: product.description }), product.colors && product.colors.length > 0 && (_jsx(ColorSelector, { colors: product.colors, colorNames: product.colorNames, selectedColor: selectedColor, onColorSelect: setSelectedColor })), product.features && product.features.length > 0 && (_jsx(FeatureList, { features: product.features })), _jsx(ActionButtons, { onAddToCart: handleAddToCart, inStock: product.inStock })] })] }), relatedProducts && relatedProducts.length > 0 && (_jsx("div", { className: "mt-12 md:mt-16", children: _jsx(SimilarProducts, { products: relatedProducts }) }))] })] }), _jsx(ContactUs, {})] }));
};
export default ProductDetail;
