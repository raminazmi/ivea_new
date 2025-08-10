import React from 'react';
import { HiX } from 'react-icons/hi';

interface ActiveFiltersProps {
    filters: any;
    onRemoveFilter: (filterType: string, value?: string) => void;
    onClearAll: () => void;
    categories?: any[];
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemoveFilter, onClearAll, categories = [] }) => {
    const hasActiveFilters = () => {
        return filters.search ||
            filters.category ||
            filters.colors?.length > 0 ||
            filters.size?.length > 0 ||
            filters.opening_method?.length > 0 ||
            filters.rail_type?.length > 0 ||
            filters.lining?.length > 0 ||
            filters.brand?.length > 0 ||
            filters.collection?.length > 0 ||
            filters.min_price ||
            filters.max_price ||
            filters.in_stock;
    };

    if (!hasActiveFilters()) {
        return null;
    }

    // Color names mapping
    const colorNames: { [key: string]: string } = {
        '#FFFFFF': 'أبيض',
        '#000000': 'أسود',
        '#808080': 'رمادي',
        '#0000FF': 'أزرق',
        '#FF0000': 'أحمر',
        '#008000': 'أخضر',
        '#FFFF00': 'أصفر',
        '#A52A2A': 'بني',
        '#FFA500': 'برتقالي',
        '#FFC0CB': 'وردي',
        '#800080': 'بنفسجي',
        '#00FFFF': 'سماوي',
        '#FFD700': 'ذهبي',
        '#32CD32': 'أخضر فاتح',
        '#FF69B4': 'وردي غامق'
    };

    const sizeNames: { [key: string]: string } = {
        'small': 'صغير',
        'medium': 'متوسط',
        'large': 'كبير',
        'custom': 'مخصص'
    };

    const getFilterLabel = (type: string, value: any) => {
        switch (type) {
            case 'search':
                return `البحث: "${value}"`;
            case 'category':
                const category = categories.find(cat => cat.id.toString() === value);
                return `الفئة: ${category?.name || value}`;
            case 'colors':
                return `اللون: ${colorNames[value] || value}`;
            case 'size':
                return `المقاس: ${sizeNames[value] || value}`;
            case 'opening_method':
                return `طريقة الفتح: ${value}`;
            case 'rail_type':
                return `نوع السكة: ${value}`;
            case 'lining':
                return `البطانة: ${value}`;
            case 'brand':
                return `الماركة: ${value}`;
            case 'collection':
                return `المجموعة: ${value}`;
            case 'min_price':
                return `السعر من: ${value} ريال`;
            case 'max_price':
                return `السعر إلى: ${value} ريال`;
            case 'in_stock':
                return value === 'true' ? 'متوفر فقط' : 'غير متوفر فقط';
            default:
                return value;
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">الفلاتر النشطة</h4>
                <button
                    onClick={onClearAll}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                    title="مسح جميع الفلاتر"
                >
                    <HiX className="w-4 h-4" />
                    مسح الكل
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {filters.search && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {getFilterLabel('search', filters.search)}
                        <button
                            onClick={() => onRemoveFilter('search')}
                            className="hover:text-blue-600"
                            title="إزالة فلتر البحث"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                )}

                {filters.category && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {getFilterLabel('category', filters.category)}
                        <button
                            onClick={() => onRemoveFilter('category')}
                            className="hover:text-green-600"
                            title="إزالة فلتر الفئة"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                )}

                {filters.colors?.map((color: string, index: number) => (
                    <span key={`color-${index}`} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                            ></div>
                            {getFilterLabel('colors', color)}
                        </div>
                        <button
                            onClick={() => onRemoveFilter('colors', color)}
                            className="hover:text-purple-600"
                            title="إزالة فلتر اللون"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                {filters.size?.map((size: string, index: number) => (
                    <span key={`size-${index}`} className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                        {getFilterLabel('size', size)}
                        <button
                            onClick={() => onRemoveFilter('size', size)}
                            className="hover:text-orange-600"
                            title="إزالة فلتر المقاس"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                {filters.opening_method?.map((method: string, index: number) => (
                    <span key={`opening-${index}`} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {getFilterLabel('opening_method', method)}
                        <button
                            onClick={() => onRemoveFilter('opening_method', method)}
                            className="hover:text-indigo-600"
                            title="إزالة فلتر طريقة الفتح"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                {filters.rail_type?.map((type: string, index: number) => (
                    <span key={`rail-${index}`} className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                        {getFilterLabel('rail_type', type)}
                        <button
                            onClick={() => onRemoveFilter('rail_type', type)}
                            className="hover:text-teal-600"
                            title="إزالة فلتر نوع السكة"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                {filters.lining?.map((lining: string, index: number) => (
                    <span key={`lining-${index}`} className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                        {getFilterLabel('lining', lining)}
                        <button
                            onClick={() => onRemoveFilter('lining', lining)}
                            className="hover:text-pink-600"
                            title="إزالة فلتر البطانة"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                {filters.brand?.map((brand: string, index: number) => (
                    <span key={`brand-${index}`} className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {getFilterLabel('brand', brand)}
                        <button
                            onClick={() => onRemoveFilter('brand', brand)}
                            className="hover:text-yellow-600"
                            title="إزالة فلتر الماركة"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                {filters.collection?.map((collection: string, index: number) => (
                    <span key={`collection-${index}`} className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {getFilterLabel('collection', collection)}
                        <button
                            onClick={() => onRemoveFilter('collection', collection)}
                            className="hover:text-red-600"
                            title="إزالة فلتر المجموعة"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                {filters.min_price && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {getFilterLabel('min_price', filters.min_price)}
                        <button
                            onClick={() => onRemoveFilter('min_price')}
                            className="hover:text-emerald-600"
                            title="إزالة فلتر السعر الأدنى"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                )}

                {filters.max_price && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {getFilterLabel('max_price', filters.max_price)}
                        <button
                            onClick={() => onRemoveFilter('max_price')}
                            className="hover:text-emerald-600"
                            title="إزالة فلتر السعر الأقصى"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                )}

                {filters.in_stock && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {getFilterLabel('in_stock', filters.in_stock)}
                        <button
                            onClick={() => onRemoveFilter('in_stock')}
                            className="hover:text-gray-600"
                            title="إزالة فلتر التوفر"
                        >
                            <HiX className="w-3 h-3" />
                        </button>
                    </span>
                )}
            </div>
        </div>
    );
};

export default ActiveFilters; 