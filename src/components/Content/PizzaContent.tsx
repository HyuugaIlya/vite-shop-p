import {
    FC,
    useCallback,
    useEffect,
    useRef
} from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    useDispatch,
    useSelector
} from "react-redux";
import qs from 'qs';

import Categories from './ContentParts/Categories/Categories';
import Sort from "./ContentParts/Sort/Sort";
import ProductBlock from './ContentParts/ProductBlock/ProductBlock';
import PizzaSkeleton from "../Common/Skeleton/PizzaSkeleton";
import Paginator from "../Common/Paginator/Paginator";

import { sortPopUp } from "./ContentParts/Sort/Sort";

import {
    Status,
    getPizzas,
    getPizzasSelector
} from "../../store/slices/pizzasSlice";
import {
    getFilterSelector,
    setCategoryId,
    setFilter,
    setSortType
} from "../../store/slices/filterSlice";

import { TSort } from "../../API";
import { AppDispatch } from "../../store/store";

import styles from './Content.module.scss';

const PizzaContent: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const navigate = useNavigate();

    const isSearch = useRef<boolean>(false);
    const isMounted = useRef<boolean>(false);

    const {
        totalPageCount,
        fetchStatus,
        pizzas,
    } = useSelector(getPizzasSelector);
    const {
        currentPage,
        pageLimit,
        categoryId,
        searchValue,
        sortType
    } = useSelector(getFilterSelector);

    type TQsQueryParams = {
        page: number
        category: number
        sortProperty: "rating" | "price" | "title" | "-rating" | "-price"
    };
    useEffect(() => {
        if (isMounted.current) {
            const queryParams = qs.stringify({
                page: currentPage,
                category: categoryId,
                sortProperty: sortType.sortProperty
            } as TQsQueryParams);
            navigate({
                pathname: '/pizzas',
                search: queryParams
            });
        }
        isMounted.current = true;
    }, [navigate, categoryId, sortType, currentPage, pageLimit, searchValue, search]);

    type TQsParsedParams = {
        page: string
        category: string
        sortProperty: "rating" | "price" | "title" | "-rating" | "-price"
    };
    useEffect(() => {
        if (search) {
            const params = qs.parse(search.substring(1)) as TQsParsedParams;
            const sort = sortPopUp.find((obj) => obj.sortProperty === params.sortProperty);
            dispatch(setFilter({
                page: params.page,
                category: params.category,
                sort: sort || sortPopUp[0]
            }));
            isSearch.current = true;
        }
    }, [dispatch, search]);

    useEffect(() => {
        if (!isSearch.current && !categoryId) {
            dispatch(getPizzas({
                currentPage,
                pageLimit,
                categoryId,
                sortType,
                searchValue
            }));
        } else if (categoryId > 0) {
            dispatch(getPizzas({
                currentPage: 1,
                pageLimit, categoryId,
                sortType, searchValue
            }));
        }
        isSearch.current = false;
    }, [dispatch, categoryId, sortType, currentPage, pageLimit, searchValue, search]);

    const onPageChange = (actualPage: number) => {
        dispatch(getPizzas({
            currentPage: actualPage,
            pageLimit,
            categoryId,
            sortType,
            searchValue
        }));
    };

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [dispatch]);
    const onChangeSort = useCallback((s: TSort) => {
        dispatch(setSortType(s))
    }, [dispatch]);

    const pizzasRender = pizzas.map((p) => <ProductBlock
        key={p.id}
        id={p.id}
        price={p.price}
        title={p.title}
        imgUrl={p.imageUrl}
        sizes={p.sizes}
        types={p.types}
    />);
    const skeleton = [... new Array(8)].map((_, i) => <PizzaSkeleton key={i} />);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Categories
                    categoryId={categoryId}
                    onCategoryChange={onChangeCategory}
                />
                <Sort
                    sortType={sortType}
                    onSortChange={onChangeSort}
                />
            </div>
            <h2 className={styles.title}>Все пиццы</h2>
            {fetchStatus === Status.ERROR ? <div className={styles.errorInfo}>
                <h2>Произошла ошибка</h2>
                <p>
                    К сожалению не удалось обработать запрос на получение товаров. Повторите попытку позже.
                </p>
            </div> : <div className={styles.items}>
                {fetchStatus === Status.SUCCESS ? pizzasRender : skeleton}
            </div>}
            {!categoryId && !searchValue && <Paginator
                onActualPageChange={onPageChange}
                currentPage={currentPage}
                totalPageCount={totalPageCount}
                pageLimit={pageLimit}
            />}
        </div>
    );
}

export default PizzaContent;