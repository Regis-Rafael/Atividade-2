// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import BookReducer from './BookSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        livros: BookReducer,
    },
});

export default store;
