import React, { useState } from 'react';
import { HiMinus, HiPlus, HiUpload, HiCheck, HiShoppingCart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import ColorSelector from '@/Components/Common/ColorSelector';
import PriceDisplay from '@/Components/Common/PriceDisplay';
import DiscountBadge from '@/Components/Common/DiscountBadge';
import StockStatus from '@/Components/Common/StockStatus';
import ImageGallery from '@/Components/Common/ImageGallery';
import ActionButtons from '@/Components/Common/ActionButtons';
import QuickOrderModal from '@/Components/Common/QuickOrderModal';
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
            customization_fields: any;
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
        defaultWidth?: number;
        defaultHeight?: number;
        fabricReduction?: number;
        coverageIncrease?: number;
    };
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [inCart, setInCart] = useState(false);
    const [added, setAdded] = useState(false);
    const [showQuickOrderModal, setShowQuickOrderModal] = useState(false);
    const dispatch = useDispatch();

    const customizationFields = product.category?.customization_fields || {};

    const handleQuantityChange = (increment: boolean) => {
        if (increment) {
            setQuantity(prev => prev + 1);
        } else if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleFieldChange = (fieldName: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.finalPrice || product.price,
            image: product.image,
            quantity: quantity,
            // إضافة اللون المختار إذا كان متوفراً
            ...(product.colors && product.colors[selectedColor] && {
                color: product.colors[selectedColor],
                colorName: product.colorNames?.[selectedColor]
            }),
            // إضافة باقي البيانات المخصصة
            ...formData
        };

        dispatch(addToCart(cartItem));
        setInCart(true);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    const handleQuickOrder = () => {
        setShowQuickOrderModal(true);
    };

    const renderField = (fieldName: string, field: any) => {
        const { label, type, options, required, min, max, units } = field;

        switch (type) {
            case 'color_selector':
                if (product.colors && product.colors.length > 0) {
                    return (
                        <div key={fieldName} className="space-y-3 md:space-y-4">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                {label} {required && <span className="text-red-500">*</span>}
                            </h3>
                            <ColorSelector
                                colors={product.colors}
                                colorNames={product.colorNames}
                                selectedColor={selectedColor}
                                onColorChange={setSelectedColor}
                            />
                        </div>
                    );
                }
                break;

            case 'select':
                return (
                    <div key={fieldName} className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <select
                            value={formData[fieldName] || ''}
                            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                            required={required}
                        >
                            <option value="">اختر {label}</option>
                            {Object.entries(options).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value as string}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            case 'number':
                return (
                    <div key={fieldName} className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="number"
                            value={formData[fieldName] || ''}
                            onChange={(e) => handleFieldChange(fieldName, parseInt(e.target.value) || 0)}
                            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                            min={min}
                            max={max}
                            required={required}
                        />
                    </div>
                );

            case 'dimensions':
                return (
                    <div key={fieldName} className="space-y-4 md:space-y-6">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                            {label} {required && <span className="text-red-500">*</span>}
                        </h3>

                        {units && (
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                    وحدة القياس
                                </label>
                                <select
                                    value={formData[`${fieldName}_unit`] || units[0]}
                                    onChange={(e) => handleFieldChange(`${fieldName}_unit`, e.target.value)}
                                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                >
                                    {units.map((unit: string) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                    العرض
                                </label>
                                <input
                                    type="number"
                                    value={formData[`${fieldName}_width`] || product.defaultWidth || ''}
                                    onChange={(e) => handleFieldChange(`${fieldName}_width`, parseFloat(e.target.value) || 0)}
                                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                    step="0.001"
                                    required={required}
                                />
                            </div>
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                    الارتفاع
                                </label>
                                <input
                                    type="number"
                                    value={formData[`${fieldName}_height`] || product.defaultHeight || ''}
                                    onChange={(e) => handleFieldChange(`${fieldName}_height`, parseFloat(e.target.value) || 0)}
                                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                    step="0.001"
                                    required={required}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'dimensions_3d':
                return (
                    <div key={fieldName} className="space-y-4 md:space-y-6">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                            {label} {required && <span className="text-red-500">*</span>}
                        </h3>

                        {units && (
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                    وحدة القياس
                                </label>
                                <select
                                    value={formData[`${fieldName}_unit`] || units[0]}
                                    onChange={(e) => handleFieldChange(`${fieldName}_unit`, e.target.value)}
                                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                >
                                    {units.map((unit: string) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                    الطول
                                </label>
                                <input
                                    type="number"
                                    value={formData[`${fieldName}_length`] || ''}
                                    onChange={(e) => handleFieldChange(`${fieldName}_length`, parseFloat(e.target.value) || 0)}
                                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                    step="0.001"
                                    required={required}
                                />
                            </div>
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                    العرض
                                </label>
                                <input
                                    type="number"
                                    value={formData[`${fieldName}_width`] || ''}
                                    onChange={(e) => handleFieldChange(`${fieldName}_width`, parseFloat(e.target.value) || 0)}
                                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                    step="0.001"
                                    required={required}
                                />
                            </div>
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                    الارتفاع
                                </label>
                                <input
                                    type="number"
                                    value={formData[`${fieldName}_height`] || ''}
                                    onChange={(e) => handleFieldChange(`${fieldName}_height`, parseFloat(e.target.value) || 0)}
                                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                    step="0.001"
                                    required={required}
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
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

                                {/* الكمية */}
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                            الكمية
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-md w-32">
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

                                {/* خيارات التخصيص الديناميكية */}
                                <div className="space-y-6">
                                    {Object.entries(customizationFields).map(([fieldName, field]) =>
                                        renderField(fieldName, field)
                                    )}
                                </div>

                                {/* رفع الملفات */}
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

                                {/* أزرار العمل */}
                                <div className="pt-4">
                                    <ActionButtons
                                        onAddToCart={handleAddToCart}
                                        onQuickOrder={handleQuickOrder}
                                        inStock={product.inStock}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* مودال الطلب السريع */}
            <QuickOrderModal
                isOpen={showQuickOrderModal}
                onClose={() => setShowQuickOrderModal(false)}
                product={{
                    id: product.id,
                    name: product.name,
                    price: product.finalPrice || product.price,
                    image: product.image
                }}
                selectedOptions={{
                    ...(product.colors && product.colors[selectedColor] && {
                        color: product.colors[selectedColor],
                        colorName: product.colorNames?.[selectedColor]
                    }),
                    ...formData,
                    quantity: quantity
                }}
            />

            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <ContactUs />
            </div>
        </AppLayout>
    );
};

export default ProductOptions;
