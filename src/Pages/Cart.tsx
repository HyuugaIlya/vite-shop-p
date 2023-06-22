import { useSelector } from "react-redux";
import CartWithItems from "../components/CartPage/CartWithItems/CartWithItems";
import CartEmpty from "../components/CartPage/CartEmpty/CartEmpty";
import { getCartSelector } from "../store/slices/cartSlice";
import { ReactElement } from "react";

function Cart(): ReactElement {
    const {
        itemsCart,
        totalPrice
    } = useSelector(getCartSelector);

    return <>
        {itemsCart.length
            ? <CartWithItems
                itemsCart={itemsCart}
                totalPrice={totalPrice}
            />
            : <CartEmpty />}
    </>;
}

export default Cart;