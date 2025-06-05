import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://192.168.80.56:8000/api';

// Buscar todos os livros
export const fetchLivros = createAsyncThunk(
  'livros/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/livros`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Falha ao buscar livros' });
    }
  }
);

// Adicionar livro
export const addLivro = createAsyncThunk(
  'livros/add',
  async (livroData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/livros`, livroData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Erro ao adicionar livro' });
    }
  }
);

// Editar livro
export const editLivro = createAsyncThunk(
  'livros/edit',
  async ({ id, ...livroData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/livros/${id}`, livroData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Erro ao editar livro' });
    }
  }
);

// Deletar livro
export const deleteLivro = createAsyncThunk(
  'livros/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/livros/${id}`);
      return id;
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Erro ao deletar livro' });
    }
  }
);

const BookSlice = createSlice({
  name: 'livros',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchLivros
      .addCase(fetchLivros.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLivros.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLivros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erro ao carregar livros';
      })

      // addLivro
      .addCase(addLivro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLivro.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addLivro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erro ao adicionar livro';
      })

      // editLivro
      .addCase(editLivro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editLivro.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(livro => livro._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editLivro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erro ao editar livro';
      })

      // deleteLivro
      .addCase(deleteLivro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLivro.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(livro => livro._id !== action.payload);
      })
      .addCase(deleteLivro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erro ao deletar livro';
      });
  },
});

export default BookSlice.reducer;
