// src/Components/ProductCard.tsx
import React from 'react';
import { Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 border-2 border-dashed w-full h-48" />

            <div className="p-4">
                <h3 className="font-bold text-lg text-primary-black mb-1">
                    {product.name}
                </h3>
                <p className="text-primary-black mb-3">
                    {typeof product.price === 'number'
                        ? product.price.toFixed(2)
                        : parseFloat(product.price).toFixed(2)} ر.س
                </p>
                <Link
                    href={`/products/${product.id}`}
                    className="block w-full bg-primary-yellow text-primary-black text-center py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                    أضف إلى السلة
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;