import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postSlice from '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postSlice
  },
});
