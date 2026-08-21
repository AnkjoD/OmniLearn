// ── Theme chính — import file này vào App.jsx ──────────────────────────────────
// Để chỉnh màu: sửa palette.js
// Để chỉnh font: sửa typography.js
// Để chỉnh component: sửa components.js

import { createTheme } from '@mui/material/styles';
import { BRAND, LIGHT_BG, DARK_BG, TEXT_LIGHT, TEXT_DARK } from './palette';
import typography from './typography';
import components, { SHAPE } from './components';

// ── Light theme ────────────────────────────────────────────────────────────────
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...BRAND,
    background: LIGHT_BG,
    text: TEXT_LIGHT,
    divider: '#E2E8F0',   // --border light
  },
  typography,
  shape: SHAPE,
  components,
});

// ── Dark theme ─────────────────────────────────────────────────────────────────
// Dark mode dùng --primary: #38BDF8 (sky-400) thay navy để đủ contrast
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...BRAND,
    primary: {
      main:         '#38BDF8',   // --primary dark (sky-400)
      light:        '#7DD3FC',
      dark:         '#0284C7',
      contrastText: '#0F172A',
    },
    background: DARK_BG,
    text: TEXT_DARK,
    divider: '#334155',   // --border dark
  },
  typography,
  shape: SHAPE,
  components,
});

