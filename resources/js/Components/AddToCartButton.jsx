import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

const AddToCartButton = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => dispatch(addToCart(product))}
        >
            أضف إلى السلة
        </button>
    );
};

export default AddToCartButton;
