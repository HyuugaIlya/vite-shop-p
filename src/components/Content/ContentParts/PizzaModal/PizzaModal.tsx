import {
  FC,
  useState
} from "react";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../store/slices/cartSlice";

import styles from "./PizzaModal.module.scss";

type TProps = {
  id: string
  price: number[]
  title: string
  imgUrl: string
  sizes: number[]
  types: number[]
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  typeNames: string[]
  countItemSum: number
  cartLength: number
}
export const PizzaModal: FC<TProps> = ({ id, price, title, imgUrl, sizes, types, setOpenModal, typeNames, countItemSum, cartLength }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [size, setSize] = useState<number>(sizes[0]);
  const [type, setType] = useState<number>(types[0]);

  const onItemAdd = () => {
    const pizzaItem = {
      item: {
        id,
        price: finalPrice,
        title,
        imgUrl,
        size: size,
        type: typeNames[type]
      },
      count: 1
    };
    dispatch(addItem(pizzaItem));
  }

  const priceIndex = sizes.indexOf(size);
  const finalPrice = price[priceIndex] + (type === 1 ? 10 : 0);

  return (
    <div onClick={() => setOpenModal(false)} className={styles.root}>
      <div className={styles.container}>
        <div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
          <div className={styles.imgBlock}>
            <img src={imgUrl} alt="Pizza" />
          </div>
          <div className={styles.descBlock}>
            <div className={styles.description}>
              <h2>{title}</h2>
              <p>{size} см, {typeNames[type]} тесто</p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                <br />
                Provident incidunt fuga quisquam quod numquam eum culpa,
                <br />
                ullam dicta magnam vero odio,adipisci repellendus ad
                <br />
                nobis amet porro dolores unde corporis?
              </p>
            </div>
            <div className={styles.sliders}>
              <ul>
                {types.map((t) => (
                  <li key={t} onClick={() => setType(t)}
                    className={type === t ? styles.active : ''}>{typeNames[t]}</li>
                ))}
              </ul>
              <ul>
                {sizes.map((v) => (
                  <li key={v} onClick={() => setSize(v)}
                    className={size === v ? styles.active : ''}>{v} см.</li>
                ))}
              </ul>
            </div>
            <button onClick={onItemAdd} className={styles.button}>
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
              <span>Добавить в корзину за {finalPrice} ₽ </span>
              {cartLength ? <i>{countItemSum}</i> : <i>0</i>}
            </button>
          </div>
        </div>
        <svg onClick={() => setOpenModal(false)} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path>
        </svg>
      </div>
    </div>
  );
}