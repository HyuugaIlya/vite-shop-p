import { FC } from 'react';
import emptyCart from '../../../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

import styles from './CartEmpty.module.scss'

const CartEmpty: FC = () => {

    return <div className={styles.container}>
        <div className={styles.cartEmpty}>
            <h2>Корзина пустая</h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.
                <br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCart} alt="Empty cart" />
            <Link to='/' className={styles.buttonBlack}>
                <span>Вернуться назад</span>
            </Link>
        </div>
    </div>
}

export default CartEmpty;