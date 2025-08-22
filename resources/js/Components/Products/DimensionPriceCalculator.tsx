import React, { useState, useEffect } from 'react';

interface DimensionPriceCalculatorProps {
    productId: number;
    defaultWidth?: number;
    defaultHeight?: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    basePrice?: number;
    discount?: number;
    unit?: 'سم' | 'م';
    quantity?: number;
    onPriceChange?: (price: number, area: number) => void;
    onDimensionsChange?: (width: number, height: number) => void;
}

const DimensionPriceCalculator: React.FC<DimensionPriceCalculatorProps> = ({
    productId,
    defaultWidth = 1,
    defaultHeight = 1,
    minWidth = 1,
    maxWidth = 20,
    minHeight = 1,
    maxHeight = 20,
    basePrice = 0,
    unit = 'م',
    quantity = 1,
    discount = 0,
    onPriceChange,
    onDimensionsChange
}) => {
    const [width, setWidth] = useState<number>(defaultWidth);
    const [height, setHeight] = useState<number>(defaultHeight);
    const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
    const [area, setArea] = useState<number>(0);
    const [errors, setErrors] = useState<{ width?: string, height?: string }>({});

    const getDiscountedPrice = (price: number) => {
        if (!discount || discount <= 0) return price;
        return price - (price * discount / 100);
    };

    const calculatePrice = (w: number, h: number) => {
        const newArea = calculateArea(w, h);
        setArea(newArea);
        const discountedBasePrice = getDiscountedPrice(basePrice);
        const baseArea = 1;
        if (w === 1 && h === 1) {
            const totalPrice = discountedBasePrice * quantity;
            setCalculatedPrice(totalPrice);
            onPriceChange && onPriceChange(totalPrice, newArea);
            return;
        }
        const additionalArea = newArea - baseArea;
        let pricePerSqm;
        if (unit === 'م') {
            pricePerSqm = discountedBasePrice;
        } else {
            pricePerSqm = discountedBasePrice;
        }
        const additionalCost = additionalArea * pricePerSqm;
        const totalPrice = (discountedBasePrice + additionalCost) * quantity;

        setCalculatedPrice(totalPrice);
        onPriceChange && onPriceChange(totalPrice, newArea);
    };

    const calculateArea = (w: number, h: number) => {
        if (unit === 'م') {
            return w * h;
        } else {
            return (w * h) / 10000;
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
    }, []);

    useEffect(() => {
        if (width === defaultWidth && height === defaultHeight) {
            return;
        }

        if (unit === 'م' && width > 10) {
            const newWidth = width / 100;
            const newHeight = height / 100;
            setWidth(newWidth);
            setHeight(newHeight);
            calculatePrice(newWidth, newHeight);
            onDimensionsChange && onDimensionsChange(newWidth, newHeight);
        } else if (unit === 'سم' && width < 10) {
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
                                step="0.5"
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
                                step="0.5"
                                value={width}
                                onChange={(e) => handleWidthChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                aria-label="عرض المنتج بالمتر"
                                title="عرض المنتج بالمتر"
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
                                step="0.5"
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
                                step="0.5"
                                value={height}
                                onChange={(e) => handleHeightChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                aria-label="ارتفاع المنتج بالمتر"
                                title="ارتفاع المنتج بالمتر"
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
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xl font-bold text-green-600">
                                        {calculatedPrice.toFixed(2)}
                                    </span>
                                    <img
                                        src="/images/sar-currency(black).svg"
                                        alt="ريال"
                                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                    />
                                </div>
                                <div className="text-xs text-gray-500">
                                    (الكمية: {quantity})
                                </div>
                                {width > 1 || height > 1 ? (
                                    <div className="flex items-center gap-0.5 text-xs text-blue-600">
                                            +
                                            <span>{(calculatedPrice - (getDiscountedPrice(basePrice) * quantity)).toFixed(2)}</span>
                                            <img
                                                src="/images/sar-currency(black).svg"
                                                alt="ريال"
                                                className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4"
                                            />
                                            <span>إضافية</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DimensionPriceCalculator;
