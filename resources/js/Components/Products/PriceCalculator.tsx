import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceCalculatorProps {
    productId: number;
    pricingMethod?: 'fixed' | 'area_based' | 'size_based' | 'custom';
    basePrice?: number;
    pricesFrom?: number;
    priceRange?: {
        min: number;
        max: number;
    };
    onPriceChange?: (price: number) => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
    productId,
    pricingMethod = 'fixed',
    basePrice = 0,
    pricesFrom,
    priceRange,
    onPriceChange
}) => {
    const [area, setArea] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<string>('medium');
    const [customModifier, setCustomModifier] = useState<string>('standard');
    const [calculatedPrice, setCalculatedPrice] = useState<number>(pricesFrom || basePrice);
    const [loading, setLoading] = useState(false);

    const calculatePrice = async () => {
        if (pricingMethod === 'fixed') {
            setCalculatedPrice(basePrice);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`/products/${productId}/calculate-price`, {
                area: pricingMethod === 'area_based' || pricingMethod === 'custom' ? area : null,
                size: pricingMethod === 'size_based' || pricingMethod === 'custom' ? selectedSize : null,
                modifier: pricingMethod === 'custom' ? customModifier : null
            });

            const price = response.data.price;
            setCalculatedPrice(price);
            onPriceChange && onPriceChange(price);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        calculatePrice();
    }, [area, selectedSize, customModifier, pricingMethod]);

    if (pricingMethod === 'fixed') {
        return (
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-700">السعر:</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                            {basePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-600">ر.س</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">حاسبة الأسعار</h3>

            <div className="space-y-4">
                {(pricingMethod === 'area_based' || pricingMethod === 'custom') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            المساحة (متر مربع)
                        </label>
                        <input
                            type="number"
                            min="1"
                            step="0.1"
                            value={area}
                            onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                )}

                {(pricingMethod === 'size_based' || pricingMethod === 'custom') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            الحجم
                        </label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="small">صغير</option>
                            <option value="medium">متوسط</option>
                            <option value="large">كبير</option>
                            <option value="xlarge">كبير جداً</option>
                        </select>
                    </div>
                )}

                {pricingMethod === 'custom' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            نوع المنتج
                        </label>
                        <select
                            value={customModifier}
                            onChange={(e) => setCustomModifier(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="basic">أساسي</option>
                            <option value="standard">عادي</option>
                            <option value="premium">بريميوم</option>
                        </select>
                    </div>
                )}

                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-700">السعر المحسوب:</span>
                        <div className="flex items-center gap-2">
                            {loading ? (
                                <div className="animate-pulse flex items-center">
                                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                                </div>
                            ) : (
                                <>
                                    <span className="text-2xl font-bold text-green-600">
                                        {calculatedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-600">ر.س</span>
                                </>
                            )}
                        </div>
                    </div>

                    {priceRange && (
                        <div className="mt-2 text-sm text-gray-600">
                            النطاق السعري: {priceRange.min.toFixed(2)} - {priceRange.max.toFixed(2)} ر.س
                        </div>
                    )}
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        💡 الأسعار قابلة للتغيير حسب المواصفات والمتطلبات الخاصة
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PriceCalculator;
