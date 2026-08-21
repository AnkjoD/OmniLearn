import { createSlice } from '@reduxjs/toolkit';

// Lưu preference vào localStorage
const saved = localStorage.getItem('themeMode');

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    themeMode: saved === 'dark' ? 'dark' : 'light',   // 'light' | 'dark'
    sidebarOpen: true,
  },
  reducers: {
    toggleTheme(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.themeMode);
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { toggleTheme, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
