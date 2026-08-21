import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './theme/index';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import Review from './pages/Review';
import CalendarPage from './pages/CalendarPage';
import Groups from './pages/Groups';
import Community from './pages/Community';
import Goals from './pages/Goals';
import Pomodoro from './pages/Pomodoro';

import AiChatbot from './pages/AiChatbot';

export default function App() {
  const themeMode = useSelector((s) => s.ui?.themeMode || 'light');
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        <Routes>
          <Route path="/"           element={<Dashboard />} />
          <Route path="/notes"      element={<Notes />} />
          <Route path="/notes/:id"  element={<NoteDetail />} />
          <Route path="/review"     element={<Review />} />
          <Route path="/calendar"   element={<CalendarPage />} />
          <Route path="/pomodoro"   element={<Pomodoro />} />
          <Route path="/groups"     element={<Groups />} />
          <Route path="/community"  element={<Community />} />
          <Route path="/chatbot"    element={<AiChatbot />} />
          <Route path="/goals"      element={<Goals />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}
