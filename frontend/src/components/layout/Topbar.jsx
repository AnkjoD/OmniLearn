import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Box, Tooltip, InputBase, Avatar, Badge } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { toggleTheme, setSidebarOpen } from '../../store/uiSlice';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED } from './Sidebar';

export default function Topbar() {
  const dispatch = useDispatch();
  const { themeMode, sidebarOpen } = useSelector((s) => s.ui);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        ml: `${sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED}px`,
        width: `calc(100% - ${sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED}px)`,
        transition: 'margin 0.2s, width 0.2s',
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', gap: 1 }}>
        <IconButton onClick={() => dispatch(setSidebarOpen(!sidebarOpen))} size="small">
          <MenuRoundedIcon />
        </IconButton>

        {/* Search bar */}
        <Box
          sx={{
            flex: 1, maxWidth: 480,
            display: 'flex', alignItems: 'center', gap: 1,
            bgcolor: 'background.default', border: '1px solid', borderColor: 'divider',
            borderRadius: '10px', px: 1.5, height: 36,
            '&:focus-within': { borderColor: 'primary.main', boxShadow: '0 0 0 3px rgba(15,76,129,0.12)' },
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
          <InputBase placeholder="Tìm kiếm ghi chú, nhóm, bài viết…" sx={{ flex: 1, fontSize: 14 }} />
        </Box>

        <Box sx={{ flex: 1 }} />

        <Tooltip title={themeMode === 'dark' ? 'Chuyển sáng' : 'Chuyển tối'}>
          <IconButton onClick={() => dispatch(toggleTheme())} size="small">
            {themeMode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Thông báo">
          <IconButton size="small">
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}>
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Nguyễn Nam">
          <Avatar
            sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 13, cursor: 'pointer',
                  color: 'secondary.contrastText' }}
          >NN</Avatar>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
