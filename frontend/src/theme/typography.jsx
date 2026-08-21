// ── Typography ─────────────────────────────────────────────────────────────────
// Font: Inter (hệ thống) — dễ đọc bài dài, có sẵn trên Google Fonts
// Chỉnh font-family ở đây nếu muốn đổi

export const FONT_FAMILY =
  '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';

// Scale nhỏ-vừa — ưu tiên đọc dài, không quá lớn như landing page
const typography = {
  fontFamily: FONT_FAMILY,
  fontSize: 14,            // base 14px (Notion-style compact)
  h1: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.25 },
  h2: { fontSize: '1.5rem',   fontWeight: 700, lineHeight: 1.3  },
  h3: { fontSize: '1.25rem',  fontWeight: 600, lineHeight: 1.35 },
  h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4  },
  h5: { fontSize: '1rem',     fontWeight: 600, lineHeight: 1.4  },
  h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.4  },
  body1: { fontSize: '0.9375rem', lineHeight: 1.7 },  // nội dung ghi chú
  body2: { fontSize: '0.875rem',  lineHeight: 1.6 },
  caption: { fontSize: '0.75rem', lineHeight: 1.5 },
  overline: { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
};

export default typography;
