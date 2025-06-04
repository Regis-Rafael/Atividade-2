import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

    export const loadBooks = createAsyncThunk('books/load', async () => {
    const savedBooks = await AsyncStorage.getItem('@library_books');
    return savedBooks ? JSON.parse(savedBooks) : [];
    });

    const saveBooks = async (books) => {
    await AsyncStorage.setItem('@library_books', JSON.stringify(books));
    };

    const bookSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addBook: (state, action) => {
        state.items.push(action.payload);
        saveBooks(state.items);
        },
        updateBook: (state, action) => {
        const index = state.items.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
            state.items[index] = action.payload;
            saveBooks(state.items);
        }
        },
        deleteBook: (state, action) => {
        state.items = state.items.filter(book => book.id !== action.payload);
        saveBooks(state.items);
        },
        toggleAvailability: (state, action) => {
        const index = state.items.findIndex(b => b.id === action.payload);
        if (index !== -1) {
            state.items[index].disponivel = !state.items[index].disponivel;
            saveBooks(state.items);
        }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadBooks.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadBooks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(loadBooks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export const { addBook, updateBook, deleteBook, toggleAvailability } = bookSlice.actions;
export default bookSlice.reducer;