---
version: "3.1"
name: OmniLearn — IUH Edition
description: >
  Nền tảng học tập cộng đồng SV Đại học Công nghiệp TP.HCM.
  Visual language từ bộ nhận diện IUH 2024: xanh navy tri thức + vàng gold năng lượng,
  ba mũi tên hướng lên (Innovation – Unity – Humanity), chữ I cách điệu.

colors:
  primary:           "#0F4C81"
  primary-light:     "#3A72A8"
  primary-dark:      "#072D52"
  primary-surface:   "#EFF6FF"
  secondary:         "#FDB813"
  secondary-light:   "#FDD05A"
  secondary-dark:    "#C48A00"
  secondary-surface: "#FFFBEB"
  success:           "#16A34A"
  warning:           "#D97706"
  error:             "#DC2626"
  info:              "#0284C7"
  bg-page:           "#F8FAFC"
  bg-surface:        "#FFFFFF"
  bg-subtle:         "#EFF6FF"
  border:            "#E2E8F0"
  dark-bg-page:      "#0B0F17"
  dark-bg-surface:   "#1E293B"
  dark-bg-subtle:    "#0F2040"
  dark-border:       "#334155"
  text-primary:      "#0F172A"
  text-secondary:    "#64748B"
  text-disabled:     "#CBD5E1"
  dark-text-primary:    "#F8FAFC"
  dark-text-secondary:  "#94A3B8"
  dark-primary-accent:  "#38BDF8"
  bubble-mine-bg:    "#0F4C81"
  bubble-mine-text:  "#FFFFFF"
  bubble-other-bg:   "#F1F5F9"
  bubble-other-text: "#0F172A"

typography:
  display:
    fontFamily: "Inter"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  heading-xl:
    fontFamily: "Inter"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  heading-lg:
    fontFamily: "Inter"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  heading-md:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  label-md:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
  label-sm:
    fontFamily: "Inter"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.03em"
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"

rounded:
  none: "0"
  sm:   "6px"
  md:   "10px"
  lg:   "14px"
  xl:   "20px"
  2xl:  "28px"
  full: "9999px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.bg-surface}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
  sidebar-item-active:
    backgroundColor: "{colors.primary-surface}"
    textColor: "{colors.primary}"
  sidebar-item-default:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
  chat-bubble-mine:
    backgroundColor: "{colors.bubble-mine-bg}"
    textColor: "{colors.bubble-mine-text}"
    rounded: "18px 18px 4px 18px"
    padding: "10px 14px"
  chat-bubble-other:
    backgroundColor: "{colors.bubble-other-bg}"
    textColor: "{colors.bubble-other-text}"
    rounded: "18px 18px 18px 4px"
    padding: "10px 14px"
  badge-streak:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.full}"
  input:
    backgroundColor: "{colors.bg-surface}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "40px"
---

# OmniLearn — IUH Edition

## Overview

**Trường:** Đại học Công nghiệp TP.HCM (IUH)
**Sứ mệnh:** Innovation – Unity – Humanity (Đổi mới sáng tạo – Đoàn kết – Nhân văn)

**Ý nghĩa bộ nhận diện IUH 2024:**
- **Bảng màu Xanh – Vàng:** Navy = tri thức + tin cậy. Gold = năng lượng tích cực + phát triển bền vững trong kỷ nguyên số.
- **Chữ "I" cách điệu:** "Industrial" (nền tảng lịch sử) × "Innovation" (sứ mệnh đổi mới sáng tạo).
- **Ba mũi tên hướng lên:** Innovation – Unity – Humanity. Mũi tên đầu tiên hình máy bay cất cánh — khát vọng vươn xa.

**OmniLearn** là cộng đồng học tập riêng SV IUH: feed hỏi đáp, chat nhóm, ghi chú AI, ôn tập spaced repetition, lịch học, Pomodoro.

**Cảm giác:** Thân thiện + học thuật + năng động. SV cảm thấy đây là *không gian của mình*, không phải cổng thông tin trường.

**Audience:** SV 18–25, mobile-first, expect tốc độ + feedback ngay lập tức.

---

## Colors

### Primary — Navy IUH `#0F4C81`
Màu chủ đạo: header, sidebar, nút chính, active state, border nhấn.
Tri thức + tin cậy — đồng nhất với áo đồng phục và banner IUH.

- `primary-light #3A72A8` — hover, secondary button, link
- `primary-dark #072D52` — pressed, heading tối, footer
- `primary-surface #EFF6FF` — active sidebar bg, tag tint

### Secondary — Gold IUH `#FDB813`
Accent duy nhất — tối đa 10% diện tích màn hình.
Năng lượng tích cực, phát triển bền vững.

- `secondary-light #FDD05A` — tint nhẹ, badge mờ
- `secondary-dark #C48A00` — text trên nền sáng (contrast 4.5:1 đạt)
- Dùng cho: streak 🔥, XP badge, progress bar thành tích

### Dark Mode
- Primary accent: `#38BDF8` (sky-400) thay navy — đủ contrast trên dark surface.
- Gold `#FDB813` giữ nguyên cả 2 mode.
- Surface dark: `#1E293B` — không đen tuyệt đối, giảm mỏi mắt.

