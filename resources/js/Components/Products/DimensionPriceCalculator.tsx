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
    onPriceChange?: (price: number, area: number) => void;
    onDimensionsChange?: (width: number, height: number) => void;
}

const DimensionPriceCalculator: React.FC<DimensionPriceCalculatorProps> = ({
    productId,
    defaultWidth = 150,
    defaultHeight = 200,
    minWidth = 50,
    maxWidth = 500,
    minHeight = 50,
    maxHeight = 400,
    pricingMethod = 'area_based',
    basePrice = 0,
    pricePerSqm = 50,
    onPriceChange,
    onDimensionsChange
}) => {
    const [width, setWidth] = useState<number>(defaultWidth);
    const [height, setHeight] = useState<number>(defaultHeight);
    const [calculatedPrice, setCalculatedPrice] = useState<number>(basePrice);
    const [area, setArea] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ width?: string, height?: string }>({});

    const calculateArea = (w: number, h: number) => {
        return (w * h) / 10000;
    };

    const calculatePrice = async (w: number, h: number) => {
        const newArea = calculateArea(w, h);
        setArea(newArea);

        if (pricingMethod === 'fixed') {
            setCalculatedPrice(basePrice);
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

            const price = response.data.price;
            setCalculatedPrice(price);
            onPriceChange && onPriceChange(price, newArea);
        } catch (error) {
            console.error('خطأ في حساب السعر:', error);
            const fallbackPrice = basePrice + (newArea * pricePerSqm);
            setCalculatedPrice(fallbackPrice);
            onPriceChange && onPriceChange(fallbackPrice, newArea);
        } finally {
            setLoading(false);
        }
    };

    const validateDimensions = (w: number, h: number) => {
        const newErrors: { width?: string, height?: string } = {};

        if (w < minWidth) {
            newErrors.width = `العرض يجب أن يكون على الأقل ${minWidth} سم`;
        } else if (w > maxWidth) {
            newErrors.width = `العرض يجب ألا يزيد عن ${maxWidth} سم`;
        }

        if (h < minHeight) {
            newErrors.height = `الارتفاع يجب أن يكون على الأقل ${minHeight} سم`;
        } else if (h > maxHeight) {
            newErrors.height = `الارتفاع يجب ألا يزيد عن ${maxHeight} سم`;
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
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                حاسبة الأبعاد والأسعار
            </h3>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            العرض (سم)
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
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{minWidth} سم</span>
                                <span>{maxWidth} سم</span>
                            </div>
                            <input
                                type="number"
                                min={minWidth}
                                max={maxWidth}
                                value={width}
                                onChange={(e) => handleWidthChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.width && (
                                <p className="text-sm text-red-600">{errors.width}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            الارتفاع (سم)
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
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{minHeight} سم</span>
                                <span>{maxHeight} سم</span>
                            </div>
                            <input
                                type="number"
                                min={minHeight}
                                max={maxHeight}
                                value={height}
                                onChange={(e) => handleHeightChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                {width} × {height} سم
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">السعر المحسوب</div>
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="h-6 bg-gray-300 rounded w-20 mx-auto"></div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xl font-bold text-green-600">
                                        {calculatedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-600">ر.س</span>
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
