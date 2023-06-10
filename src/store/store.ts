import {configureStore} from '@reduxjs/toolkit'
import {productAPI} from "./productAPI";
import {setupListeners} from "@reduxjs/toolkit/query";
import {userAPI} from "./userAPI";
import authReducer from '../features/authSlice';
import {productsReducer} from "../features/filterSlice";

export const store = configureStore({
    reducer: {
        product: productsReducer,
        auth: authReducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false}).concat(productAPI.middleware, userAPI.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)