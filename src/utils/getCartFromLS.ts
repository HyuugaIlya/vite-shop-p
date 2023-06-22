import { TCartItems } from "../store/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const cart: TCartItems[] = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(cart);

    return {
        cart,
        totalPrice
    };
}