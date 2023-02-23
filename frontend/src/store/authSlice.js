import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../utility/api';

const initialState = {
    isAuthenticated: localStorage.getItem('Token') ? true : false,
}

export const Register = createAsyncThunk('Register', async (data) => {
    try {
        const response = await api().post('/register', data);
        return response;
    } catch (err) {
        console.log(err);
    }
})
export const Login = createAsyncThunk('Login', async (data) => {
    try {
        const response = await api().post('/login', data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.isAuthenticated = false;
            localStorage.clear();
        }
    }, extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action) => {
            if (action.payload.accessToken) {
                state.isAuthenticated = true;
                localStorage.setItem('Token', action.payload.accessToken);
                localStorage.setItem('userId', action.payload.userId);
                localStorage.setItem('userName', action.payload.userName);
            } else {
                state.isAuthenticated = false;
            }
        })

    }
})
export const { logout } = auth.actions;
export default auth.reducer;