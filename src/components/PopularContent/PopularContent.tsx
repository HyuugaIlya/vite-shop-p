import {
    useEffect,
    useState
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    Status,
    getPopDrinks,
    getPopPizzas,
    getPopularSelector
} from "../../store/slices/popularSlice";
import { AppDispatch } from "../../store/store";
import clsx from "clsx";

import { PopItem } from "./PopularItem/PopItem";
import DrinkSkeleton from "../Common/Skeleton/DrinkSkeleton";

import styles from './PopularContent.module.scss';

const PopularContent = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isPizzaLoad, setIsPizzaLoad] = useState<boolean>(false);
    const [isDrinkLoad, setIsDrinkLoad] = useState<boolean>(false);

    const [pizzaPart, setPizzaPart] = useState<number>(1);
    const [drinkPart, setDrinkPart] = useState<number>(1);

    const {
        popPizzas,
        popDrinks,
        fetchStatus
    } = useSelector(getPopularSelector);

    useEffect(() => {
        dispatch(getPopPizzas());
        dispatch(getPopDrinks());
    }, [dispatch]);

    const onLoadMore = (setIsLoad: React.Dispatch<React.SetStateAction<boolean>>, isLoad: boolean, setPart: React.Dispatch<React.SetStateAction<number>>) => {
        if (!isLoad) {
            setIsLoad(true);
            setPart(2);
        } else {
            setIsLoad(false);
            setPart(1);
        }
    }

    const popPizzasRender = popPizzas.slice(0, pizzaPart * 4).map(i => <PopItem
        key={i.id}
        id={i.id}
        imgUrl={i.imageUrl}
        price={i.price}
        title={i.title}
        types={i.types}
        sizes={i.sizes}
    />);
    const popDrinksRender = popDrinks.slice(0, drinkPart * 4).map(i => <PopItem
        key={i.id}
        id={i.id}
        imgUrl={i.imageUrl}
        price={i.price}
        title={i.title}
        types={i.types}
    />);

    const skeleton = [... new Array(4)].map((_, i) => <DrinkSkeleton key={i} />);

    return <div className={styles.container}>
        <h2 className={styles.title}>Популярное:</h2>
        {fetchStatus === Status.ERROR ? <div className={styles.errorInfo}>
            <h2>Произошла ошибка</h2>
            <p>
                К сожалению не удалось обработать запрос на получение товаров. Повторите попытку позже.
            </p>
        </div> : <div className={styles.content}>
            <p className={styles.itemTitle}>Пицца</p>
            <div className={styles.items}>
                {fetchStatus === Status.SUCCESS ? popPizzasRender : skeleton}

            </div>
            <button onClick={() => onLoadMore(setIsPizzaLoad, isPizzaLoad, setPizzaPart)} className={clsx(styles.buttonMore, isPizzaLoad && styles.loaded)}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                        fill="#000000"
                    />
                </svg>
            </button>
            <p className={styles.itemTitle}>Напитки</p>
            <div className={styles.items}>
                {fetchStatus === Status.SUCCESS ? popDrinksRender : skeleton}
            </div>
            <button onClick={() => onLoadMore(setIsDrinkLoad, isDrinkLoad, setDrinkPart)} className={clsx(styles.buttonMore, isDrinkLoad && styles.loaded)}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                        fill="#000000"
                    />
                </svg>
            </button>
        </div>}
    </div>;
}

export default PopularContent;