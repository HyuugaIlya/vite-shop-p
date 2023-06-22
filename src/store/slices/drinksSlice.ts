import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {
    drinksAPI,
    TDrinks,
    TGetDrinks
} from '../../API';
import { RootState } from '../store';

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
type TDrinksState = {
    drinks: TDrinks[]
    fetchStatus: Status
}
const initialState: TDrinksState = {
    drinks: [],
    fetchStatus: Status.LOADING
}

export const drinksSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDrinks.pending, (state) => {
                state.fetchStatus = Status.LOADING;
                state.drinks = [];
            })
            .addCase(getDrinks.fulfilled, (state, action: PayloadAction<TDrinks[]>) => {
                state.drinks = action.payload;
                state.fetchStatus = Status.SUCCESS;
            })
            .addCase(getDrinks.rejected, (state) => {
                state.fetchStatus = Status.ERROR;
                state.drinks = [];
            });
    }
});

export const getDrinksSelector = (state: RootState) => state.drinksPage;

export const getDrinks = createAsyncThunk<TDrinks[], TGetDrinks>(
    'drinks/getDrinks',
    async ({ currentPage, pageLimit, searchValue }) => {
        const data = await drinksAPI.getDrinks({ currentPage, pageLimit, searchValue });
        return data;
    }
)

export default drinksSlice.reducer;