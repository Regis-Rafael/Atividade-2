import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './BookService';
import feedbackReducer from './FeedbackService';

export default configureStore({
    reducer: {
        books: bookReducer,
        feedback: feedbackReducer
    }
});