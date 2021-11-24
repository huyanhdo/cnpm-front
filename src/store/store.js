import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./pizzaSlice";
import toppingReducer from "./toppingSlice";
import cartReducer from "./cartSlice";
import comboReducer from "./comboSlice";
import categoryReducer from "./categorySlice";
import extraReducer from './extraSlice';
import cartExtraReducer from './cartExtraSlice';
import cartComboReducer from './cartComboSlice';
import {combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//storage.removeItem('persist:root');
const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    pizzas: pizzaReducer,
    toppings: toppingReducer,
    cart: cartReducer,
    cartExtras: cartExtraReducer,
    cartCombos: cartComboReducer,
    combos: comboReducer,
    categories: categoryReducer,
    extras: extraReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store =  configureStore({reducer: persistedReducer});
export const persistor = persistStore(store);