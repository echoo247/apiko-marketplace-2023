import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct, Products} from "../types";




type FilterProducts = {
    products: IProduct[],
    filteredProducts: IProduct[],
    isLoading: boolean,
    search: string
}

const initialState: FilterProducts = {
    products: [],
    filteredProducts: [],
    isLoading: true,
    search: ""
}

export interface FilterType {
    priceTo: number,
    priceFrom: number,
    title: string,
    location: string,
}


const productsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        productsSuccess: (state, action: PayloadAction<Products>) =>  {
            const newState = action.payload
            if(newState) {
                state.products = newState
                state.filteredProducts = newState
            }
            state.isLoading = false
        },
        searchAndSorted: (state, action: PayloadAction<FilterType>) => {
            if(action.payload.title || action.payload.location) {
                const filter = state.filteredProducts.filter((product) =>
                    product.title.trim().toLowerCase().includes(action.payload?.title.trim().toLowerCase()));
                if(action.payload.location) {
                    state.filteredProducts =  filter.filter((product) =>
                        product.location.trim().toLowerCase().includes(action.payload.location.trim().toLowerCase()));
                } else {
                    state.filteredProducts = filter
                }
            } else if (action.payload.priceTo || action.payload.priceFrom) {
                state.filteredProducts = state.filteredProducts.filter(product =>
                    action.payload.priceFrom <= product.price && action.payload.priceTo >= product.price
                )
            } else {
                state.filteredProducts = state.products
            }
        },
        savedList: (state) => {
            const filteredProducts = state.products.filter(product => product.saved === true);
            if(filteredProducts) {
                state.filteredProducts = filteredProducts
            }
        }
    }
});

export const productsActions = productsSlice.actions;
export const productsReducer = productsSlice.reducer;