import React from 'react';
import ProductCard from '@/Components/Products/ProductCard';

interface SimilarProductsProps {
    products: any[];
    title?: string;
    className?: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
    products,
    title = "منتجات مشابهة :",
    className = ""
}) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className={`mt-16 ${className}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts; 