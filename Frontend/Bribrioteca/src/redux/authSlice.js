// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://192.168.80.56:8000/api/usuarios';

// Thunk para registrar usuário
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, senha }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, senha });
      return response.data.message;
    } catch (err) {
      console.log('Erro no registro:', err);
      return thunkAPI.rejectWithValue(err.response?.data || { error: 'Erro desconhecido' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, senha }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      return response.data.user;
    } catch (err) {
      console.log('Erro no login:', err);
      return thunkAPI.rejectWithValue(err.response?.data || { error: 'Erro desconhecido' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    registerSuccessMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.registerSuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccessMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerSuccessMessage = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Falha no registro:', action.payload.error || 'Falha no registro');
        state.loading = false;
        state.error = action.payload.error || 'Falha no registro';
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Falha no login:', action.payload.error || 'Falha no login');
        state.loading = false;
        state.error = action.payload.error || 'Falha no login';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

