import {
    FC,
    memo
} from "react";

import styles from './Categories.module.scss';

type TCategories = {
    id: number
    title: string
}
export const categories: TCategories[] = [
    { "id": 0, 'title': 'Все' },
    { "id": 1, 'title': 'Мясные' },
    { "id": 2, 'title': 'Вегетарианская' },
    { "id": 3, 'title': 'Гриль' },
    { "id": 4, 'title': 'Острые' },
    { "id": 5, 'title': 'Закрытые' }
];

type TProps = {
    categoryId: number
    onCategoryChange: (id: number) => void
}
const Categories: FC<TProps> = memo(({ categoryId, onCategoryChange }) => {
    return (
        <div className={styles.categories}>
            <ul>
                {categories.map((c) => (
                    <li key={c.id} onClick={() => onCategoryChange(c.id)}
                        className={categoryId === c.id ? styles.active : ''}>{c.title}</li>
                ))}
            </ul>
        </div>
    );
})

export default Categories;