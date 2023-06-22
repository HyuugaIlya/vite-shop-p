import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {
    popularAPI,
    TPopDrink,
    TPopPizza
} from '../../API';
import { RootState } from '../store';

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
type TPopProductsState = {
    popPizzas: TPopPizza[]
    popDrinks: TPopDrink[]
    fetchStatus: Status
}
const initialState: TPopProductsState = {
    popPizzas: [],
    popDrinks: [],
    fetchStatus: Status.LOADING
}

export const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPopPizzas.pending, (state) => {
                state.fetchStatus = Status.LOADING;
                state.popPizzas = [];
            })
            .addCase(getPopPizzas.fulfilled, (state, action: PayloadAction<TPopPizza[]>) => {
                state.popPizzas = action.payload;
                state.fetchStatus = Status.SUCCESS;
            })
            .addCase(getPopPizzas.rejected, (state) => {
                state.fetchStatus = Status.ERROR;
                state.popPizzas = [];
            })
            .addCase(getPopDrinks.pending, (state) => {
                state.fetchStatus = Status.LOADING;
                state.popDrinks = [];
            })
            .addCase(getPopDrinks.fulfilled, (state, action: PayloadAction<TPopDrink[]>) => {
                state.popDrinks = action.payload;
                state.fetchStatus = Status.SUCCESS;
            })
            .addCase(getPopDrinks.rejected, (state) => {
                state.fetchStatus = Status.ERROR;
                state.popDrinks = [];
            });
    }
});

export const getPopularSelector = (state: RootState) => state.popularPage;

export const getPopPizzas = createAsyncThunk<TPopPizza[]>(
    'popular/getPopPizzas',
    async () => {
        const data = await popularAPI.getPopPizzas();
        return data;
    }
)
export const getPopDrinks = createAsyncThunk<TPopDrink[]>(
    'popular/getPopDrinks',
    async () => {
        const data = await popularAPI.getPopDrinks();
        return data;
    }
)
export default popularSlice.reducer;