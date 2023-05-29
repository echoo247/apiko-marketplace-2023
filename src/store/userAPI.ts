import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "../types";



export interface Product extends IProduct {

}

export const productAPI = createApi({
    reducerPath: 'productAPI',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/'
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => `products/`,
            providesTags: (result = []) => result

                ?

                [...result.map(({ id }) => ({ type: 'Products', id } as const)),
                { type: 'Products' as const, id: 'LIST' },]

                :
                [{type: 'Products' as const, id: 'LIST'}],

        }),
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => {
                return {
                    url: 'products',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
    }),
});

export const {useGetProductsQuery, useAddProductMutation} = productAPI;