import { configureStore } from "@reduxjs/toolkit";
import auth from './authSlice';
import post from './postSlice';

const store = configureStore({
    reducer: {
        auth,
        post
    }
})
export default store;