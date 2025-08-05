import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    featured: [],
    all: [],
};
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.featured = action.payload.featured;
            state.all = action.payload.all;
        },
    },
});
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
