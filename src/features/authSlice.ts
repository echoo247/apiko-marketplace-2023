import {createSlice} from '@reduxjs/toolkit';




interface AuthState {
    isAuth: boolean;
    id: string | null;
}

const initialState: AuthState = {
    isAuth: false,
    id: null,
};


const authUser = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isAuth = true
            state.id = action.payload.id;

        },
        removeUser(state) {
            state.id = null
            state.isAuth = false;
        }
    },
});

export const {setUser, removeUser} = authUser.actions;

export default authUser.reducer;


