import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Toolbar, Typography, Box, Tooltip, Divider, Avatar, Chip,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED = 64;

const NAV_ITEMS = [
  { label: 'Dashboard',        icon: <DashboardRoundedIcon />,      path: '/' },
  { label: 'Học tập & Ghi chú', icon: <MenuBookRoundedIcon />,       path: '/notes' },
  { label: 'Ôn tập',           icon: <QuizRoundedIcon />,           path: '/review' },
  { label: 'Lịch & Task',      icon: <CalendarMonthRoundedIcon />,  path: '/calendar' },
  { label: 'Pomodoro',         icon: <TimerRoundedIcon />,          path: '/pomodoro' },
  { label: 'Nhóm học',         icon: <GroupsRoundedIcon />,         path: '/groups' },
  { label: 'Cộng đồng',        icon: <ForumRoundedIcon />,          path: '/community' },
  { label: 'AI Chatbot',       icon: <SmartToyRoundedIcon />,       path: '/chatbot' },
  { label: 'Mục tiêu',         icon: <EmojiEventsRoundedIcon />,    path: '/goals' },
];

export default function Sidebar({ open }) {
  const location = useLocation();
  const width = open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        transition: 'width 0.2s',
        '& .MuiDrawer-paper': {
          width,
          overflowX: 'hidden',
          transition: 'width 0.2s',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        },
      }}
    >
      {/* Logo */}
      <Toolbar sx={{ px: open ? 2 : 1, minHeight: '64px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32, height: 32, borderRadius: 1.5,
              bgcolor: 'primary.main', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* IUH chữ I cách điệu — ba đường ngang biểu trưng ba mũi tên */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {[4, 6, 4].map((w, i) => (
                <Box key={i} sx={{ width: w, height: 2, bgcolor: '#FDB813', borderRadius: 1 }} />
              ))}
            </Box>
          </Box>
          {open && (
            <Typography variant="h6" fontWeight={700} noWrap sx={{ color: 'text.primary' }}>
              OmniLearn
            </Typography>
          )}
        </Box>
      </Toolbar>

      <Divider />

      <List sx={{ px: 1, pt: 1, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
          const btn = (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                selected={active}
                sx={{
                  minHeight: 44,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1.5,
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main' + '14', // primary-surface tint
                    color: 'primary.main',
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                    pl: `${1.5 * 8 - 3}px`,        // compensate border-left 3px
                    '& .MuiListItemIcon-root': { color: 'primary.main' },
                    '&:hover': { bgcolor: 'primary.main' + '20' },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 0,
                    justifyContent: 'center',
                    color: active ? 'inherit' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 400 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
          return open ? btn : (
            <Tooltip key={item.path} title={item.label} placement="right">
              {btn}
            </Tooltip>
          );
        })}
      </List>

      {/* User avatar bottom */}
      <Divider />
      <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 13, color: 'secondary.contrastText', flexShrink: 0 }}>NN</Avatar>
        {open && (
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>Nguyễn Nam</Typography>
            <Chip
              label="🔥 12 ngày"
              size="small"
              sx={{
                height: 18, fontSize: 11, fontWeight: 600,
                bgcolor: 'secondary.main', color: 'secondary.contrastText',
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
