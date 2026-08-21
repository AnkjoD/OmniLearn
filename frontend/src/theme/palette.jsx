// ── Bảng màu IUH chính thức ────────────────────────────────────────────────────
// Primary:  #0F4C81  — Xanh navy IUH (màu chủ đạo trường)
// Accent:   #FDB813  — Vàng gold IUH
// Dark primary: #38BDF8 — Sky blue (đủ contrast trên nền tối)
// Nguồn: IUH Brand Guidelines

export const BRAND = {
  primary: {
    main:         '#0F4C81',   // IUH navy
    light:        '#3A72A8',   // navy nhạt hơn
    dark:         '#072D52',   // navy đậm
    contrastText: '#FFFFFF',
  },
  secondary: {
    main:         '#FDB813',   // IUH gold
    light:        '#FDD05A',   // gold nhạt
    dark:         '#C48A00',   // gold đậm
    contrastText: '#0F172A',   // chữ tối trên nền vàng
  },
  success: { main: '#16A34A', light: '#4ADE80', dark: '#14532D', contrastText: '#fff' },
  warning: { main: '#D97706', light: '#FCD34D', dark: '#92400E', contrastText: '#fff' },
  error:   { main: '#DC2626', light: '#FCA5A5', dark: '#991B1B', contrastText: '#fff' },
  info:    { main: '#0284C7', light: '#7DD3FC', dark: '#075985', contrastText: '#fff' },
};

// Light mode — theo --bg-base, --bg-surface của IUH
export const LIGHT_BG = {
  default: '#F8FAFC',   // --bg-surface
  paper:   '#FFFFFF',   // --bg-base
  subtle:  '#EFF6FF',   // blue-50 — tint nhẹ navy
};

// Dark mode — theo --bg-base, --bg-surface dark
export const DARK_BG = {
  default: '#0B0F17',   // --bg-base dark (gần slate-950)
  paper:   '#1E293B',   // --bg-surface dark (slate-800)
  subtle:  '#0F2040',   // navy tối — tint brand
};

// Text — theo --text-main, --text-muted
export const TEXT_LIGHT = {
  primary:   '#0F172A',   // --text-main
  secondary: '#64748B',   // --text-muted
  disabled:  '#CBD5E1',
};

export const TEXT_DARK = {
  primary:   '#F8FAFC',   // --text-main dark
  secondary: '#94A3B8',   // --text-muted dark
  disabled:  '#475569',
};

