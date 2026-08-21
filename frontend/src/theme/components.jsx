// ── Component overrides ────────────────────────────────────────────────────────
// Chỉnh dáng component MUI mặc định ở đây (bo góc, shadow, padding…)

export const SHAPE = { borderRadius: 10 };  // bo góc toàn cục (px)

const components = {
  MuiButton: {
    defaultProps: { disableElevation: true, size: 'medium' },
    styleOverrides: {
      root: { borderRadius: 8, textTransform: 'none', fontWeight: 500 },
      sizeSmall: { padding: '4px 12px', fontSize: '0.8125rem' },
    },
  },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: { backgroundImage: 'none' },
      outlined: ({ theme }) => ({ borderColor: theme.palette.divider }),
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 6, fontWeight: 500 },
    },
  },
  MuiTextField: {
    defaultProps: { size: 'small', variant: 'outlined' },
  },
  MuiTooltip: {
    defaultProps: { arrow: true },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: { backgroundImage: 'none' },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: { borderRadius: 8, marginBottom: 2 },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: { borderRadius: 99, height: 6 },
    },
  },
};

export default components;
