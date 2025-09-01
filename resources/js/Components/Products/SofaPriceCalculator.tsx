import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { HiCalculator, HiCog } from 'react-icons/hi';

interface SofaPriceCalculatorProps {
    product: {
        id: number;
        name: string;
        price: number;
        finalPrice: number;
        category?: {
            name: string;
        };
    };
    className?: string;
}

const SofaPriceCalculator: React.FC<SofaPriceCalculatorProps> = ({ product, className = "" }) => {
    const [calculatedPrice, setCalculatedPrice] = useState<number>(product.finalPrice || product.price);
    const [roomType, setRoomType] = useState<string>('majlis');
    const [sofaType, setSofaType] = useState<string>('single');
    const [fabricType, setFabricType] = useState<string>('velvet');
    const [cushionOption, setCushionOption] = useState<string>('high_density_foam');
    const [quantity, setQuantity] = useState<number>(1);

    // معاملات السعر حسب نوع المكان
    const roomTypeMultipliers = {
        majlis: 1.0,        // مجلس - السعر الأساسي
        bedroom: 0.9,       // غرفة نوم - خصم 10%
        living_room: 1.1,   // غرفة جلوس - زيادة 10%
        guest_room: 1.2,    // غرفة ضيوف - زيادة 20%
        hall: 1.3           // صالة - زيادة 30%
    };

    // معاملات السعر حسب نوع الكنب
    const sofaTypeMultipliers = {
        single: 1.0,        // فردية
        double: 1.8,        // ثنائية
        triple: 2.5,        // ثلاثية
        l_shape: 3.2        // زاوية
    };

    // معاملات السعر حسب نوع القماش
    const fabricTypeMultipliers = {
        velvet: 1.0,           // مخمل - السعر الأساسي
        cotton: 0.9,           // كتان - خصم 10%
        chenille: 1.1,         // شانل - زيادة 10%
        linen: 1.2,            // لينين - زيادة 20%
        microfiber: 0.8,       // ميكروفيبر - خصم 20%
        natural_leather: 2.0,  // جلد طبيعي - ضعف السعر
        synthetic_leather: 1.5 // جلد صناعي - زيادة 50%
    };

    // معاملات السعر حسب نوع الحشو
    const cushionMultipliers = {
        high_density_foam: 1.0,  // إسفنج عالي الكثافة - السعر الأساسي
        fiber_foam: 1.1,         // فيبر + إسفنج - زيادة 10%
        feather: 1.3,            // ريش - زيادة 30%
        memory_foam: 1.4         // ميموري فوم - زيادة 40%
    };

    useEffect(() => {
        calculatePrice();
    }, [roomType, sofaType, fabricType, cushionOption, quantity]);

    const calculatePrice = () => {
        const basePrice = product.finalPrice || product.price;
        
        const roomMultiplier = roomTypeMultipliers[roomType as keyof typeof roomTypeMultipliers] || 1.0;
        const sofaMultiplier = sofaTypeMultipliers[sofaType as keyof typeof sofaTypeMultipliers] || 1.0;
        const fabricMultiplier = fabricTypeMultipliers[fabricType as keyof typeof fabricTypeMultipliers] || 1.0;
        const cushionMultiplier = cushionMultipliers[cushionOption as keyof typeof cushionMultipliers] || 1.0;

        const totalMultiplier = roomMultiplier * sofaMultiplier * fabricMultiplier * cushionMultiplier;
        const finalPrice = basePrice * totalMultiplier * quantity;

        setCalculatedPrice(finalPrice);
    };

    const getRoomTypeLabel = (value: string) => {
        const labels = {
            majlis: 'مجلس',
            bedroom: 'غرفة نوم',
            living_room: 'غرفة جلوس',
            guest_room: 'غرفة ضيوف',
            hall: 'صالة'
        };
        return labels[value as keyof typeof labels] || value;
    };

    const getSofaTypeLabel = (value: string) => {
        const labels = {
            single: 'كنبة فردية',
            double: 'كنبة ثنائية',
            triple: 'كنبة ثلاثية',
            l_shape: 'زاوية (L Shape)'
        };
        return labels[value as keyof typeof labels] || value;
    };

    const getFabricTypeLabel = (value: string) => {
        const labels = {
            velvet: 'مخمل',
            cotton: 'كتان',
            chenille: 'شانل',
            linen: 'لينين',
            microfiber: 'ميكروفيبر',
            natural_leather: 'جلد طبيعي',
            synthetic_leather: 'جلد صناعي'
        };
        return labels[value as keyof typeof labels] || value;
    };

    const getCushionLabel = (value: string) => {
        const labels = {
            high_density_foam: 'إسفنج عالي الكثافة',
            fiber_foam: 'فيبر + إسفنج',
            feather: 'ريش',
            memory_foam: 'ميموري فوم'
        };
        return labels[value as keyof typeof labels] || value;
    };

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <HiCalculator className="text-primary-yellow" />
                    حساب السعر
                </h3>
                <Link
                    href={`/products/${product.id}/options`}
                    className="inline-flex items-center gap-2 bg-primary-yellow text-primary-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors text-sm"
                >
                    <HiCog />
                    خيارات المنتج
                </Link>
            </div>

            <div className="space-y-4">
                {/* نوع المكان */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع المكان <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                        title="اختر نوع المكان"
                    >
                        <option value="majlis">مجلس</option>
                        <option value="bedroom">غرفة نوم</option>
                        <option value="living_room">غرفة جلوس</option>
                        <option value="guest_room">غرفة ضيوف</option>
                        <option value="hall">صالة</option>
                    </select>
                </div>

                {/* نوع الكنب */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع الكنب <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={sofaType}
                        onChange={(e) => setSofaType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                        title="اختر نوع الكنب"
                    >
                        <option value="single">كنبة فردية</option>
                        <option value="double">كنبة ثنائية</option>
                        <option value="triple">كنبة ثلاثية</option>
                        <option value="l_shape">زاوية (L Shape)</option>
                    </select>
                </div>

                {/* نوع القماش */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع القماش <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={fabricType}
                        onChange={(e) => setFabricType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                        title="اختر نوع القماش"
                    >
                        <option value="velvet">مخمل</option>
                        <option value="cotton">كتان</option>
                        <option value="chenille">شانل</option>
                        <option value="linen">لينين</option>
                        <option value="microfiber">ميكروفيبر</option>
                        <option value="natural_leather">جلد طبيعي</option>
                        <option value="synthetic_leather">جلد صناعي</option>
                    </select>
                </div>

                {/* خيار الحشو */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        خيار الحشو <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={cushionOption}
                        onChange={(e) => setCushionOption(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                        title="اختر نوع الحشو"
                    >
                        <option value="high_density_foam">إسفنج عالي الكثافة</option>
                        <option value="fiber_foam">فيبر + إسفنج</option>
                        <option value="feather">ريش</option>
                        <option value="memory_foam">ميموري فوم</option>
                    </select>
                </div>

                {/* الكمية */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        الكمية <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            -
                        </button>
                        <span className="flex-1 text-center py-2">{quantity}</span>
                        <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* عرض السعر المحسوب */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">السعر المحسوب:</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                            {calculatedPrice.toFixed(2)}
                        </span>
                        <img
                            src="/images/sar-currency(black).svg"
                            alt="SAR"
                            className="w-6 h-6"
                        />
                    </div>
                </div>
                
                {/* تفاصيل الحساب */}
                <div className="mt-3 text-xs text-gray-500 space-y-1">
                    <div>نوع المكان: {getRoomTypeLabel(roomType)}</div>
                    <div>نوع الكنب: {getSofaTypeLabel(sofaType)}</div>
                    <div>نوع القماش: {getFabricTypeLabel(fabricType)}</div>
                    <div>نوع الحشو: {getCushionLabel(cushionOption)}</div>
                    <div>الكمية: {quantity}</div>
                </div>
            </div>
        </div>
    );
};

export default SofaPriceCalculator;
