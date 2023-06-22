import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cartSlice";
import { pizzasSlice } from "./slices/pizzasSlice";
import { filterSlice } from "./slices/filterSlice";
import { drinksSlice } from "./slices/drinksSlice";
import { popularSlice } from "./slices/popularSlice";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// const rootReducer = combineReducers({
//     pizzasPage: pizzas,
//     cartPage: cart,
//     filter: filter
// });

const rootReducer = combineReducers({
    popularPage: popularSlice.reducer,
    pizzasPage: pizzasSlice.reducer,
    drinksPage: drinksSlice.reducer,
    cartPage: cartSlice.reducer,
    filter: filterSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;