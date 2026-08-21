import { createSlice } from '@reduxjs/toolkit';

// ponytail: mock data — thay bằng RTK Query + real API khi có backend
const MOCK_SUBJECTS = [
  {
    id: '1', name: 'Giải tích', color: '#3B82F6', icon: '∫',
    sessions: [
      { id: 's1', title: 'Giới hạn hàm số', status: 'ready', createdAt: '2026-08-15' },
      { id: 's2', title: 'Đạo hàm cơ bản',  status: 'ready', createdAt: '2026-08-16' },
      { id: 's3', title: 'Tích phân xác định', status: 'processing', createdAt: '2026-08-18' },
    ],
  },
  {
    id: '2', name: 'Vật lý đại cương', color: '#7C3AED', icon: '⚡',
    sessions: [
      { id: 's4', title: 'Cơ học Newton', status: 'ready', createdAt: '2026-08-14' },
      { id: 's5', title: 'Điện trường', status: 'pending', createdAt: '2026-08-18' },
    ],
  },
  {
    id: '3', name: 'Lập trình Python', color: '#10B981', icon: '🐍',
    sessions: [
      { id: 's6', title: 'List comprehension', status: 'ready', createdAt: '2026-08-13' },
    ],
  },
];

const librarySlice = createSlice({
  name: 'library',
  initialState: {
    subjects: MOCK_SUBJECTS,
    activeSubjectId: null,
    activeSessionId: null,
  },
  reducers: {
    setActiveSubject(state, action) { state.activeSubjectId = action.payload; },
    setActiveSession(state, action) { state.activeSessionId = action.payload; },
    addSubject(state, action) { state.subjects.push(action.payload); },
    addSession(state, action) {
      const sub = state.subjects.find(s => s.id === action.payload.subjectId);
      if (sub) sub.sessions.push(action.payload.session);
    },
    updateSessionStatus(state, action) {
      const { sessionId, status } = action.payload;
      state.subjects.forEach(sub => {
        const sess = sub.sessions.find(s => s.id === sessionId);
        if (sess) sess.status = status;
      });
    },
  },
});

export const { setActiveSubject, setActiveSession, addSubject, addSession, updateSessionStatus } = librarySlice.actions;
export default librarySlice.reducer;
