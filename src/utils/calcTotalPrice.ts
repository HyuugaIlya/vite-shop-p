import { TCartItems } from "../store/slices/cartSlice";

export const calcTotalPrice = (itemsCart: TCartItems[]) => {
    return itemsCart.reduce((sum, currentItem) => {
        return sum + (currentItem.item.price * currentItem.count);
    }, 0);
};