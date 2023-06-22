import {
    FC,
    useEffect,
    useState
} from "react"
import { useSelector } from "react-redux"

import { getCartSelector } from "../../../../store/slices/cartSlice"
import { PizzaModal } from "../PizzaModal/PizzaModal";

import styles from './Product.module.scss';

export const typeNames = ['тонкое', 'традиционное'];

type TProps = {
    id: string
    price: number[]
    title: string
    imgUrl: string
    sizes: number[]
    types: number[]
}
const ProductBlock: FC<TProps> = ({ price, title, imgUrl, sizes, types, id }) => {

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
        // openModal
        //     ? window.document.body.style.marginRight = '25.5px'
        //     : window.document.body.style.marginRight = '0px';
    }, [openModal]);

    return <div className={styles.wrapper}>
        <div className={styles.productBlock}>
            <img
                className={styles.img}
                onClick={onModalOpen}
                src={imgUrl}
                alt="Pizza"
            />
            <h4 className={styles.title}>{title}</h4>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Provident incidunt fuga quisquam quod numquam eum culpa,
                ullam dicta magnam vero odio,adipisci repellendus ad
                nobis amet porro dolores unde corporis?
            </p>
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
        {openModal && <PizzaModal
            key={id}
            id={id}
            imgUrl={imgUrl}
            price={price}
            sizes={sizes}
            title={title}
            types={types}
            openModal={openModal}
            setOpenModal={setOpenModal}
            typeNames={typeNames}
            countItemSum={countItemSum}
            cartLength={itemsCart.length}
        />}
    </div>;
}

export default ProductBlock;