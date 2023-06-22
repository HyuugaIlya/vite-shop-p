import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {
    pizzasAPI,
    TGetPizzas,
    TPizzas
} from '../../API';
import {
    setCurrentPage,
    setPageLimit
} from './filterSlice';
import { RootState } from '../store';

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
type TPizzasState = {
    pizzas: TPizzas[]
    totalPageCount: number
    fetchStatus: Status
}
const initialState: TPizzasState = {
    pizzas: [],
    totalPageCount: 2,
    fetchStatus: Status.LOADING
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPizzas.pending, (state) => {
                state.fetchStatus = Status.LOADING;
                state.pizzas = [];
            })
            .addCase(getPizzas.fulfilled, (state, action: PayloadAction<TPizzas[]>) => {
                state.pizzas = action.payload;
                state.fetchStatus = Status.SUCCESS;
            })
            .addCase(getPizzas.rejected, (state) => {
                state.fetchStatus = Status.ERROR;
                state.pizzas = [];
            });
    }
});

export const getPizzasSelector = (state: RootState) => state.pizzasPage;

export const getPizzas = createAsyncThunk<TPizzas[], TGetPizzas>(
    'pizzas/getPizzas',
    async ({ searchValue, currentPage, pageLimit, categoryId, sortType }, { dispatch }) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(setPageLimit(pageLimit));
        const data = await pizzasAPI.getPizzas({ searchValue, currentPage, pageLimit, categoryId, sortType });
        return data;
    }
)

export default pizzasSlice.reducer;