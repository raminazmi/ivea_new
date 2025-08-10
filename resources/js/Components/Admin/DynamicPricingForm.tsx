import React from 'react';

interface DynamicPricingFormProps {
    pricingMethod: 'fixed' | 'area_based' | 'size_based' | 'custom';
    setPricingMethod: (method: 'fixed' | 'area_based' | 'size_based' | 'custom') => void;
    basePrice: string;
    setBasePrice: (price: string) => void;
    pricePer_sqm: string;
    setPricePer_sqm: (price: string) => void;
    minPrice: string;
    setMinPrice: (price: string) => void;
    maxPrice: string;
    setMaxPrice: (price: string) => void;
    priceModifiers: any;
    setPriceModifiers: (modifiers: any) => void;
    errors: any;
}

const DynamicPricingForm: React.FC<DynamicPricingFormProps> = ({
    pricingMethod,
    setPricingMethod,
    basePrice,
    setBasePrice,
    pricePer_sqm,
    setPricePer_sqm,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    priceModifiers,
    setPriceModifiers,
    errors
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات التسعير الديناميكي</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        طريقة التسعير
                    </label>
                    <select
                        value={pricingMethod || 'fixed'}
                        onChange={(e) => setPricingMethod(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="fixed">تسعير ثابت</option>
                        <option value="area_based">تسعير حسب المساحة</option>
                        <option value="size_based">تسعير حسب الحجم</option>
                        <option value="custom">تسعير مخصص</option>
                    </select>
                    {errors.pricing_method && (
                        <p className="mt-1 text-sm text-red-600">{errors.pricing_method}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        السعر الأساسي (ر.س)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                    />
                    {errors.base_price && (
                        <p className="mt-1 text-sm text-red-600">{errors.base_price}</p>
                    )}
                </div>

                {(pricingMethod === 'area_based' || pricingMethod === 'custom') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            السعر للمتر المربع (ر.س)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={pricePer_sqm}
                            onChange={(e) => setPricePer_sqm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                        {errors.price_per_sqm && (
                            <p className="mt-1 text-sm text-red-600">{errors.price_per_sqm}</p>
                        )}
                    </div>
                )}

                {pricingMethod !== 'fixed' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            أدنى سعر (ر.س)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                        {errors.min_price && (
                            <p className="mt-1 text-sm text-red-600">{errors.min_price}</p>
                        )}
                    </div>
                )}

                {pricingMethod !== 'fixed' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            أعلى سعر (ر.س)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                        {errors.max_price && (
                            <p className="mt-1 text-sm text-red-600">{errors.max_price}</p>
                        )}
                    </div>
                )}

                {(pricingMethod === 'size_based' || pricingMethod === 'custom') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            عوامل التسعير
                        </label>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-gray-600 mb-2">
                                يمكنك تعديل هذه القيم في JSON format لتخصيص عوامل التسعير
                            </p>
                            <textarea
                                value={JSON.stringify(priceModifiers || {}, null, 2)}
                                onChange={(e) => {
                                    try {
                                        const parsed = JSON.parse(e.target.value);
                                        setPriceModifiers(parsed);
                                    } catch (error) {
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={6}
                                placeholder='{"small": {"multiplier": 1.0, "label": "صغير"}}'
                            />
                        </div>
                        {errors.price_modifiers && (
                            <p className="mt-1 text-sm text-red-600">{errors.price_modifiers}</p>
                        )}
                    </div>
                )}

                <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">معلومات مهمة:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        {pricingMethod === 'fixed' && (
                            <li>• التسعير الثابت: يعرض السعر المحدد بدون تغيير</li>
                        )}
                        {pricingMethod === 'area_based' && (
                            <li>• التسعير حسب المساحة: السعر الأساسي + (المساحة × السعر للمتر المربع)</li>
                        )}
                        {pricingMethod === 'size_based' && (
                            <li>• التسعير حسب الحجم: السعر الأساسي × عامل الحجم المختار</li>
                        )}
                        {pricingMethod === 'custom' && (
                            <li>• التسعير المخصص: يجمع بين التسعير حسب المساحة وعوامل إضافية</li>
                        )}
                        <li>• سيتم عرض "تبدأ الأسعار من" للمنتجات ذات التسعير المتغير</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DynamicPricingForm;
