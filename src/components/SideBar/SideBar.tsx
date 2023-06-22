import { Link, useLocation } from 'react-router-dom';
import pizzaIcon from '../../assets/img/pizza.png';
import drinkIcon from '../../assets/img/water.png';
import popularTop from '../../assets/img/top-10.png';

import styles from './SideBar.module.scss';

const SideBar = () => {
    const location = useLocation();

    return (
        <div className={styles.root}>
            <ul>
                <Link to='/'>
                    <li className={location.pathname === '/popular' ? styles.active : ''}>
                        <img src={popularTop} alt="top" />
                        Популярное
                    </li>
                </Link>
                <Link to='/pizzas'>
                    <li className={location.pathname === '/pizzas' ? styles.active : ''}>
                        <img src={pizzaIcon} alt="pizza" />
                        Пицца
                    </li>
                </Link>
                <Link to='/drinks'>
                    <li className={location.pathname === '/drinks' ? styles.active : ''}>
                        <img src={drinkIcon} alt="drink" />
                        Напитки
                    </li>
                </Link>

            </ul>
        </div>
    );
}

export default SideBar;