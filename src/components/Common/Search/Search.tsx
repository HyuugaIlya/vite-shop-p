import {
    useCallback,
    useState,
    useRef,
    FC,
    ChangeEvent
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';

import { debounce } from 'lodash';
import searchSvg from '../../../assets/img/9035548_search_outline_icon.svg';
import closeSvg from '../../../assets/img/4115230_cancel_close_delete_icon.svg';
import {
    AppDispatch
} from '../../../store/store';

import {
    getFilterSelector,
    setSearchValue
} from '../../../store/slices/filterSlice';

import styles from './Search.module.scss';

const Search: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchValue } = useSelector(getFilterSelector);

    const [value, setValue] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const inputInFocus = () => {
        inputRef.current?.focus();
    };

    const debounceFn = debounce((str: string) => {
        dispatch(setSearchValue(str));
    }, 300);

    const updateSearchValue = useCallback(debounceFn, [debounceFn]);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        updateSearchValue(e.currentTarget.value);
    };

    const onClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputInFocus();
    };

    return (
        <div className={styles.root}>
            <img onClick={inputInFocus} className={styles.icon} src={searchSvg} alt='search' />
            <input ref={inputRef} value={value} onChange={onValueChange} placeholder='Поиск...' className={styles.input} />
            {searchValue && <img className={styles.closeIcon} onClick={onClear} src={closeSvg} alt='close' />}
        </div>
    );
}

export default Search;