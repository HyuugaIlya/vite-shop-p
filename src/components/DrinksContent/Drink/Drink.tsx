import {
    FC,
    useEffect,
    useState
} from 'react';

import { DrinkModal } from '../DrinkModal/DrinkModal';
import { getCartSelector } from '../../../store/slices/cartSlice';
import {
    useSelector
} from 'react-redux';

import styles from './Drink.module.scss';

type TProps = {
    id: string
    imgUrl: string
    title: string
    price: number[]
    types: number[]
}
export const Drink: FC<TProps> = ({ id, imgUrl, title, price, types }) => {
    const { itemsCart } = useSelector(getCartSelector);
    const countItemSum = itemsCart.filter((obj) => obj.item.id === id).reduce((count, currentItem) => {
        return count + currentItem.count;
    }, 0);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const onModalOpen = () => {
        setOpenModal(!openModal);
    }

    useEffect(() => {
        openModal
            ? window.document.body.style.overflowY = 'hidden'
            : window.document.body.style.overflow = 'auto';
    }, [openModal]);

    return <div className={styles.wrapper}>
        <div className={styles.productBlock}>
            <img
                className={styles.img}
                onClick={onModalOpen}
                src={imgUrl}
                alt="Drink"
            />
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.bottom}>
                <div className={styles.price}>от {price[0]} ₽</div>
                <button onClick={onModalOpen} className={styles.button}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                </button>
            </div>
        </div>
        {openModal && <DrinkModal
            key={id}
            id={id}
            imgUrl={imgUrl}
            price={price}
            title={title}
            types={types}
            openModal={openModal}
            setOpenModal={setOpenModal}
            countItemSum={countItemSum}
            cartLength={itemsCart.length}
        />}
    </div>;
}
