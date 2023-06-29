import {
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
    doc
} from 'firebase/firestore';
import {firestore} from "../firebase-config/firebase";
import {firestoreApi} from "../firebase-config/firestoryAPI";



export const userAPI = firestoreApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchUser: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(firestore, 'users', id);
                    const querySnapshot = await getDoc(docRef);
                    return {data: querySnapshot.data()}
                } catch (error: any) {
                    //console.error(error.message);
                    return {error: error.message};
                }
            },
            providesTags: ['Users'],
        }),
        addUser: builder.mutation({
            async queryFn ({data, uid})  {
                try {
                    const docRef = doc(firestore, "users", `${uid}`);
                    await setDoc(docRef, {...data});
                    return {data: null}
                } catch (error: any) {
                    console.error(error.message);
                    return {error: error.message};
                }
            },
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            async queryFn (id) {
                try {
                    await deleteDoc(doc(firestore, "users", id))
                    return {data: null}
                } catch (error: any) {
                    console.error(error.message);
                    return {error: error.message};
                }
            },
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            async queryFn ({id, data}) {
                try {
                    await updateDoc(doc(firestore, "users", id), {...data})
                    return {data: 'ok'}
                } catch (error: any) {
                    console.error(error.message);
                    return {error: error.message};
                }
            },
            invalidatesTags: ['Users'],
        })
    })
})

export const { useAddUserMutation, useFetchUserQuery,
    useDeleteUserMutation, useUpdateUserMutation } = userAPI
