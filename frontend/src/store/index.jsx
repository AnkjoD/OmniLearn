import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import libraryReducer from './librarySlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    library: libraryReducer,
  },
});

export default store;
