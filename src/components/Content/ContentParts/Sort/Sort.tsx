import {
    useRef,
    useState,
    useEffect,
    FC,
    memo
} from 'react';
import {
    SortProperty,
    TSort
} from '../../../../API';

import styles from './Sort.module.scss';

export const sortPopUp: TSort[] = [
    { id: 0, title: 'популярности убыв.', sortProperty: SortProperty.RATING_DESC },
    { id: 1, title: 'популярности возр.', sortProperty: SortProperty.RATING_ASC },
    { id: 2, title: 'цене убыв.', sortProperty: SortProperty.PRICE_DESC },
    { id: 3, title: 'цене возр.', sortProperty: SortProperty.PRICE_ASC },
    { id: 4, title: 'алфавиту', sortProperty: SortProperty.TITLE },
];

type TProps = {
    sortType: TSort
    onSortChange: (s: TSort) => void
}
const Sort: FC<TProps> = memo(({ sortType, onSortChange }) => {
    const sortRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
                setIsOpen(false);
            }
        }

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        }
    }, [])

    const onActiveSortChange = (s: TSort) => {
        onSortChange(s);
        setIsOpen(false);
    }

    return (
        <div ref={sortRef} className={styles.sort}>
            <div className={styles.label}>
                {isOpen && <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>}
                <b>Сортировка по:</b>
                <span onClick={() => setIsOpen(!isOpen)}>{sortType.title}</span>
            </div>
            {isOpen && <div className={styles.popup}>
                <ul>
                    {sortPopUp.map((s) => (
                        <li key={s.id} onClick={() => onActiveSortChange(s)} className={sortType.id === s.id ? 'active' : ''}>{s.title}</li>
                    ))}
                </ul>
            </div>}
        </div>
    );
})

export default Sort;