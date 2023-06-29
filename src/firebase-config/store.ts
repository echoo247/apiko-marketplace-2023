import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from '../features/authSlice';
import {productsReducer} from "../features/filterSlice";
import {firestoreApi} from "./firestoryAPI";

export const store = configureStore({
    reducer: {
        product: productsReducer,
        auth: authReducer,
        [firestoreApi.reducerPath]: firestoreApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(firestoreApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)