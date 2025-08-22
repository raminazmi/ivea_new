import React from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count?: number;
    parent_id?: number;
}

interface CategoryTabsProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    activeCategory,
    onCategoryChange
}) => {
    const mainCategories = categories.filter(cat => !cat.parent_id);
    const getCategoryProductsCount = (mainCategory: Category) => {
        const subcategories = categories.filter(cat => cat.parent_id === mainCategory.id);
        return subcategories.reduce((total, sub) => total + (sub.products_count || 0), 0);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-6">
            <div className="flex flex-wrap gap-1">
                <button
                    onClick={() => onCategoryChange('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'all'
                        ? 'bg-primary-yellow text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    الكل
                </button>
                {mainCategories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.slug)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeCategory === category.slug
                            ? 'bg-primary-yellow text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                    >
                        <span>{category.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                            {getCategoryProductsCount(category)}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryTabs;
