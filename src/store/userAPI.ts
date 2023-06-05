import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../types";




export interface User extends IUser {

}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/'
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => `users/`,
            providesTags: (result = []) => result
                ?
                [...result.map(({ id }) => ({ type: 'Users', id } as const)),
                    { type: 'Users' as const, id: 'LIST' },]
                :
                [{type: 'Users' as const, id: 'LIST'}],

        }),
        getUser: builder.query<User, number>({
            query: (id) => {
                return {url: `users/${id}`}
            },
            providesTags: (result, error, id) => [{ type: 'Users', id }]

        }),
        checkIsAuth: builder.query<User, number>({
            query: (id) => {
                return {url: `users/${id}`}
            },
            providesTags: (result, error, id) => [{ type: 'Users', id }]

        }),
        addUser: builder.mutation<User, Partial<User>>({
            query: (body) => {
                return {
                    url: 'users',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        }),
        updateUser: builder.mutation<User, Partial<User>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `users/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),
    }),
});

export const {useGetUserQuery, useGetUsersQuery, useAddUserMutation, useCheckIsAuthQuery, useUpdateUserMutation} = userAPI;