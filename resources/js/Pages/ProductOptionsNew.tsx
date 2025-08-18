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
import { addToCart, syncCartData } from '@/store/features/cartSlice';

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

interface UploadedFile {
    name: string;
    size: number;
    uuid: string;
    path?: string;
    url?: string;
    type?: string;
    file?: File; // للاحتفاظ بملف الـ File الأصلي
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState<Record<string, any>>({
        quantity: 1
    });
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [inCart, setInCart] = useState(false);
    const [added, setAdded] = useState(false);
    const [showQuickOrderModal, setShowQuickOrderModal] = useState(false);
    const dispatch = useDispatch();

    const customizationFields = product.category?.customization_fields || {}; const handleQuantityChange = (increment: boolean) => {
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

    const handleMultipleCheckboxChange = (fieldName: string, optionKey: string, checked: boolean) => {
        setFormData(prev => {
            const currentValues = prev[fieldName] || [];
            if (checked) {
                return {
                    ...prev,
                    [fieldName]: [...currentValues, optionKey]
                };
            } else {
                return {
                    ...prev,
                    [fieldName]: currentValues.filter((value: string) => value !== optionKey)
                };
            }
        });
    };

    const handleFileUpload = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files).map(file => ({
                name: file.name,
                size: file.size,
                uuid: Math.random().toString(36).substr(2, 9), // توليد uuid مؤقت
                type: file.type,
                path: '',
                url: '',
                file: file
            }));
            setUploadedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.finalPrice || product.price,
            image: product.image,
            quantity: formData.quantity || quantity || 1,
            // إضافة اللون المختار إذا كان متوفراً
            ...(product.colors && product.colors[selectedColor] && {
                color: product.colors[selectedColor],
                colorName: product.colorNames?.[selectedColor]
            }),
            // إضافة باقي البيانات المخصصة
            ...formData,
            uploadedFiles: uploadedFiles.map(file => file.name)
        };

        dispatch(addToCart(cartItem));
        setInCart(true);
        setAdded(true);

        // مزامنة بيانات السلة
        syncCartData();

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    const handleQuickOrder = () => {
        setShowQuickOrderModal(true);
    };

    const renderField = (fieldName: string, field: any) => {
        const { label, type, options, required, min, max, units, with_other_option, description, accept, max_files } = field;

        switch (type) {
            case 'select':
                return (
                    <div key={fieldName} className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {description && (
                            <p className="text-xs md:text-sm text-gray-500">{description}</p>
                        )}
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
                        {description && (
                            <p className="text-xs md:text-sm text-gray-500">{description}</p>
                        )}
                        {fieldName === 'quantity' ? (
                            // تصميم خاص للكمية مع أزرار + و -
                            <div className="flex items-center border border-gray-300 rounded-md w-32">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentValue = formData[fieldName] || 1;
                                        if (currentValue > (min || 1)) {
                                            handleFieldChange(fieldName, currentValue - 1);
                                            setQuantity(currentValue - 1);
                                        }
                                    }}
                                    className="p-2.5 md:p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                                    title="تقليل الكمية"
                                >
                                    <HiMinus className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                                <input
                                    type="number"
                                    value={formData[fieldName] || quantity}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 1;
                                        handleFieldChange(fieldName, value);
                                        setQuantity(value);
                                    }}
                                    className="flex-1 text-center p-2.5 md:p-3 border-0 focus:ring-0 text-sm md:text-base"
                                    min={min || 1}
                                    max={max}
                                    placeholder="الكمية"
                                    title="كمية المنتج"
                                    required={required}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentValue = formData[fieldName] || 1;
                                        if (!max || currentValue < max) {
                                            handleFieldChange(fieldName, currentValue + 1);
                                            setQuantity(currentValue + 1);
                                        }
                                    }}
                                    className="p-2.5 md:p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                                    title="زيادة الكمية"
                                >
                                    <HiPlus className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                            </div>
                        ) : (
                            // تصميم عادي للحقول الرقمية الأخرى
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentValue = formData[fieldName] || min || 0;
                                        if (currentValue > (min || 0)) {
                                            handleFieldChange(fieldName, currentValue - 1);
                                        }
                                    }}
                                    className="p-2.5 md:p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <HiMinus className="h-4 w-4" />
                                </button>
                                <input
                                    type="number"
                                    value={formData[fieldName] || ''}
                                    onChange={(e) => handleFieldChange(fieldName, parseInt(e.target.value) || 0)}
                                    className="flex-1 text-center p-2.5 md:p-3 border-0 focus:ring-0 text-sm md:text-base"
                                    min={min}
                                    max={max}
                                    required={required}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentValue = formData[fieldName] || min || 0;
                                        if (!max || currentValue < max) {
                                            handleFieldChange(fieldName, currentValue + 1);
                                        }
                                    }}
                                    className="p-2.5 md:p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <HiPlus className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 'color_selector':
                return (
                    <div key={fieldName} className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="space-y-3">
                            {/* ألوان محددة مسبقاً */}
                            <div className="grid grid-cols-8 gap-2">
                                {[
                                    '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
                                    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#D2B48C', '#8B4513', '#F5DEB3'
                                ].map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleFieldChange(fieldName, color)}
                                        className={`w-8 h-8 rounded-full border-2 ${formData[fieldName] === color ? 'border-primary-yellow' : 'border-gray-300'
                                            }`}
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>

                            {with_other_option && (
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`${fieldName}_type`}
                                            onChange={() => handleFieldChange(`${fieldName}_is_custom`, true)}
                                            className="text-primary-yellow focus:ring-primary-yellow"
                                        />
                                        <span className="text-sm">لون آخر</span>
                                    </label>
                                    {formData[`${fieldName}_is_custom`] && (
                                        <input
                                            type="color"
                                            value={formData[`${fieldName}_custom`] || '#000000'}
                                            onChange={(e) => {
                                                handleFieldChange(`${fieldName}_custom`, e.target.value);
                                                handleFieldChange(fieldName, e.target.value);
                                            }}
                                            className="w-full h-10 rounded border border-gray-300"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'checkbox_multiple':
                return (
                    <div key={fieldName} className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {description && (
                            <p className="text-xs md:text-sm text-gray-500">{description}</p>
                        )}
                        <div className="space-y-2">
                            {Object.entries(options).map(([key, value]) => (
                                <label key={key} className="flex items-center gap-3 rtl:flex-row-reverse">
                                    <input
                                        type="checkbox"
                                        checked={(formData[fieldName] || []).includes(key)}
                                        onChange={(e) => handleMultipleCheckboxChange(fieldName, key, e.target.checked)}
                                        className="text-primary-yellow focus:ring-primary-yellow rounded"
                                    />
                                    <span className="text-sm md:text-base">{value as string}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );

            case 'file_upload':
                return (
                    <div key={fieldName} className="space-y-4 md:space-y-6">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                            {label} {required && <span className="text-red-500">*</span>}
                        </h3>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                            <HiUpload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400 mb-3 md:mb-4" />
                            <p className="text-sm md:text-base text-gray-600 mb-2">
                                رفع مخطط أو صورة للتصميم والمكان المطلوب
                            </p>
                            <label className="cursor-pointer">
                                <span className="text-primary-yellow hover:text-primary-yellow/80 font-medium text-sm md:text-base">
                                    اختر الملفات
                                </span>
                                <input
                                    type="file"
                                    multiple={max_files ? max_files > 1 : true}
                                    accept={accept}
                                    onChange={(e) => handleFileUpload(e.target.files)}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs md:text-sm text-gray-500 mt-2">
                                {accept ? accept.replace(/\*/g, '') : 'PNG, JPG, PDF'} حتى 10MB
                                {max_files && ` (حد أقصى ${max_files} ملف)`}
                            </p>
                        </div>

                        {/* عرض الملفات المرفوعة */}
                        {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm">الملفات المرفوعة:</h4>
                                <div className="space-y-2">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                            <span className="text-sm text-gray-700">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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

                                {/* اختيار اللون من ألوان المنتج */}
                                {product.colors && product.colors.length > 0 && (
                                    <div className="space-y-3 md:space-y-4">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                            اختر اللون <span className="text-red-500">*</span>
                                        </h3>
                                        <ColorSelector
                                            colors={product.colors}
                                            colorNames={product.colorNames}
                                            selectedColor={selectedColor}
                                            onColorChange={setSelectedColor}
                                        />
                                    </div>
                                )}

                                {/* خيارات التخصيص الديناميكية */}
                                <div className="space-y-6">
                                    {Object.entries(customizationFields).map(([fieldName, field]) => {
                                        return renderField(fieldName, field);
                                    })}
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
                    quantity: formData.quantity || quantity || 1,
                    customizations: Object.keys(customizationFields).reduce((acc, fieldName) => {
                        const field = customizationFields[fieldName];
                        const value = formData[fieldName];

                        if (value !== undefined && value !== null && value !== '') {
                            acc[fieldName] = {
                                type: field.type,
                                label: field.label,
                                value: value,
                                displayValue: field.type === 'select' && field.options
                                    ? field.options.find((opt: any) => opt.value === value)?.label || value
                                    : value,
                                ...(field.type === 'checkbox_multiple' && Array.isArray(value) && {
                                    values: value,
                                    displayValues: value.map((v: any) =>
                                        field.options?.find((opt: any) => opt.value === v)?.label || v
                                    )
                                }),
                                ...(field.type === 'dimensions' && {
                                    width: formData[fieldName + '_width'],
                                    height: formData[fieldName + '_height'],
                                    unit: field.units?.[0] || 'سم'
                                }),
                                ...(field.type === 'dimensions_3d' && {
                                    width: formData[fieldName + '_width'],
                                    height: formData[fieldName + '_height'],
                                    length: formData[fieldName + '_length'],
                                    unit: field.units?.[0] || 'سم'
                                }),
                                ...(field.type === 'file_upload' && uploadedFiles.length > 0 && {
                                    files: uploadedFiles.map(file => ({
                                        name: file.name,
                                        size: file.size,
                                        uuid: file.uuid,
                                        type: file.type || '',
                                        path: file.path || '',
                                        url: file.url || ''
                                    }))
                                })
                            };
                        }
                        return acc;
                    }, {} as Record<string, any>),
                    uploadedFiles: uploadedFiles.map(file => ({
                        name: file.name,
                        size: file.size,
                        uuid: file.uuid,
                        type: file.type || '',
                        path: file.path || '',
                        url: file.url || ''
                    }))
                }}
            />

            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <ContactUs />
            </div>
        </AppLayout>
    );
};

export default ProductOptions;
