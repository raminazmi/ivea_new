import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    color?: string;
    colorName?: string;
    measurementUnit?: string;
    width?: number;
    height?: number;
    openingMethod?: string;
    trackType?: string;
    liningOption?: string;
    selectedDimensions?: {
        width: number;
        height: number;
    };
    selectedPrice?: number;
}

interface CartState {
    items: CartItem[];
}

// Helpers for localStorage
const CART_KEY = 'cart_items';
function saveCartToLocalStorage(items: CartItem[]) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch { }
}
function loadCartFromLocalStorage(): CartItem[] {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

const initialState: CartState = {
    items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const product = action.payload;
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            saveCartToLocalStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToLocalStorage(state.items);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) item.quantity = quantity;
            saveCartToLocalStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state.items);
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
