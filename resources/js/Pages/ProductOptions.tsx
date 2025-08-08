import React, { useState } from 'react';
import { HiMinus, HiPlus, HiUpload, HiCheck, HiShoppingCart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import ColorSelector from '@/Components/Common/ColorSelector';
import PriceDisplay from '@/Components/Common/PriceDisplay';
import DiscountBadge from '@/Components/Common/DiscountBadge';
import StockStatus from '@/Components/Common/StockStatus';
import ImageGallery from '@/Components/Common/ImageGallery';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactUs from '@/Components/LandingPage/ContactUs';
import { addToCart } from '@/store/features/cartSlice';

interface ProductOptionsProps {
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
        image: string;
        images: string[];
        measurementUnits: Array<{ value: string; label: string }>;
        openingMethods: Array<{ value: string; label: string }>;
        trackTypes: Array<{ value: string; label: string }>;
        liningOptions: Array<{ value: string; label: string }>;
        defaultWidth: number;
        defaultHeight: number;
        fabricReduction: number;
        coverageIncrease: number;
    };
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [measurementUnit, setMeasurementUnit] = useState('انش');
    const [width, setWidth] = useState(product.defaultWidth);
    const [height, setHeight] = useState(product.defaultHeight);
    const [openingMethod, setOpeningMethod] = useState('single');
    const [trackType, setTrackType] = useState('electric');
    const [liningOption, setLiningOption] = useState('with');
    const [inCart, setInCart] = useState(false);
    const [added, setAdded] = useState(false);
    const dispatch = useDispatch();

    const handleQuantityChange = (increment: boolean) => {
        if (increment) {
            setQuantity(prev => prev + 1);
        } else if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const formatDimension = (value: number, unit: string) => {
        return `${value.toFixed(3)} ${unit}`;
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.finalPrice || product.price,
            image: product.image,
            color: product.colors[selectedColor],
            colorName: product.colorNames[selectedColor],
            measurementUnit,
            width,
            height,
            openingMethod,
            trackType,
            liningOption,
            // يمكنك إضافة أي خيارات أخرى هنا
        }));

        setInCart(true);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    return (
        <AppLayout>
            <div className="bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
                    <Breadcrumb
                        items={[
                            { name: 'الرئيسية', href: '/' },
                            { name: product.category?.name || 'المنتجات', href: '/products' },
                            { name: product.name, href: `/products/${product.id}` },
                            { name: 'عرض الخيارات' }
                        ]}
                    />
                </div>

                <div className="container mx-auto px-2 sm:px-4 lg:px-8">
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
                                <div className="space-y-3 md:space-y-4">
                                    <StockStatus inStock={product.inStock} />

                                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                        {product.name}
                                    </h1>

                                    <div className="flex items-center gap-4">
                                        <PriceDisplay
                                            price={product.price}
                                            discount={product.discount}
                                        />
                                        {product.hasDiscount && (
                                            <DiscountBadge discount={product.discount!} />
                                        )}
                                    </div>

                                    <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        {product.description}
                                    </div>
                                </div>

                                {product.colors && product.colors.length > 0 && (
                                    <div className="space-y-3 md:space-y-4">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">اختر اللون</h3>
                                        <ColorSelector
                                            colors={product.colors}
                                            colorNames={product.colorNames}
                                            selectedColor={selectedColor}
                                            onColorChange={setSelectedColor}
                                        />
                                    </div>
                                )}

                                <div className="space-y-4 md:space-y-6">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">القياسات</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                وحدة القياس
                                            </label>
                                            <select
                                                value={measurementUnit}
                                                onChange={(e) => setMeasurementUnit(e.target.value)}
                                                className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                                title="وحدة القياس"
                                            >
                                                {product.measurementUnits.map((unit) => (
                                                    <option key={unit.value} value={unit.value}>
                                                        {unit.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                الكمية
                                            </label>
                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button
                                                    onClick={() => handleQuantityChange(false)}
                                                    className="p-2.5 md:p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                                                    title="تقليل الكمية"
                                                >
                                                    <HiMinus className="h-4 w-4 md:h-5 md:w-5" />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                                    className="flex-1 text-center p-2.5 md:p-3 border-0 focus:ring-0 text-sm md:text-base"
                                                    min="1"
                                                    placeholder="الكمية"
                                                    title="كمية المنتج"
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(true)}
                                                    className="p-2.5 md:p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                                                    title="زيادة الكمية"
                                                >
                                                    <HiPlus className="h-4 w-4 md:h-5 md:w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                العرض
                                            </label>
                                            <input
                                                type="number"
                                                value={width}
                                                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                                                className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                                step="0.001"
                                                placeholder="العرض"
                                                title="عرض المنتج"
                                            />
                                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                                                {formatDimension(width, measurementUnit)}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                الارتفاع
                                            </label>
                                            <input
                                                type="number"
                                                value={height}
                                                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                                                className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                                step="0.001"
                                                placeholder="الارتفاع"
                                                title="ارتفاع المنتج"
                                            />
                                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                                                {formatDimension(height, measurementUnit)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">خيارات إضافية</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                طريقة الفتح
                                            </label>
                                            <select
                                                value={openingMethod}
                                                onChange={(e) => setOpeningMethod(e.target.value)}
                                                className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                                title="طريقة فتح المنتج"
                                            >
                                                {product.openingMethods.map((method) => (
                                                    <option key={method.value} value={method.value}>
                                                        {method.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                نوع المسار
                                            </label>
                                            <select
                                                value={trackType}
                                                onChange={(e) => setTrackType(e.target.value)}
                                                className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                                title="نوع مسار المنتج"
                                            >
                                                {product.trackTypes.map((track) => (
                                                    <option key={track.value} value={track.value}>
                                                        {track.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                            خيارات البطانة
                                        </label>
                                        <select
                                            value={liningOption}
                                            onChange={(e) => setLiningOption(e.target.value)}
                                            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                            title="خيارات بطانة المنتج"
                                        >
                                            {product.liningOptions.map((lining) => (
                                                <option key={lining.value} value={lining.value}>
                                                    {lining.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">رفع الملفات</h3>

                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                                        <HiUpload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400 mb-3 md:mb-4" />
                                        <p className="text-sm md:text-base text-gray-600 mb-2">
                                            اسحب وأفلت الملفات هنا، أو
                                        </p>
                                        <button className="text-primary-yellow hover:text-primary-yellow/80 font-medium text-sm md:text-base">
                                            اختر الملفات
                                        </button>
                                        <p className="text-xs md:text-sm text-gray-500 mt-2">
                                            PNG, JPG, PDF حتى 10MB
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        className={`w-full bg-primary-yellow rounded-xl p-2 sm:p-3 md:p-4 shadow-sm flex items-center justify-center gap-2 transition-colors duration-300 font-bold text-xs sm:text-sm text-[#0D1F40] ${added ? 'bg-green-500 scale-105' : 'hover:bg-yellow-500'} ${inCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        title={inCart ? 'تمت إضافة المنتج للسلة' : 'إضافة المنتج للسلة'}
                                        onClick={inCart ? undefined : handleAddToCart}
                                        disabled={inCart}
                                        style={{ minHeight: '44px' }}
                                    >
                                        {inCart ? (
                                            <span className="flex items-center gap-1">
                                                <HiCheck className="h-5 w-5 text-green-500" />
                                                موجود في السلة
                                            </span>
                                        ) : added ? (
                                            <span className="flex items-center gap-1">
                                                <HiCheck className="h-5 w-5 text-white transition-transform duration-500 ease-out transform translate-x-8 opacity-0 animate-[slidein_0.5s_ease-out_forwards]" style={{ animation: 'slidein 0.5s ease-out forwards' }} />
                                                تمت الإضافة
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <HiShoppingCart className="h-5 w-5 text-[#0D1F40]" />
                                                إضافة للسلة
                                            </span>
                                        )}
                                    </button>
                                    <button className="bg-primary-yellow text-gray-900 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors text-xs sm:text-sm">
                                        حجز استشارة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <ContactUs />
            </div>
        </AppLayout>
    );
};

export default ProductOptions;