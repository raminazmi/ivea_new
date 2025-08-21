import React, { useState, useEffect } from 'react';
import { HiMinus, HiPlus, HiUpload, HiCheck, HiShoppingCart, HiChevronDown, HiChevronUp, HiAdjustments } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import ColorSelector from '@/Components/Common/ColorSelector';
import PriceDisplay from '@/Components/Common/PriceDisplay';
import DiscountBadge from '@/Components/Common/DiscountBadge';
import StockStatus from '@/Components/Common/StockStatus';
import ImageGallery from '@/Components/Common/ImageGallery';
import ActionButtons from '@/Components/Common/ActionButtons';
import QuickOrderModal from '@/Components/Common/QuickOrderModal';
import FeatureList from '@/Components/Common/FeatureList';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactUs from '@/Components/LandingPage/ContactUs';
import DimensionPriceCalculator from '@/Components/Products/DimensionPriceCalculator';
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
        features: string[];
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
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [customColor, setCustomColor] = useState('#000000');
    const [useCustomColor, setUseCustomColor] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState<number>(product.finalPrice || product.price);
    const [calculatedArea, setCalculatedArea] = useState<number>(0);
    const [basePrice, setBasePrice] = useState<number>(product.finalPrice || product.price);
    const [dimensions, setDimensions] = useState<{ width: number, height: number }>({
        width: product.defaultWidth || 150,
        height: product.defaultHeight || 200
    });
    const [formData, setFormData] = useState<Record<string, any>>({
        quantity: 1
    });
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [inCart, setInCart] = useState(false);
    const [added, setAdded] = useState(false);
    const [showQuickOrderModal, setShowQuickOrderModal] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const dispatch = useDispatch();

    const customizationFields = product.category?.customization_fields || {};
    
    // تحديد نوع الفئة لتخصيص عرض الخيارات
    const categoryName = product.category?.name?.toLowerCase();
    const isCurtainsOrCabinets = categoryName?.includes('ستا') || categoryName?.includes('خزا');
    const isSofaOrWood = categoryName?.includes('كنب') || categoryName?.includes('خشب');
    
    // فصل الحقول حسب الأولوية
    const priorityFields = ['quantity', 'dimensions', 'dimensions_3d']; // الحقول ذات الأولوية للستائر والخزائن
    const mainFields: Record<string, any> = {};
    const extraFields: Record<string, any> = {};
    
    Object.entries(customizationFields).forEach(([fieldName, field]) => {
        if (isCurtainsOrCabinets && (priorityFields.includes((field as any)?.type) || fieldName === 'quantity' || (field as any)?.label?.includes('كمية') || (field as any)?.label?.includes('Quantity'))) {
            mainFields[fieldName] = field;
        } else {
            extraFields[fieldName] = field;
        }
    });

    const handleQuantityChange = (increment: boolean) => {
        if (increment) {
            setQuantity(prev => prev + 1);
        } else if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleColorChange = (index: number) => {
        setSelectedColor(index);
        setUseCustomColor(false);
        setShowColorPicker(false);
    };

    const handleCustomColorChange = (color: string) => {
        setCustomColor(color);
        setUseCustomColor(true);
        setSelectedColor(-1); // إلغاء اختيار الألوان المحددة مسبقاً
    };

    const getSelectedColorInfo = () => {
        if (useCustomColor) {
            return {
                color: customColor,
                colorName: 'لون مخصص'
            };
        } else if (product.colors && product.colors[selectedColor]) {
            return {
                color: product.colors[selectedColor],
                colorName: product.colorNames?.[selectedColor] || `اللون ${selectedColor + 1}`
            };
        }
        return null;
    };

    const handlePriceChange = (price: number, area: number) => {
        // السعر الذي يأتي من الحاسبة هو السعر الإجمالي مع الكمية
        setCalculatedPrice(price);
        setCalculatedArea(area);
        // حساب السعر الأساسي للقطعة الواحدة
        const unitPrice = price / (formData.quantity || quantity || 1);
        setBasePrice(unitPrice);
    };

    const handleDimensionsChange = (width: number, height: number) => {
        setDimensions({ width, height });
        // تحديث البيانات في formData للأبعاد
        setFormData(prev => ({
            ...prev,
            dimensions_width: width,
            dimensions_height: height,
            dimensions_unit: formData.measurement_unit || 'سم'
        }));
    };

    const calculateFinalPrice = () => {
        if (isCurtainsOrCabinets) {
            // للستائر والخزائن: السعر الأساسي × الكمية
            return basePrice * (formData.quantity || quantity || 1);
        } else if (isSofaOrWood) {
            // للكنب والخشبيات: السعر العادي × الكمية
            return (product.finalPrice || product.price) * (formData.quantity || quantity || 1);
        } else {
            // للفئات الأخرى: السعر العادي × الكمية
            return (product.finalPrice || product.price) * (formData.quantity || quantity || 1);
        }
    };

    const handleUnitChange = (unit: string) => {
        const currentUnit = formData.measurement_unit || 'سم';
        
        setFormData(prev => ({
            ...prev,
            measurement_unit: unit
        }));
        
        // تحويل الأبعاد عند تغيير الوحدة
        if (unit === 'م' && currentUnit === 'سم') {
            // تحويل من سم إلى م
            const newWidth = dimensions.width / 100;
            const newHeight = dimensions.height / 100;
            setDimensions({ width: newWidth, height: newHeight });
            handleDimensionsChange(newWidth, newHeight);
        } else if (unit === 'سم' && currentUnit === 'م') {
            // تحويل من م إلى سم
            const newWidth = dimensions.width * 100;
            const newHeight = dimensions.height * 100;
            setDimensions({ width: newWidth, height: newHeight });
            handleDimensionsChange(newWidth, newHeight);
        }
        
        // إعادة حساب السعر بعد تغيير الوحدة
        setTimeout(() => {
            const finalPrice = calculateFinalPrice();
            setCalculatedPrice(finalPrice);
        }, 100);
    };

    // تحديث الحاسبة عند تغيير وحدة القياس أو الكمية
    useEffect(() => {
        if (isCurtainsOrCabinets) {
            // إعادة حساب السعر عند تغيير الوحدة أو الكمية
            const finalPrice = calculateFinalPrice();
            setCalculatedPrice(finalPrice);
        } else if (isSofaOrWood) {
            // إعادة حساب السعر عند تغيير الكمية للكنب والخشبيات
            const finalPrice = calculateFinalPrice();
            setCalculatedPrice(finalPrice);
        }
    }, [formData.measurement_unit, basePrice, formData.quantity, quantity]);

    const handleFieldChange = (fieldName: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
        
        // إذا كان التغيير في الكمية، حدث السعر النهائي
        if (fieldName === 'quantity') {
            const finalPrice = calculateFinalPrice();
            setCalculatedPrice(finalPrice);
        }
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

    const handleFileUpload = async (files: FileList | null) => {
        if (files) {
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('files[]', file);
            });

            try {
                const response = await fetch('/upload-files', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setUploadedFiles(prev => [...prev, ...result.files]);
                    }
                }
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddToCart = () => {
        // تجميع جميع البيانات المخصصة
        const customizationData: Record<string, any> = {};

        // إضافة جميع قيم الحقول المخصصة مع التسميات
        Object.entries(customizationFields).forEach(([fieldName, field]) => {
            const fieldValue = formData[fieldName];
            const fieldType = (field as any)?.type;
            const fieldLabel = (field as any)?.label;

            if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                if (fieldType === 'checkbox_multiple' && Array.isArray(fieldValue) && fieldValue.length > 0) {
                    // للحقول متعددة الاختيار، احفظ القيم والتسميات
                    const options = (field as any)?.options || {};
                    customizationData[fieldName] = {
                        type: fieldType,
                        label: fieldLabel,
                        values: fieldValue,
                        displayValues: fieldValue.map(val => options[val]).filter(Boolean)
                    };
                } else if (fieldType === 'select') {
                    // للحقول المنسدلة، احفظ القيمة والنص المعروض
                    const options = (field as any)?.options || {};
                    customizationData[fieldName] = {
                        type: fieldType,
                        label: fieldLabel,
                        value: fieldValue,
                        displayValue: options[fieldValue] || fieldValue
                    };
                } else if (fieldType === 'dimensions') {
                    // للأبعاد ثنائية
                    const width = formData[`${fieldName}_width`];
                    const height = formData[`${fieldName}_height`];
                    const unit = formData[`${fieldName}_unit`] || ((field as any)?.units?.[0]);

                    if (width || height) {
                        customizationData[fieldName] = {
                            type: fieldType,
                            label: fieldLabel,
                            width: width || 0,
                            height: height || 0,
                            unit: unit,
                            displayValue: `${width || 0} × ${height || 0} ${unit || ''}`
                        };
                    }
                } else if (fieldType === 'dimensions_3d') {
                    // للأبعاد ثلاثية
                    const length = formData[`${fieldName}_length`];
                    const width = formData[`${fieldName}_width`];
                    const height = formData[`${fieldName}_height`];
                    const unit = formData[`${fieldName}_unit`] || ((field as any)?.units?.[0]);

                    if (length || width || height) {
                        customizationData[fieldName] = {
                            type: fieldType,
                            label: fieldLabel,
                            length: length || 0,
                            width: width || 0,
                            height: height || 0,
                            unit: unit,
                            displayValue: `${length || 0} × ${width || 0} × ${height || 0} ${unit || ''}`
                        };
                    }
                } else if (fieldType === 'number') {
                    // للحقول الرقمية
                    const units = (field as any)?.units;
                    customizationData[fieldName] = {
                        type: fieldType,
                        label: fieldLabel,
                        value: fieldValue,
                        displayValue: `${fieldValue}${units ? ` ${units.join('/')}` : ''}`
                    };
                } else {
                    // للحقول الأخرى
                    customizationData[fieldName] = {
                        type: fieldType,
                        label: fieldLabel,
                        value: fieldValue,
                        displayValue: fieldValue
                    };
                }
            }
        });

        const selectedColorInfo = getSelectedColorInfo();

        const cartItem = {
            id: product.id,
            name: product.name,
            price: isCurtainsOrCabinets ? basePrice : (product.finalPrice || product.price), // السعر الأساسي للقطعة الواحدة
            finalPrice: calculateFinalPrice(), // السعر النهائي مع الكمية
            image: product.image,
            quantity: formData.quantity || quantity || 1,
            // إضافة اللون المختار أو اللون المخصص
            ...(selectedColorInfo && {
                color: selectedColorInfo.color,
                colorName: selectedColorInfo.colorName
            }),
            // إضافة البيانات المخصصة المنظمة
            customizations: customizationData,
            // إضافة الملفات المرفوعة
            uploadedFiles: uploadedFiles.map(file => ({
                name: file.name,
                path: file.path || '',
                url: file.url || '',
                size: file.size,
                type: file.type || '',
                uuid: file.uuid
            })),
            // معرف فريد للعنصر في السلة (للتمييز بين المنتجات المتشابهة بخيارات مختلفة)
            cartId: `${product.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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
                            title={`اختر ${label}`}
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
                            <div className="relative w-full inline-flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:border-primary-yellow focus-within:ring-2 focus-within:ring-primary-yellow focus-within:ring-opacity-20 transition-all duration-200">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentValue = formData[fieldName] || 1;
                                        if (currentValue > (min || 1)) {
                                            handleFieldChange(fieldName, currentValue - 1);
                                            setQuantity(currentValue - 1);
                                        }
                                    }}
                                    className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-r-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="تقليل الكمية"
                                    disabled={(formData[fieldName] || 1) <= (min || 1)}
                                >
                                    <HiMinus className="h-4 w-4" />
                                </button>
                                <input
                                    type="number"
                                    value={formData[fieldName] || quantity}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 1;
                                        handleFieldChange(fieldName, value);
                                        setQuantity(value);
                                    }}
                                    className="flex-1 text-center py-3 px-2 border-0 bg-transparent focus:ring-0 focus:outline-none text-sm md:text-base font-medium text-gray-900"
                                    min={min || 1}
                                    max={max}
                                    placeholder="1"
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
                                    className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-l-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="زيادة الكمية"
                                    disabled={max && (formData[fieldName] || 1) >= max}
                                >
                                    <HiPlus className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            // تصميم محسن للحقول الرقمية الأخرى
                            <div className="relative inline-flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:border-primary-yellow focus-within:ring-2 focus-within:ring-primary-yellow focus-within:ring-opacity-20 transition-all duration-200 max-w-xs">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentValue = formData[fieldName] || min || 0;
                                        if (currentValue > (min || 0)) {
                                            handleFieldChange(fieldName, currentValue - 1);
                                        }
                                    }}
                                    className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-r-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="تقليل القيمة"
                                    disabled={(formData[fieldName] || min || 0) <= (min || 0)}
                                >
                                    <HiMinus className="h-4 w-4" />
                                </button>
                                <input
                                    type="number"
                                    value={formData[fieldName] || ''}
                                    onChange={(e) => handleFieldChange(fieldName, parseInt(e.target.value) || 0)}
                                    className="flex-1 text-center py-3 px-4 border-0 bg-transparent focus:ring-0 focus:outline-none text-sm md:text-base font-medium text-gray-900 min-w-0"
                                    min={min}
                                    max={max}
                                    placeholder="0"
                                    required={required}
                                    title={`أدخل ${label}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentValue = formData[fieldName] || min || 0;
                                        if (!max || currentValue < max) {
                                            handleFieldChange(fieldName, currentValue + 1);
                                        }
                                    }}
                                    className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-l-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="زيادة القيمة"
                                    disabled={max && (formData[fieldName] || min || 0) >= max}
                                >
                                    <HiPlus className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                        {/* عرض وحدة القياس إذا كانت متوفرة */}
                        {units && (
                            <p className="text-xs text-gray-500 mt-1">
                                الوحدة: {units.join(' أو ')}
                            </p>
                        )}
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
                                <label key={key} className="flex items-center gap-3">
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
                                            <div className="flex items-center gap-2">
                                                <span>📎</span>
                                                <span className="text-sm text-gray-700">{file.name}</span>
                                                <span className="text-xs text-gray-500">
                                                    ({(file.size / 1024).toFixed(1)} KB)
                                                </span>
                                            </div>
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
                                     title="أدخل العرض"
                                     placeholder="أدخل العرض"
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
                                     title="أدخل الارتفاع"
                                     placeholder="أدخل الارتفاع"
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
                                    title="اختر وحدة القياس"
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
                                    title="أدخل الطول"
                                    placeholder="أدخل الطول"
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
                                    title="أدخل العرض"
                                    placeholder="أدخل العرض"
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
                                    title="أدخل الارتفاع"
                                    placeholder="أدخل الارتفاع"
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
                                        {isCurtainsOrCabinets ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl md:text-3xl font-bold text-green-600">
                                                        {calculatedPrice.toFixed(2)} ر.س
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        (السعر الإجمالي)
                                                    </span>
                                                </div>
                                            </div>
                                        ) : isSofaOrWood ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl md:text-3xl font-bold text-green-600">
                                                        {calculatedPrice.toFixed(2)} ر.س
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        (السعر الإجمالي)
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    السعر الأساسي: {(product.finalPrice || product.price).toFixed(2)} ر.س × الكمية: {formData.quantity || quantity || 1} = {calculatedPrice.toFixed(2)} ر.س
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <PriceDisplay
                                                        price={product.price}
                                                        discount={product.discount}
                                                    />
                                                    {product.hasDiscount && (
                                                        <DiscountBadge discount={product.discount!} />
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    السعر الإجمالي: {(calculateFinalPrice()).toFixed(2)} ر.س
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        {product.description}
                                    </div>

                                    {/* عرض مميزات المنتج */}
                                    {product.features && product.features.length > 0 && (
                                        <div className="mt-4">
                                            <FeatureList features={product.features} />
                                        </div>
                                    )}
                                </div>

                                {/* اختيار اللون والكمية للستائر والخزائن */}
                                {isCurtainsOrCabinets && product.colors && product.colors.length > 0 && (
                                    <div className="space-y-4 md:space-y-6">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                            الخيارات الأساسية
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                            {/* اختيار اللون */}
                                            <div className="space-y-3">
                                                <label className="block text-sm md:text-base font-medium text-gray-700">
                                                    اللون
                                                </label>
                                                
                                                {/* الألوان الرئيسية للمنتج */}
                                                <div className="space-y-4">
                                                    {/* الألوان من قاعدة البيانات في سطر واحد */}
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        {product.colors.map((color, index) => (
                                                            <label
                                                                key={index}
                                                                className="relative cursor-pointer group"
                                                                title={product.colorNames?.[index] || `اللون ${index + 1}`}
                                                            >
                                                                <div
                                                                    className={`w-7 h-7 rounded-full border-3 shadow-md transition-all duration-200 ${
                                                                        selectedColor === index && !useCustomColor
                                                                            ? 'border-primary-yellow scale-110'
                                                                            : 'border-gray-300 hover:border-primary-yellow hover:scale-105'
                                                                    }`}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {selectedColor === index && !useCustomColor && (
                                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                                            <HiCheck className="text-white text-sm font-bold" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type="radio"
                                                                    name="color"
                                                                    value={index}
                                                                    checked={selectedColor === index && !useCustomColor}
                                                                    onChange={() => handleColorChange(index)}
                                                                    className="sr-only"
                                                                    aria-label={product.colorNames?.[index] || `اللون ${index + 1}`}
                                                                />
                                                            </label>
                                                        ))}
                                                        
                                                        {/* خيار اللون المخصص */}
                                                        <label
                                                            className="relative cursor-pointer group"
                                                            title="لون مخصص"
                                                        >
                                                            <div
                                                                className={`w-7 h-7 rounded-full border-3 shadow-md transition-all duration-200 flex items-center justify-center ${
                                                                    useCustomColor
                                                                        ? 'border-primary-yellow scale-110'
                                                                        : 'border-gray-300 hover:border-primary-yellow hover:scale-105'
                                                                }`}
                                                                style={{ backgroundColor: customColor }}
                                                            >
                                                                <HiPlus className="text-white text-sm font-bold" />
                                                            </div>
                                                            <input
                                                                type="radio"
                                                                name="color"
                                                                checked={useCustomColor}
                                                                onChange={() => {
                                                                    setUseCustomColor(true);
                                                                    setSelectedColor(-1);
                                                                    setShowColorPicker(true);
                                                                }}
                                                                className="sr-only"
                                                                aria-label="لون مخصص"
                                                            />
                                                        </label>
                                                    </div>
                                                    
                                                    {/* عرض أسماء الألوان المختارة */}
                                                    <div className="text-sm text-gray-600">
                                                        {useCustomColor ? (
                                                            <span>اللون المختار: <span className="font-medium">لون مخصص</span></span>
                                                        ) : selectedColor >= 0 ? (
                                                            <span>اللون المختار: <span className="font-medium">{product.colorNames?.[selectedColor] || `اللون ${selectedColor + 1}`}</span></span>
                                                        ) : (
                                                            <span className="text-gray-400">اختر لون</span>
                                                        )}
                                                    </div>
                                                </div>
                                                

                                            </div>
                                            
                                            {/* اختيار الكمية */}
                                            <div className="space-y-3">
                                                <label className="block text-sm md:text-base font-medium text-gray-700">
                                                    الكمية
                                                </label>
                                                <div className="relative w-full  inline-flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:border-primary-yellow focus-within:ring-2 focus-within:ring-primary-yellow focus-within:ring-opacity-20 transition-all duration-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const currentValue = formData.quantity || quantity;
                                                            if (currentValue > 1) {
                                                                handleFieldChange('quantity', currentValue - 1);
                                                                setQuantity(currentValue - 1);
                                                            }
                                                        }}
                                                        className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-r-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title="تقليل الكمية"
                                                        disabled={(formData.quantity || quantity) <= 1}
                                                    >
                                                        <HiMinus className="h-4 w-4" />
                                                    </button>
                                                    <div className="flex-1 text-center px-2">
                                                        <input
                                                            type="number"
                                                            value={formData.quantity || quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value) || 1;
                                                                handleFieldChange('quantity', value);
                                                                setQuantity(value);
                                                            }}
                                                            className="w-full border-0 bg-transparent focus:ring-0 focus:outline-none text-sm md:text-base font-medium text-gray-900 text-center"
                                                            min="1"
                                                            placeholder="1"
                                                            title="كمية المنتج"
                                                            required
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const currentValue = formData.quantity || quantity;
                                                            handleFieldChange('quantity', currentValue + 1);
                                                            setQuantity(currentValue + 1);
                                                        }}
                                                        className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-l-lg transition-colors duration-150"
                                                        title="زيادة الكمية"
                                                    >
                                                        <HiPlus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Color Picker للون المخصص */}
                                        {useCustomColor && (
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-sm font-medium text-gray-700">
                                                            اختر اللون المخصص
                                                        </label>
                                                        <span className="text-xs text-gray-500">
                                                            {customColor}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <input
                                                                type="color"
                                                                value={customColor}
                                                                onChange={(e) => handleCustomColorChange(e.target.value)}
                                                                className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
                                                                title="اختر اللون"
                                                            />
                                                            <div className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none"></div>
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            انقر لاختيار لون مخصص
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* اختيار اللون والكمية للكنب والخشبيات */}
                                {isSofaOrWood && product.colors && product.colors.length > 0 && (
                                    <div className="space-y-4 md:space-y-6">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                            الخيارات الأساسية
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                            {/* اختيار اللون */}
                                            <div className="space-y-3">
                                                <label className="block text-sm md:text-base font-medium text-gray-700">
                                                    اللون
                                                </label>
                                                
                                                {/* الألوان الرئيسية للمنتج */}
                                                <div className="space-y-4">
                                                    {/* الألوان من قاعدة البيانات في سطر واحد */}
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        {product.colors.map((color, index) => (
                                                            <label
                                                                key={index}
                                                                className="relative cursor-pointer group"
                                                                title={product.colorNames?.[index] || `اللون ${index + 1}`}
                                                            >
                                                                <div
                                                                    className={`w-7 h-7 rounded-full border-3 shadow-md transition-all duration-200 ${
                                                                        selectedColor === index && !useCustomColor
                                                                            ? 'border-primary-yellow scale-110'
                                                                            : 'border-gray-300 hover:border-primary-yellow hover:scale-105'
                                                                    }`}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {selectedColor === index && !useCustomColor && (
                                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                                            <HiCheck className="text-white text-sm font-bold" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type="radio"
                                                                    name="color"
                                                                    value={index}
                                                                    checked={selectedColor === index && !useCustomColor}
                                                                    onChange={() => handleColorChange(index)}
                                                                    className="sr-only"
                                                                    aria-label={product.colorNames?.[index] || `اللون ${index + 1}`}
                                                                />
                                                            </label>
                                                        ))}
                                                        
                                                        {/* خيار اللون المخصص */}
                                                        <label
                                                            className="relative cursor-pointer group"
                                                            title="لون مخصص"
                                                        >
                                                            <div
                                                                className={`w-7 h-7 rounded-full border-3 shadow-md transition-all duration-200 flex items-center justify-center ${
                                                                    useCustomColor
                                                                        ? 'border-primary-yellow scale-110'
                                                                        : 'border-gray-300 hover:border-primary-yellow hover:scale-105'
                                                                }`}
                                                                style={{ backgroundColor: customColor }}
                                                            >
                                                                <HiPlus className="text-white text-sm font-bold" />
                                                            </div>
                                                            <input
                                                                type="radio"
                                                                name="color"
                                                                checked={useCustomColor}
                                                                onChange={() => {
                                                                    setUseCustomColor(true);
                                                                    setSelectedColor(-1);
                                                                    setShowColorPicker(true);
                                                                }}
                                                                className="sr-only"
                                                                aria-label="لون مخصص"
                                                            />
                                                        </label>
                                                    </div>
                                                    
                                                    {/* عرض أسماء الألوان المختارة */}
                                                    <div className="text-sm text-gray-600">
                                                        {useCustomColor ? (
                                                            <span>اللون المختار: <span className="font-medium">لون مخصص</span></span>
                                                        ) : selectedColor >= 0 ? (
                                                            <span>اللون المختار: <span className="font-medium">{product.colorNames?.[selectedColor] || `اللون ${selectedColor + 1}`}</span></span>
                                                        ) : (
                                                            <span className="text-gray-400">اختر لون</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* اختيار الكمية */}
                                            <div className="space-y-3">
                                                <label className="block text-sm md:text-base font-medium text-gray-700">
                                                    الكمية
                                                </label>
                                                <div className="relative w-full inline-flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:border-primary-yellow focus-within:ring-2 focus-within:ring-primary-yellow focus-within:ring-opacity-20 transition-all duration-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const currentValue = formData.quantity || quantity;
                                                            if (currentValue > 1) {
                                                                handleFieldChange('quantity', currentValue - 1);
                                                                setQuantity(currentValue - 1);
                                                            }
                                                        }}
                                                        className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-r-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title="تقليل الكمية"
                                                        disabled={(formData.quantity || quantity) <= 1}
                                                    >
                                                        <HiMinus className="h-4 w-4" />
                                                    </button>
                                                    <div className="flex-1 text-center px-2">
                                                        <input
                                                            type="number"
                                                            value={formData.quantity || quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value) || 1;
                                                                handleFieldChange('quantity', value);
                                                                setQuantity(value);
                                                            }}
                                                            className="w-full border-0 bg-transparent focus:ring-0 focus:outline-none text-sm md:text-base font-medium text-gray-900 text-center"
                                                            min="1"
                                                            placeholder="1"
                                                            title="كمية المنتج"
                                                            required
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const currentValue = formData.quantity || quantity;
                                                            handleFieldChange('quantity', currentValue + 1);
                                                            setQuantity(currentValue + 1);
                                                        }}
                                                        className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 rounded-l-lg transition-colors duration-150"
                                                        title="زيادة الكمية"
                                                    >
                                                        <HiPlus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Color Picker للون المخصص */}
                                        {useCustomColor && (
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-sm font-medium text-gray-700">
                                                            اختر اللون المخصص
                                                        </label>
                                                        <span className="text-xs text-gray-500">
                                                            {customColor}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <input
                                                                type="color"
                                                                value={customColor}
                                                                onChange={(e) => handleCustomColorChange(e.target.value)}
                                                                className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
                                                                title="اختر اللون"
                                                            />
                                                            <div className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none"></div>
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            انقر لاختيار لون مخصص
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* اختيار اللون للفئات الأخرى */}
                                {!isCurtainsOrCabinets && !isSofaOrWood && product.colors && product.colors.length > 0 && (
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

                                {/* الحقول الأساسية للستائر والخزائن (الأبعاد فقط) */}
                                {isCurtainsOrCabinets && Object.keys(mainFields).length > 0 && (
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="space-y-6">
                                            {/* الصف الأول: وحدة القياس */}
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                                {Object.entries(mainFields).map(([fieldName, field]) => {
                                                    const fieldType = (field as any)?.type;
                                                    const isQuantity = fieldName === 'quantity' || (field as any)?.label?.includes('كمية');
                                                    
                                                    // تخطي حقل الكمية لأنه موجود مع الألوان
                                                    if (isQuantity) {
                                                        return null;
                                                    }
                                                    
                                                    return null;
                                                })}
                                                
                                                {/* حقل وحدة القياس */}
                                                {Object.entries(mainFields).some(([fieldName, field]) => {
                                                    const fieldType = (field as any)?.type;
                                                    return ['dimensions', 'dimensions_3d'].includes(fieldType) && (field as any)?.units;
                                                }) && (
                                                    <div className="lg:col-span-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm md:text-base font-medium text-gray-700">
                                                               وحدة القياس <span className="text-red-500">*</span>
                                                            </label>
                                                            <select
                                                                value={formData['measurement_unit'] || 'سم'}
                                                                onChange={(e) => handleUnitChange(e.target.value)}
                                                                className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base"
                                                                title="اختر وحدة القياس"
                                                            >
                                                                <option value="سم">سم</option>
                                                                <option value="م">م</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* حاسبة الأبعاد والأسعار - تظهر فقط للستائر والخزائن */}
                                            <div className="lg:col-span-2">
                                                <DimensionPriceCalculator
                                                    key={`${product.id}-${formData.measurement_unit}-${formData.quantity || quantity}`}
                                                    productId={product.id}
                                                    defaultWidth={dimensions.width}
                                                    defaultHeight={dimensions.height}
                                                    minWidth={formData.measurement_unit === 'م' ? 0.5 : 50}
                                                    maxWidth={formData.measurement_unit === 'م' ? 5 : 500}
                                                    minHeight={formData.measurement_unit === 'م' ? 0.5 : 50}
                                                    maxHeight={formData.measurement_unit === 'م' ? 4 : 400}
                                                    pricingMethod="area_based"
                                                    basePrice={product.price}
                                                    pricePerSqm={50}
                                                    unit={formData.measurement_unit || 'سم'}
                                                    quantity={formData.quantity || quantity || 1}
                                                    onPriceChange={handlePriceChange}
                                                    onDimensionsChange={handleDimensionsChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* زر عرض المزيد مع تحسينات UI/UX وأيقونة متحركة - فقط للستائر والخزائن */}
                                {isCurtainsOrCabinets && Object.keys(extraFields).length > 0 && (
                                    <div className="mb-4 flex justify-start">
                                        <button
                                            type="button"
                                            onClick={() => setShowMoreOptions((prev) => !prev)}
                                            className={
                                                `group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl text-base font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300`
                                            }
                                            style={{ boxShadow: '0 2px 12px 0 rgba(17, 24, 39, 0.15)' }}
                                        >
                                            <span className="flex items-center gap-1">
                                                {showMoreOptions ? 'إخفاء الخيارات' : 'عرض المزيد من الخيارات'}
                                            </span>
                                            {showMoreOptions ? (
                                                <HiChevronUp className="text-xl transition-transform duration-300 group-hover:-translate-y-1" />
                                            ) : (
                                                <HiChevronDown className="text-xl transition-transform duration-300 group-hover:translate-y-1" />
                                            )}
                                        </button>
                                    </div>
                                )}
                                <style>{`
                                    @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                                    .animate-spin-slow { animation: spin-slow 2.5s linear infinite; }
                                `}</style>

                                {/* خيارات التخصيص الديناميكية */}
                                {/* للستائر والخزائن: عرض الخيارات الإضافية عند الضغط على الزر */}
                                {isCurtainsOrCabinets && showMoreOptions && Object.keys(extraFields).length > 0 && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                        {Object.entries(extraFields).map(([fieldName, field]) => {
                                            const fieldType = (field as any)?.type;

                                            // الحقول التي تأخذ العرض الكامل (عمود واحد)
                                            const fullWidthFields = ['dimensions', 'dimensions_3d', 'file_upload'];

                                            // checkbox_multiple للخشبيات (product_options) يأخذ العرض الكامل
                                            const isProductOptionsField = fieldName === 'product_options' && fieldType === 'checkbox_multiple';

                                            if (fullWidthFields.includes(fieldType) || isProductOptionsField) {
                                                return (
                                                    <div key={fieldName} className="lg:col-span-2">
                                                        {renderField(fieldName, field)}
                                                    </div>
                                                );
                                            }

                                            // باقي الحقول تظهر في عمودين
                                            return (
                                                <div key={fieldName}>
                                                    {renderField(fieldName, field)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* للكنب والخشبيات: عرض جميع الخيارات مباشرة (بدون حاسبة الأبعاد) */}
                                {isSofaOrWood && Object.keys(customizationFields).length > 0 && (
                                    <div className="space-y-4 md:space-y-6">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                            خيارات التخصيص
                                        </h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                            {(() => {
                                                const fieldsArray = Object.entries(customizationFields).filter(([fieldName, field]) => {
                                                    const isQuantity = fieldName === 'quantity' || (field as any)?.label?.includes('كمية') || (field as any)?.label?.includes('Quantity');
                                                    return !isQuantity; // تخطي حقل الكمية
                                                });

                                                return fieldsArray.map(([fieldName, field], index) => {
                                                    const fieldType = (field as any)?.type;
                                                    const fieldLabel = (field as any)?.label;

                                                    // الحقول التي تأخذ العرض الكامل (عمود واحد)
                                                    const fullWidthFields = ['dimensions', 'dimensions_3d', 'file_upload'];

                                                    // checkbox_multiple للخشبيات (product_options) يأخذ العرض الكامل
                                                    const isProductOptionsField = fieldName === 'product_options' && fieldType === 'checkbox_multiple';

                                                    // الحقل الأخير يأخذ العرض الكامل
                                                    const isLastField = index === fieldsArray.length - 1;

                                                    if (fullWidthFields.includes(fieldType) || isProductOptionsField || isLastField) {
                                                        return (
                                                            <div key={fieldName} className="lg:col-span-2">
                                                                {renderField(fieldName, field)}
                                                            </div>
                                                        );
                                                    }

                                                    // باقي الحقول تظهر في عمودين
                                                    return (
                                                        <div key={fieldName}>
                                                            {renderField(fieldName, field)}
                                                        </div>
                                                    );
                                                });
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {/* للفئات الأخرى: عرض جميع الخيارات مباشرة (بدون حاسبة الأبعاد) */}
                                {!isCurtainsOrCabinets && !isSofaOrWood && Object.keys(customizationFields).length > 0 && (
                                    <div className="space-y-4 md:space-y-6">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                            خيارات التخصيص
                                        </h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                            {Object.entries(customizationFields).map(([fieldName, field]) => {
                                                const fieldType = (field as any)?.type;

                                                // الحقول التي تأخذ العرض الكامل (عمود واحد)
                                                const fullWidthFields = ['dimensions', 'dimensions_3d', 'file_upload'];

                                                // checkbox_multiple للخشبيات (product_options) يأخذ العرض الكامل
                                                const isProductOptionsField = fieldName === 'product_options' && fieldType === 'checkbox_multiple';

                                                if (fullWidthFields.includes(fieldType) || isProductOptionsField) {
                                                    return (
                                                        <div key={fieldName} className="lg:col-span-2">
                                                            {renderField(fieldName, field)}
                                                        </div>
                                                    );
                                                }

                                                // باقي الحقول تظهر في عمودين
                                                return (
                                                    <div key={fieldName}>
                                                        {renderField(fieldName, field)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

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
                    price: isCurtainsOrCabinets || isSofaOrWood ? calculatedPrice : (product.finalPrice || product.price),
                    image: product.image
                }}
                selectedOptions={{
                    ...(getSelectedColorInfo() && {
                        color: getSelectedColorInfo()!.color,
                        colorName: getSelectedColorInfo()!.colorName
                    }),
                    // تجميع البيانات المخصصة للعرض
                    customizations: Object.entries(customizationFields).reduce((acc, [fieldName, field]) => {
                        const fieldValue = formData[fieldName];
                        const fieldType = (field as any)?.type;
                        const fieldLabel = (field as any)?.label;

                        if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                            if (fieldType === 'checkbox_multiple' && Array.isArray(fieldValue) && fieldValue.length > 0) {
                                const options = (field as any)?.options || {};
                                acc[fieldName] = {
                                    type: fieldType,
                                    label: fieldLabel,
                                    values: fieldValue,
                                    displayValues: fieldValue.map(val => options[val]).filter(Boolean)
                                };
                            } else if (fieldType === 'select') {
                                const options = (field as any)?.options || {};
                                acc[fieldName] = {
                                    type: fieldType,
                                    label: fieldLabel,
                                    value: fieldValue,
                                    displayValue: options[fieldValue] || fieldValue
                                };
                            } else if (fieldType === 'dimensions') {
                                const width = formData[`${fieldName}_width`];
                                const height = formData[`${fieldName}_height`];
                                const unit = formData[`${fieldName}_unit`] || ((field as any)?.units?.[0]);

                                if (width || height) {
                                    acc[fieldName] = {
                                        type: fieldType,
                                        label: fieldLabel,
                                        width: width || 0,
                                        height: height || 0,
                                        unit: unit,
                                        displayValue: `${width || 0} × ${height || 0} ${unit || ''}`
                                    };
                                }
                            } else if (fieldType === 'dimensions_3d') {
                                const length = formData[`${fieldName}_length`];
                                const width = formData[`${fieldName}_width`];
                                const height = formData[`${fieldName}_height`];
                                const unit = formData[`${fieldName}_unit`] || ((field as any)?.units?.[0]);

                                if (length || width || height) {
                                    acc[fieldName] = {
                                        type: fieldType,
                                        label: fieldLabel,
                                        length: length || 0,
                                        width: width || 0,
                                        height: height || 0,
                                        unit: unit,
                                        displayValue: `${length || 0} × ${width || 0} × ${height || 0} ${unit || ''}`
                                    };
                                }
                            } else if (fieldType === 'file_upload' && uploadedFiles.length > 0) {
                                acc[fieldName] = {
                                    type: fieldType,
                                    label: fieldLabel,
                                    files: uploadedFiles.map(file => ({
                                        name: file.name,
                                        size: file.size,
                                        uuid: file.uuid,
                                        type: file.type || '',
                                        path: file.path || '',
                                        url: file.url || ''
                                    }))
                                };
                            } else if (fieldType === 'number') {
                                const units = (field as any)?.units;
                                acc[fieldName] = {
                                    type: fieldType,
                                    label: fieldLabel,
                                    value: fieldValue,
                                    displayValue: `${fieldValue}${units ? ` ${units.join('/')}` : ''}`
                                };
                            } else {
                                acc[fieldName] = {
                                    type: fieldType,
                                    label: fieldLabel,
                                    value: fieldValue,
                                    displayValue: fieldValue
                                };
                            }
                        }
                        return acc;
                    }, {} as Record<string, any>),
                    quantity: formData.quantity || quantity || 1,
                    uploadedFiles: uploadedFiles.map(file => ({
                        name: file.name,
                        path: file.path || '',
                        url: file.url || '',
                        size: file.size,
                        type: file.type || '',
                        uuid: file.uuid
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
