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
    // الخيارات المخصصة الجديدة
    customizations?: Record<string, {
        type: string;
        label: string;
        value?: any;
        values?: any[];
        displayValue?: string;
        displayValues?: string[];
        width?: number;
        height?: number;
        length?: number;
        unit?: string;
    }>;
    uploadedFiles?: Array<{
        name: string;
        path: string;
        url: string;
        size: number;
        type: string;
        uuid: string;
    }> | string[];
    cartId?: string;
}

interface CartState {
    items: CartItem[];
}

// Helpers for localStorage
const CART_KEY = 'cart_items';
const CART_DATA_KEY = 'cart';

function saveCartToLocalStorage(items: CartItem[]) {
    try {
        // حفظ العناصر في cart_items
        localStorage.setItem(CART_KEY, JSON.stringify(items));

        // حفظ بيانات السلة في cart
        const cartData = {
            items: items,
            total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(CART_DATA_KEY, JSON.stringify(cartData));
    } catch { }
}

function loadCartFromLocalStorage(): CartItem[] {
    try {
        // محاولة تحميل من cart_items أولاً
        const cartItemsData = localStorage.getItem(CART_KEY);
        if (cartItemsData) {
            return JSON.parse(cartItemsData);
        }

        // إذا لم تجد، حاول تحميل من cart
        const cartData = localStorage.getItem(CART_DATA_KEY);
        if (cartData) {
            const parsed = JSON.parse(cartData);
            return parsed.items || [];
        }

        return [];
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
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const product = action.payload;

            // إذا كان للمنتج cartId فريد، أضفه مباشرة
            if (product.cartId) {
                state.items.push(product);
            } else {
                // البحث عن منتج مطابق (نفس ID والخيارات)
                const existing = state.items.find(item => {
                    if (item.id !== product.id) return false;

                    // مقارنة الخيارات الأساسية
                    if (item.color !== product.color) return false;
                    if (item.width !== product.width) return false;
                    if (item.height !== product.height) return false;

                    // مقارنة الخيارات المخصصة
                    const itemCustomizations = JSON.stringify(item.customizations || {});
                    const productCustomizations = JSON.stringify(product.customizations || {});

                    return itemCustomizations === productCustomizations;
                });

                if (existing) {
                    existing.quantity += product.quantity || 1;
                } else {
                    state.items.push({ ...product, quantity: product.quantity || 1 });
                }
            }

            saveCartToLocalStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<string | number>) => {
            const identifier = action.payload;

            if (typeof identifier === 'string') {
                // إزالة بالـ cartId
                state.items = state.items.filter(item => item.cartId !== identifier);
            } else {
                // إزالة بالـ id التقليدي
                state.items = state.items.filter(item => item.id !== identifier);
            }

            saveCartToLocalStorage(state.items);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
            const { id, quantity } = action.payload;

            // التأكد من أن الكمية أكبر من 0
            if (quantity <= 0) return;

            let item;
            if (typeof id === 'string') {
                // البحث بالـ cartId
                item = state.items.find(item => item.cartId === id);
            } else {
                // البحث بالـ id التقليدي
                item = state.items.find(item => item.id === id);
            }

            if (item) {
                // تحديث الكمية الأساسية
                item.quantity = quantity;

                // إذا كان هناك كمية مخصصة، حدثها أيضاً
                if (item.customizations?.quantity) {
                    item.customizations.quantity.value = quantity;
                    item.customizations.quantity.displayValue = quantity.toString();
                }

                saveCartToLocalStorage(state.items);
            }
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state.items);
        },
        // دالة للحصول على بيانات السلة الكاملة من localStorage
        loadCartData: (state) => {
            state.items = loadCartFromLocalStorage();
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCartData } = cartSlice.actions;

// دالة مساعدة للحصول على بيانات السلة الكاملة
export const getCartData = () => {
    try {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : null;
    } catch {
        return null;
    }
};

// دالة لمزامنة البيانات بين cart_items و cart
export const syncCartData = () => {
    try {
        const cartItems = localStorage.getItem('cart_items');
        if (cartItems) {
            const items = JSON.parse(cartItems);
            const cartData = {
                items: items,
                total: items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0),
                totalItems: items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem('cart', JSON.stringify(cartData));
        }
    } catch {
        // في حالة الخطأ، لا نفعل شيء
    }
};

export default cartSlice.reducer;
