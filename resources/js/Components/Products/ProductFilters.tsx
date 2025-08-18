import React, { useState, useEffect } from 'react';
import { HiSearch, HiChevronDown, HiChevronUp, HiX } from 'react-icons/hi';

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count?: number;
    parent_id?: number;
}

interface ProductFiltersProps {
    onFilterChange: (filters: any) => void;
    activeTab?: string;
    categories?: Category[];
    filterOptions?: any;
    currentFilters?: any;
    activeCategory?: string; // Currently selected main category
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    onFilterChange,
    activeTab = 'all',
    categories = [],
    filterOptions = {},
    currentFilters = {},
    activeCategory = 'all'
}) => {
    const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(currentFilters.category ? [currentFilters.category] : []);
    const [selectedColors, setSelectedColors] = useState<string[]>(currentFilters.colors || []);
    const [selectedSizes, setSelectedSizes] = useState<string[]>(currentFilters.size || []);
    const [selectedOpeningMethods, setSelectedOpeningMethods] = useState<string[]>(currentFilters.opening_method || []);
    const [selectedRailTypes, setSelectedRailTypes] = useState<string[]>(currentFilters.rail_type || []);
    const [selectedLinings, setSelectedLinings] = useState<string[]>(currentFilters.lining || []);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(currentFilters.brand || []);
    const [selectedCollections, setSelectedCollections] = useState<string[]>(currentFilters.collection || []);
    const [priceRange, setPriceRange] = useState({
        min: currentFilters.min_price || filterOptions.priceRange?.min || 0,
        max: currentFilters.max_price || filterOptions.priceRange?.max || 1000
    });
    const [inStock, setInStock] = useState<string>(currentFilters.in_stock || 'all');

    const [expandedSections, setExpandedSections] = useState({
        category: true,
        color: false,
        size: false,
        openingMethod: false,
        railType: false,
        lining: false,
        brand: false,
        collection: false,
        price: false
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const tabs = [
        { id: 'all', label: 'الكل' },
        { id: 'new', label: 'جديد' },
        { id: 'offers', label: 'عروض' },
        { id: 'bestsellers', label: 'الأكثر مبيعاً' },
    ];

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

    const handleTabChange = (tab: string) => {
        onFilterChange({ tab, page: 1 });
    };

    const handleSearch = () => {
        const filters = {
            search: searchTerm,
            page: 1
        };
        onFilterChange(filters);
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleFilterChange = () => {
        const filters: any = {
            page: 1
        };

        if (searchTerm) filters.search = searchTerm;
        if (selectedCategories.length > 0) filters.category = selectedCategories[0]; // Use slug instead of ID
        if (selectedColors.length > 0) filters.colors = selectedColors;
        if (selectedSizes.length > 0) filters.size = selectedSizes;
        if (selectedOpeningMethods.length > 0) filters.opening_method = selectedOpeningMethods;
        if (selectedRailTypes.length > 0) filters.rail_type = selectedRailTypes;
        if (selectedLinings.length > 0) filters.lining = selectedLinings;
        if (selectedBrands.length > 0) filters.brand = selectedBrands;
        if (selectedCollections.length > 0) filters.collection = selectedCollections;
        if (priceRange.min > filterOptions.priceRange?.min) filters.min_price = priceRange.min;
        if (priceRange.max < filterOptions.priceRange?.max) filters.max_price = priceRange.max;
        if (inStock !== 'all') filters.in_stock = inStock;

        onFilterChange(filters);
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedOpeningMethods([]);
        setSelectedRailTypes([]);
        setSelectedLinings([]);
        setSelectedBrands([]);
        setSelectedCollections([]);
        setPriceRange({
            min: filterOptions.priceRange?.min || 0,
            max: filterOptions.priceRange?.max || 1000
        });
        setInStock('all');
        onFilterChange({ page: 1 });
    };

    const hasActiveFilters = () => {
        return searchTerm ||
            selectedCategories.length > 0 ||
            selectedColors.length > 0 ||
            selectedSizes.length > 0 ||
            selectedOpeningMethods.length > 0 ||
            selectedRailTypes.length > 0 ||
            selectedLinings.length > 0 ||
            selectedBrands.length > 0 ||
            selectedCollections.length > 0 ||
            priceRange.min > (filterOptions.priceRange?.min || 0) ||
            priceRange.max < (filterOptions.priceRange?.max || 1000) ||
            inStock !== 'all';
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleFilterChange();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [
        selectedCategories, selectedColors, selectedSizes, selectedOpeningMethods,
        selectedRailTypes, selectedLinings, selectedBrands, selectedCollections,
        priceRange, inStock
    ]);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">تصفية المنتجات</h3>
                {hasActiveFilters() && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                        <HiX className="w-4 h-4" />
                        مسح الكل
                    </button>
                )}
            </div>

            <div className="mb-4 sm:mb-6">
                <div className="relative">
                    <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                        type="text"
                        placeholder="البحث في المنتجات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                        className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm sm:text-base"
                    />
                </div>
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    الفئات الفرعية
                    {expandedSections.category ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.category && (
                    <div className="space-y-3">
                        {activeCategory === 'all' ? (
                            // Show all subcategories grouped by main category
                            <div className="space-y-4">
                                <label className="flex items-center px-3 py-2 cursor-pointer bg-gray-50 rounded-lg">
                                    <input
                                        type="radio"
                                        name="subcategory"
                                        checked={selectedCategories.length === 0}
                                        onChange={() => setSelectedCategories([])}
                                        className="w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                                    />
                                    <span className="text-gray-700 font-medium">جميع الفئات</span>
                                </label>

                                {categories.filter(cat => !cat.parent_id).map((mainCategory: Category) => {
                                    const subcategories = categories.filter(sub => sub.parent_id === mainCategory.id);
                                    if (subcategories.length === 0) return null;

                                    return (
                                        <div key={mainCategory.id} className="border border-gray-200 rounded-lg p-3">
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{mainCategory.name}</h4>
                                            <div className="space-y-1">
                                                {subcategories.map((subCategory: Category) => (
                                                    <label key={subCategory.id} className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-50 rounded">
                                                        <input
                                                            type="radio"
                                                            name="subcategory"
                                                            checked={selectedCategories.includes(subCategory.slug)}
                                                            onChange={() => setSelectedCategories([subCategory.slug])}
                                                            className="w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                                                        />
                                                        <span className="text-gray-700 text-sm flex-1">{subCategory.name}</span>
                                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                            {subCategory.products_count || 0}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            // Show subcategories of active main category
                            (() => {
                                const mainCategory = categories.find(cat => cat.slug === activeCategory && !cat.parent_id);
                                if (!mainCategory) return (
                                    <p className="text-gray-500 text-center py-4">لا توجد فئات فرعية متاحة</p>
                                );

                                const subcategories = categories.filter(cat => cat.parent_id === mainCategory.id);

                                return (
                                    <div className="space-y-2">
                                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold text-primary-yellow">{mainCategory.name}</span> - الفئات الفرعية
                                            </p>
                                        </div>

                                        <label className="flex items-center px-3 py-2 cursor-pointer bg-gray-50 rounded-lg">
                                            <input
                                                type="radio"
                                                name="subcategory"
                                                checked={selectedCategories.length === 0}
                                                onChange={() => setSelectedCategories([])}
                                                className="w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                                            />
                                            <span className="text-gray-700 font-medium">جميع فئات {mainCategory.name}</span>
                                        </label>

                                        {subcategories.map((subCategory: Category) => (
                                            <label key={subCategory.id} className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-lg border border-gray-100">
                                                <input
                                                    type="radio"
                                                    name="subcategory"
                                                    checked={selectedCategories.includes(subCategory.slug)}
                                                    onChange={() => setSelectedCategories([subCategory.slug])}
                                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                                                />
                                                <span className="text-gray-700 flex-1">{subCategory.name}</span>
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                    {subCategory.products_count || 0}
                                                </span>
                                            </label>
                                        ))}

                                        {subcategories.length === 0 && (
                                            <p className="text-gray-500 text-center py-4 text-sm">لا توجد فئات فرعية في {mainCategory.name}</p>
                                        )}
                                    </div>
                                );
                            })()
                        )}
                    </div>
                )}
            </div>            <div className="mb-6">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    نطاق السعر
                    {expandedSections.price ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.price && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                الحد الأدنى: {priceRange.min} ريال
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min={filterOptions.priceRange?.min || 0}
                                    max={filterOptions.priceRange?.max || 1000}
                                    step="10"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{filterOptions.priceRange?.min || 0} ريال</span>
                                    <span>{filterOptions.priceRange?.max || 1000} ريال</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                الحد الأقصى: {priceRange.max} ريال
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min={filterOptions.priceRange?.min || 0}
                                    max={filterOptions.priceRange?.max || 1000}
                                    step="10"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{filterOptions.priceRange?.min || 0} ريال</span>
                                    <span>{filterOptions.priceRange?.max || 1000} ريال</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('color')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    اللون
                    {expandedSections.color ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.color && (
                    <div className="grid grid-cols-2 gap-2">
                        {filterOptions.colors?.map((color: string, index: number) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                                <input
                                    type="checkbox"
                                    checked={selectedColors.includes(color)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedColors([...selectedColors, color]);
                                        } else {
                                            setSelectedColors(selectedColors.filter(c => c !== color));
                                        }
                                    }}
                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow"
                                />
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <span className="text-gray-700 text-sm">{colorNames[color] || color}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('size')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    المقاس
                    {expandedSections.size ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.size && (
                    <div className="space-y-2">
                        {filterOptions.sizes?.map((size: any, index: number) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedSizes.includes(size.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedSizes([...selectedSizes, size.value]);
                                        } else {
                                            setSelectedSizes(selectedSizes.filter(s => s !== size.value));
                                        }
                                    }}
                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow"
                                />
                                <span className="text-gray-700">{sizeNames[size.value] || size.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('openingMethod')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    طريقة الفتح
                    {expandedSections.openingMethod ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.openingMethod && (
                    <div className="space-y-2">
                        {filterOptions.openingMethods?.map((method: any, index: number) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedOpeningMethods.includes(method.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedOpeningMethods([...selectedOpeningMethods, method.value]);
                                        } else {
                                            setSelectedOpeningMethods(selectedOpeningMethods.filter(m => m !== method.value));
                                        }
                                    }}
                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow"
                                />
                                <span className="text-gray-700">{method.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('railType')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    نوع السكة
                    {expandedSections.railType ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.railType && (
                    <div className="space-y-2">
                        {filterOptions.railTypes?.map((type: any, index: number) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedRailTypes.includes(type.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedRailTypes([...selectedRailTypes, type.value]);
                                        } else {
                                            setSelectedRailTypes(selectedRailTypes.filter(t => t !== type.value));
                                        }
                                    }}
                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow"
                                />
                                <span className="text-gray-700">{type.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('lining')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    وجود بطانة
                    {expandedSections.lining ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.lining && (
                    <div className="space-y-2">
                        {filterOptions.liningOptions?.map((option: any, index: number) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedLinings.includes(option.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedLinings([...selectedLinings, option.value]);
                                        } else {
                                            setSelectedLinings(selectedLinings.filter(l => l !== option.value));
                                        }
                                    }}
                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow"
                                />
                                <span className="text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('brand')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    الماركة
                    {expandedSections.brand ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.brand && (
                    <div className="space-y-2">
                        {filterOptions.brands?.map((brand: string, index: number) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedBrands([...selectedBrands, brand]);
                                        } else {
                                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                                        }
                                    }}
                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow"
                                />
                                <span className="text-gray-700">{brand}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    onClick={() => toggleSection('collection')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                >
                    المجموعة
                    {expandedSections.collection ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                </button>
                {expandedSections.collection && (
                    <div className="space-y-2">
                        {filterOptions.collections?.map((collection: string, index: number) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCollections.includes(collection)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedCollections([...selectedCollections, collection]);
                                        } else {
                                            setSelectedCollections(selectedCollections.filter(c => c !== collection));
                                        }
                                    }}
                                    className="w-4 h-4 me-2 text-primary-yellow border-gray-300 rounded focus:ring-primary-yellow"
                                />
                                <span className="text-gray-700">{collection}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">التوفر</h4>
                <div className="space-y-2">
                    <label className="flex items-center px-3 cursor-pointer">
                        <input
                            type="radio"
                            name="stock"
                            checked={inStock === 'all'}
                            onChange={() => setInStock('all')}
                            className="w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                        />
                        <span className="text-gray-700">الكل</span>
                    </label>
                    <label className="flex items-center px-3 cursor-pointer">
                        <input
                            type="radio"
                            name="stock"
                            checked={inStock === 'true'}
                            onChange={() => setInStock('true')}
                            className="w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                        />
                        <span className="text-gray-700">متوفر</span>
                    </label>
                    <label className="flex items-center px-3 cursor-pointer">
                        <input
                            type="radio"
                            name="stock"
                            checked={inStock === 'false'}
                            onChange={() => setInStock('false')}
                            className="w-4 h-4 me-2 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                        />
                        <span className="text-gray-700">غير متوفر</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;