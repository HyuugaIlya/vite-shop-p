import {
    PayloadAction,
    createSlice
} from '@reduxjs/toolkit';
import {
    SortProperty,
    TSort
} from '../../API';
import { RootState } from '../store';

export type TFilters = {
    page: string
    category: string
    sort: TSort
}
type TFilterState = {
    currentPage: number,
    pageLimit: number,
    categoryId: number,
    sortType: TSort,
    searchValue: string
}
const initialState: TFilterState = {
    currentPage: 1,
    pageLimit: 8,
    categoryId: 0,
    sortType: {
        id: 0,
        title: 'популярности',
        sortProperty: SortProperty.RATING_DESC
    },
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSortType: (state, action: PayloadAction<TSort>) => {
            state.sortType = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilter: (state, action: PayloadAction<TFilters>) => {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.page);
                state.categoryId = Number(action.payload.category);
                state.sortType = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sortType = {
                    id: 0,
                    title: 'популярности',
                    sortProperty: SortProperty.RATING_DESC
                }
            }
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setPageLimit: (state, action: PayloadAction<number>) => {
            state.pageLimit = action.payload;
        },
    }
});

export const getFilterSelector = (state: RootState) => state.filter;

export const {
    setCategoryId,
    setSortType,
    setCurrentPage,
    setFilter,
    setPageLimit,
    setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;