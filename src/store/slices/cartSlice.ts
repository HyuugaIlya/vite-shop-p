import {
    PayloadAction,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

type TItem = {
    id: string
    price: number
    title: string
    imgUrl: string
    type: string
    size?: number
}
export type TCartItems = {
    item: TItem,
    count: number
}
type TCartState = {
    totalPrice: number
    itemsCart: TCartItems[]
}
const { cart, totalPrice } = getCartFromLS();
const initialState: TCartState = {
    totalPrice: totalPrice,
    itemsCart: cart
}

const findItem = (state: typeof initialState, action: PayloadAction<TCartItems>) => {
    return (
        state.itemsCart.find((obj) => obj.item.id === action.payload.item.id &&
            obj.item.type === action.payload.item.type &&
            obj.item.size === action.payload.item.size)
    );
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<TCartItems>) => {
            const cartItem = findItem(state, action);

            if (cartItem) {
                cartItem.count++;
            } else {
                state.itemsCart.push(action.payload);
            }

            state.totalPrice = calcTotalPrice(state.itemsCart);
        },
        removeItem: (state, action: PayloadAction<TCartItems>) => {
            const cartItem = findItem(state, action);

            if (cartItem && cartItem.count > 1) {
                cartItem.count--;
                state.totalPrice = state.totalPrice - cartItem.item.price;
            }
        },
        clearItem: (state, action: PayloadAction<TCartItems>) => {
            const cartItem = findItem(state, action);

            if (cartItem) {
                state.totalPrice = state.totalPrice - (cartItem.count * cartItem.item.price);
                state.itemsCart = state.itemsCart.filter((i) => {
                    return i.item.id !== cartItem.item.id || i.item.type !== cartItem.item.type || i.item.size !== cartItem.item.size
                });
            }
        },
        clearCart: (state) => {
            state.itemsCart = [];
            state.totalPrice = 0;
        }
    }
});

export const getCartSelector = (state: RootState) => state.cartPage;

export const {
    addItem,
    clearCart,
    clearItem,
    removeItem
} = cartSlice.actions;

export default cartSlice.reducer;