import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    image: string;
}

interface ProductsState {
    featured: Product[];
    all: Product[];
}

const initialState: ProductsState = {
    featured: [],
    all: [],
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<{ featured: Product[], all: Product[] }>) => {
            state.featured = action.payload.featured;
            state.all = action.payload.all;
        },
    },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;