### Nguyên tắc contrast
- Text normal ≥ 4.5:1 (WCAG AA)
- **KHÔNG** đặt text gold `#FDB813` trên nền trắng — contrast chỉ 2.3:1, thất bại

---

## Typography

**Inter** — body + heading. Tối ưu màn hình kỹ thuật số, hỗ trợ đầy đủ tiếng Việt.
**JetBrains Mono** — code snippet, timestamp kỹ thuật.

Scale: 11 / 12 / 13(code) / 14 / 16 / 18 / 20 / 24 / 32px
Line-height: 1.6 body (dễ đọc tiếng Việt có dấu) / 1.2–1.35 heading
Letter-spacing: −0.03em display, 0.03em label-sm (legibility chữ nhỏ)

---

## Layout

```
Breakpoints:
  mobile:  < 768px   — sidebar ẩn, bottom nav 4 tab
  tablet:  768–1024  — sidebar icon-only 72px
  desktop: > 1024px  — sidebar full 240px (toggle-able)

AppLayout (flex row):
  Topbar sticky 64px — [Logo] [Search] [🔔] [Avatar]
  Sidebar permanent, Drawer variant="permanent"
  Main: flex:1, minWidth:0, max-width 1200px, centered

Sidebar:
  Expanded:  240px — logo + label + unread badge
  Collapsed: 72px  — icon only, tooltip on hover
  Active:    left border 3px {colors.primary} + bg {colors.primary-surface}

Page padding: mobile 16px / tablet 24px / desktop 32px
Feed max-width: 680px (reading comfort, tiếng Việt)

Bottom nav mobile (4 tab): Trang chủ | Cộng đồng | Tin nhắn | Hồ sơ
```

---

## Elevation & Depth

```
card-resting:  0 1px 3px rgba(0,0,0,0.08)
card-hover:    0 4px 12px rgba(15,76,129,0.12)   ← navy tint — brand-aware shadow
modal:         0 20px 60px rgba(0,0,0,0.15)
topbar:        0 1px 0 {colors.border}            ← flat separator

Hover: border-color → navy 30% + shadow / transition 200ms ease
```

Không dùng shadow nặng kiểu SaaS tối — giữ flat academic vibe.

---

## Shapes

```
avatar / badge / chip: 9999px (full pill)
button / input:        10px
card / modal section:  14px
modal / sheet:         20px
notification drawer:   28px (top corners)
```

**Motif IUH — ba mũi tên hướng lên:**
Dùng `↗` hoặc icon máy bay ✈ cho empty state, achievement, onboarding.
Không lạm dụng — chỉ xuất hiện ở moments có ý nghĩa.

---

## Components

### Button
- Primary: bg navy, text trắng / height 40px / radius 10px / padding 10×20px
- Outlined: navy border + text / bg transparent
- Text: navy text / no border / hover tint
- Danger: bg `#DC2626` / text trắng
- Sizes: sm 32px / md 40px / lg 48px
- Loading: spinner inline, opacity 0.7, disabled cursor

### Card Post
- `border: 1px solid #E2E8F0` / radius 14px / padding 20×24px
- Row: [avatar 40px] [tên · timestamp] [badge category] [···]
- Content preview → gallery ảnh nếu có
- Action row: 👍count 💬count 🔖 [···]
- Hover: border → navy 30%, shadow navy tint, 200ms ease

### Sidebar Item
- Active: `border-left: 3px solid #0F4C81` / bg `#EFF6FF` / text+icon navy
- Default: text-secondary, hover bg-subtle

### Chat Bubble
- Mine: bg `#0F4C81`, text trắng, radius `18px 18px 4px 18px`
- Other: bg `#F1F5F9`, text `#0F172A`, radius `18px 18px 18px 4px`
- System: centered, text-secondary, italic, no bubble background

### Skeleton Loader
- Shimmer: `#E2E8F0 → #F8FAFC → #E2E8F0` / animate 1.5s linear infinite
- Dùng cho post card, avatar, conversation list — không dùng spinner

### Micro-interactions
- Reaction: hover → popup 6 emoji 200ms / click → bounce + count +1 (optimistic)
- Bookmark: icon fill animate trống → đầy
- Send bubble: translateY 10→0px 150ms
- Streak tăng: confetti nhỏ, 1 lần/ngày
- Sidebar collapse: width 200ms ease, label fade out

---

## Do's and Don'ts

**DO:**
- Navy + gold là ngôn ngữ thị giác chủ đạo — không thêm accent màu thứ ba
- Gold ≤ 10% diện tích — chỉ nhấn, không làm background rộng
- Skeleton loader trước data / optimistic update sau click
- Contrast ≥ 4.5:1, focus ring `:focus-visible` visible
- Tiếng Việt tự nhiên — "Trang chủ" không phải "TRANG CHỦ"
- Mũi tên ↗ / ✈ cho achievement, onboarding — đồng điệu logo IUH

**DON'T:**
- Không purple, không AI-gradient cliché (mesh/aurora) — lạc brand IUH
- Không text gold `#FDB813` trên trắng — contrast 2.3:1, thất bại WCAG
- Không shadow nặng SaaS dark — giữ flat academic
- Không tạo variant component mới khi đã có variant phù hợp
- Không dùng Inter cho code — JetBrains Mono
- Không dùng 2 màu khác nhau cho sidebar và topbar
- Không animation vô mục đích
