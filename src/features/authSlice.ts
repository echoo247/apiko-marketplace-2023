import {createAction, createAsyncThunk, createReducer, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {boolean} from "yup";
import {userAPI} from "../store/userAPI";

interface User {
    id: number
    fullName: string;
    email: string;
}

interface RegisterResponse {
    message: string;
}

interface AuthState {
    loading: boolean;
    isAuth: boolean;
    error: string | null;
}

export const registerUser = createAsyncThunk<RegisterResponse, Omit<User, 'createAt'>, { rejectValue: string }>(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post<RegisterResponse>('http://localhost:3001/users/', userData.id);
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    }
);

const initialState: AuthState = {
    loading: false,
    error: null,
    isAuth: false,
};

export const logoutAction = createAction('LOGOUT_ACTION_TYPE')

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logoutAction, (state) => {
                state.isAuth = true
                state.loading = false
                state.error = null
                console.log('s', state)
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.isAuth = true;
                // Виконати необхідні дії після успішної реєстрації
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addMatcher(
                userAPI.endpoints.checkIsAuth.matchFulfilled,
                (state) => {
                    state.isAuth = true
                    state.loading = false
                    state.error = null
                }
            )
    },
});

export default authSlice.reducer;


