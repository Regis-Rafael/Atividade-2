import { createSlice } from '@reduxjs/toolkit';

const FeedbackService = createSlice({
    name: 'feedback',
    initialState: {
        modalVisible: false,
        modalMessage: '',
        modalType: 'success',
        deleteModalVisible: false,
        bookToDelete: null
    },
    reducers: {
        showModal: (state, action) => {
        state.modalVisible = true;
        state.modalMessage = action.payload.message;
        state.modalType = action.payload.type || 'success';
        },
        hideModal: (state) => {
        state.modalVisible = false;
        },
        showDeleteModal: (state, action) => {
        state.deleteModalVisible = true;
        state.bookToDelete = action.payload;
        },
        hideDeleteModal: (state) => {
        state.deleteModalVisible = false;
        state.bookToDelete = null;
        }
    }
});

export const { 
    showModal, 
    hideModal, 
    showDeleteModal, 
    hideDeleteModal 
} = FeedbackService.actions;

export default FeedbackService.reducer;