import { useEffect } from 'react';
import {
    useDispatch,
    useSelector
} from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../../store/store";
import {
    Status,
    getDrinks,
    getDrinksSelector
} from "../../store/slices/drinksSlice";
import { getFilterSelector } from "../../store/slices/filterSlice";

import { Drink } from "./Drink/Drink";
import DrinkSkeleton from "../Common/Skeleton/DrinkSkeleton";
import Paginator from "../Common/Paginator/Paginator";

import styles from './Drinks.module.scss';
import qs from 'qs';

const DrinksContent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        fetchStatus,
        drinks
    } = useSelector(getDrinksSelector);
    const {
        currentPage,
        pageLimit,
        searchValue
    } = useSelector(getFilterSelector);

    useEffect(() => {
        dispatch(getDrinks({
            currentPage,
            pageLimit,
            searchValue
        }));
    }, [currentPage, dispatch, pageLimit, searchValue]);

    useEffect(() => {
        navigate({
            pathname: '/drinks',
            search: qs.stringify({ page: currentPage })
        });
    }, [currentPage, navigate]);

    const onPageChange = (actualPage: number) => {
        dispatch(getDrinks({
            currentPage: actualPage,
            pageLimit,
            searchValue
        }));
    };

    const drinksRender = drinks.map(d => <Drink
        key={d.id}
        id={d.id}
        imgUrl={d.imageUrl}
        price={d.price}
        title={d.title}
        types={d.types}
    />);

    const skeleton = [... new Array(8)].map((_, i) => <DrinkSkeleton key={i} />);

    return <div className={styles.container}>
        <h2 className={styles.title}>Напитки</h2>
        {fetchStatus === Status.ERROR ? <div className={styles.errorInfo}>
            <h2>Произошла ошибка</h2>
            <p>
                К сожалению не удалось обработать запрос на получение товаров. Повторите попытку позже.
            </p>
        </div> : <div className={styles.items}>
            {fetchStatus === Status.SUCCESS ? drinksRender : skeleton}
        </div>}
        {!searchValue && <Paginator
            onActualPageChange={onPageChange}
            currentPage={currentPage}
            totalPageCount={2}
            pageLimit={pageLimit}
        />}
    </div>;
}

export default DrinksContent;