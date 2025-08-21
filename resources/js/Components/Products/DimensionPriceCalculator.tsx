import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DimensionPriceCalculatorProps {
    productId: number;
    defaultWidth?: number;
    defaultHeight?: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    pricingMethod?: 'fixed' | 'area_based' | 'size_based' | 'custom';
    basePrice?: number;
    pricePerSqm?: number;
    discount?: number; // نسبة الخصم (مثلاً 10 تعني 10%)
    unit?: 'سم' | 'م';
    quantity?: number;
    onPriceChange?: (price: number, area: number) => void;
    onDimensionsChange?: (width: number, height: number) => void;
}

const DimensionPriceCalculator: React.FC<DimensionPriceCalculatorProps> = ({
    productId,
    defaultWidth = 150,
    defaultHeight = 200,
    minWidth = 100,
    maxWidth = 500,
    minHeight = 100,
    maxHeight = 400,
    pricingMethod = 'area_based',
    basePrice = 0,
    pricePerSqm = 50,
    unit = 'سم',
    quantity = 1,
    discount = 0,
    onPriceChange,
    onDimensionsChange
}) => {
    const [width, setWidth] = useState<number>(defaultWidth);
    const [height, setHeight] = useState<number>(defaultHeight);
    // حساب السعر بعد الخصم
    const getDiscountedPrice = (price: number) => {
        if (!discount || discount <= 0) return price;
        return price - (price * discount / 100);
    };

    const [calculatedPrice, setCalculatedPrice] = useState<number>(getDiscountedPrice(basePrice) * quantity);
    const [area, setArea] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ width?: string, height?: string }>({});

    const calculateArea = (w: number, h: number) => {
        if (unit === 'م') {
            // إذا كانت الوحدة متر، المساحة = العرض × الارتفاع
            return w * h;
        } else {
            // إذا كانت الوحدة سم، تحويل إلى متر مربع
            return (w * h) / 10000;
        }
    };

    const calculatePrice = async (w: number, h: number) => {
        const newArea = calculateArea(w, h);
        setArea(newArea);

        // السعر الأساسي بعد الخصم
        const discountedBase = getDiscountedPrice(basePrice);
        const discountedPerSqm = getDiscountedPrice(pricePerSqm);

        if (pricingMethod === 'fixed') {
            const totalPrice = discountedBase * quantity;
            setCalculatedPrice(totalPrice);
            onPriceChange && onPriceChange(totalPrice, newArea);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`/products/${productId}/calculate-price`, {
                width: w,
                height: h,
                area: newArea,
                pricing_method: pricingMethod
            });
            // نفترض أن الباكند يعيد السعر بعد الخصم، إذا لم يكن كذلك أضف الخصم هنا:
            let unitPrice = response.data.price;
            if (discount && discount > 0) {
                unitPrice = getDiscountedPrice(unitPrice);
            }
            const totalPrice = unitPrice * quantity;
            setCalculatedPrice(totalPrice);
            onPriceChange && onPriceChange(totalPrice, newArea);
        } catch (error) {
            console.error('خطأ في حساب السعر:', error);
            // Fallback: حساب محلي مع خصم
            let unitPrice = discountedBase;
            if (pricingMethod === 'area_based') {
                // سعر المتر المربع بعد الخصم
                unitPrice = discountedPerSqm * newArea;
            } else if (pricingMethod === 'size_based') {
                // منطق إضافي إذا كان هناك طريقة أخرى
                unitPrice = discountedBase; // عدل حسب الحاجة
            }
            const totalPrice = unitPrice * quantity;
            setCalculatedPrice(totalPrice);
            onPriceChange && onPriceChange(totalPrice, newArea);
        } finally {
            setLoading(false);
        }
    };

    const validateDimensions = (w: number, h: number) => {
        const newErrors: { width?: string, height?: string } = {};

        if (w < minWidth) {
            newErrors.width = `العرض يجب أن يكون على الأقل ${minWidth} ${unit}`;
        } else if (w > maxWidth) {
            newErrors.width = `العرض يجب ألا يزيد عن ${maxWidth} ${unit}`;
        }

        if (h < minHeight) {
            newErrors.height = `الارتفاع يجب أن يكون على الأقل ${minHeight} ${unit}`;
        } else if (h > maxHeight) {
            newErrors.height = `الارتفاع يجب ألا يزيد عن ${maxHeight} ${unit}`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleWidthChange = (newWidth: number) => {
        setWidth(newWidth);
        if (validateDimensions(newWidth, height)) {
            calculatePrice(newWidth, height);
            onDimensionsChange && onDimensionsChange(newWidth, height);
        }
    };

    const handleHeightChange = (newHeight: number) => {
        setHeight(newHeight);
        if (validateDimensions(width, newHeight)) {
            calculatePrice(width, newHeight);
            onDimensionsChange && onDimensionsChange(width, newHeight);
        }
    };
    useEffect(() => {
        calculatePrice(width, height);
        // eslint-disable-next-line
    }, []);

    // تحديث القيم عند تغيير الوحدة
    useEffect(() => {
        // تجنب التحديث عند التحميل الأولي
        if (width === defaultWidth && height === defaultHeight) {
            return;
        }

        if (unit === 'م' && width > 10) {
            // تحويل من سم إلى م (إذا كانت القيم كبيرة، فهي بالسم)
            const newWidth = width / 100;
            const newHeight = height / 100;
            setWidth(newWidth);
            setHeight(newHeight);
            calculatePrice(newWidth, newHeight);
            onDimensionsChange && onDimensionsChange(newWidth, newHeight);
        } else if (unit === 'سم' && width < 10) {
            // تحويل من م إلى سم (إذا كانت القيم صغيرة، فهي بالمتر)
            const newWidth = width * 100;
            const newHeight = height * 100;
            setWidth(newWidth);
            setHeight(newHeight);
            calculatePrice(newWidth, newHeight);
            onDimensionsChange && onDimensionsChange(newWidth, newHeight);
        }
    }, [unit]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                حاسبة الأبعاد والأسعار
            </h3>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            العرض ({unit})
                        </label>
                        <div className="space-y-2">
                            <input
                                type="range"
                                min={minWidth}
                                max={maxWidth}
                                step="1"
                                value={width}
                                onChange={(e) => handleWidthChange(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                                aria-label="عرض المنتج"
                                title="عرض المنتج"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{minWidth} {unit}</span>
                                <span>{maxWidth} {unit}</span>
                            </div>
                            <input
                                type="number"
                                min={minWidth}
                                max={maxWidth}
                                value={width}
                                onChange={(e) => handleWidthChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                aria-label="عرض المنتج بالسم"
                                title="عرض المنتج بالسم"
                                placeholder="أدخل العرض"
                            />
                            {errors.width && (
                                <p className="text-sm text-red-600">{errors.width}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            الارتفاع ({unit})
                        </label>
                        <div className="space-y-2">
                            <input
                                type="range"
                                min={minHeight}
                                max={maxHeight}
                                step="1"
                                value={height}
                                onChange={(e) => handleHeightChange(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                                aria-label="ارتفاع المنتج"
                                title="ارتفاع المنتج"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{minHeight} {unit}</span>
                                <span>{maxHeight} {unit}</span>
                            </div>
                            <input
                                type="number"
                                min={minHeight}
                                max={maxHeight}
                                value={height}
                                onChange={(e) => handleHeightChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                aria-label="ارتفاع المنتج بالسم"
                                title="ارتفاع المنتج بالسم"
                                placeholder="أدخل الارتفاع"
                            />
                            {errors.height && (
                                <p className="text-sm text-red-600">{errors.height}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">المساحة</div>
                            <div className="text-lg font-semibold text-blue-600">
                                {area.toFixed(2)} م²
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">الأبعاد</div>
                            <div className="text-lg font-semibold text-gray-800">
                                {width} × {height} {unit}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">السعر للأبعاد المحددة</div>
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="h-6 bg-gray-300 rounded w-20 mx-auto"></div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-xl font-bold text-green-600">
                                            {calculatedPrice.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-gray-600">ر.س</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        (الكمية: {quantity})
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DimensionPriceCalculator;
