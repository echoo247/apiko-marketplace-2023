import {IProduct, Products} from "../types";
import {firestoreApi} from "../firebase-config/firestoryAPI";
import {
    collection,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    doc
} from 'firebase/firestore';
import {firestore} from "../firebase-config/firebase";



export const productAPI = firestoreApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query<Products, void>({
            async queryFn() {
                try {
                    const ref = collection(firestore, 'products');
                    const querySnapshot = await getDocs(ref);
                    let users: Products = [];
                    querySnapshot?.forEach((doc) => {
                        users.push({
                            id: doc.id,
                            ...doc.data(),
                        } as IProduct)
                    });

                    return {data: users}
                } catch (error: any) {
                    console.error(error.message);
                    return {error: error.message};
                }
            },
            providesTags: ['Products'],
        }),
        fetchProduct: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(firestore, 'products', id);
                    const querySnapshot = await getDoc(docRef);
                    return {data: querySnapshot.data()}
                } catch (error: any) {
                    return {error: error.message};
                }
            },
            providesTags: ['Products'],
        }),
        addProduct: builder.mutation({
            async queryFn ({id, data})  {
                try {
                    const docRef = doc(firestore, "products", `${id}`);
                    await setDoc(docRef, {...data});
                    return {data: null}
                } catch (error: any) {
                    console.error(error.message);
                    return {error: error.message};
                }
            },
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            async queryFn (id) {
                try {
                    await deleteDoc(doc(firestore, "products", id))
                    return {data: null}
                } catch (error: any) {
                    console.error(error.message);
                    return {error: error.message};
                }
            },
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            async queryFn ({id, data}) {
                try {
                    await updateDoc(doc(firestore, "products", id), {...data})
                    return {data: 'ok'}
                } catch (error: any) {
                    console.error(error.message);
                    return {error: error.message};
                }
            },
            invalidatesTags: ['Products'],
        })
    })
})

export const {useFetchProductsQuery, useFetchProductQuery, useAddProductMutation, useUpdateProductMutation} = productAPI;
