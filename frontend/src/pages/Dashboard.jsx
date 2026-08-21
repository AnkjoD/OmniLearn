import React, { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Box, LinearProgress,
  Chip, List, ListItem, ListItemText, Divider, Button, IconButton,
} from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { useNavigate } from 'react-router-dom';

// ponytail: mock data — kết nối API khi có backend
const STATS = [
  { label: 'Streak hiện tại',  value: '12 ngày', icon: '🔥', color: '#FDB813', bg: '#FDB81318' },
  { label: 'Ghi chú đã tạo',   value: '47',      icon: '📝', color: '#0F4C81', bg: '#0F4C8118' },
  { label: 'Quiz hoàn thành',  value: '128',     icon: '✅', color: '#16A34A', bg: '#16A34A18' },
  { label: 'Giờ học tuần này', value: '9.5h',    icon: '⏱', color: '#0284C7', bg: '#0284C718' },
];

const SUBJECTS_PROGRESS = [
  { name: 'Giải tích',        color: '#3B82F6', progress: 68, dueToday: 3 },
  { name: 'Vật lý đại cương', color: '#7C3AED', progress: 45, dueToday: 5 },
  { name: 'Lập trình Python', color: '#10B981', progress: 82, dueToday: 1 },
];

const INIT_TASKS = [
  { id: 1, text: 'Ôn 10 flashcard Giải tích',      done: true  },
  { id: 2, text: 'Xem video Điện trường (Vật lý)', done: false },
  { id: 3, text: 'Làm quiz chương 3 Python',        done: false },
  { id: 4, text: 'Đọc note: Đạo hàm cơ bản',       done: true  },
];

const RECENT_NOTES = [
  { id: 'n1', title: 'Giới hạn hàm số',   subject: 'Giải tích',        time: '2 giờ trước'  },
  { id: 'n2', title: 'Cơ học Newton',      subject: 'Vật lý đại cương', time: 'Hôm qua'      },
  { id: 'n3', title: 'List comprehension', subject: 'Python',           time: '2 ngày trước' },
];

const QUICK_ACTIONS = [
  { label: 'Ôn tập ngay', path: '/review',    emoji: '🎯' },
  { label: 'Ghi chú mới', path: '/notes',     emoji: '📝' },
  { label: 'Pomodoro',    path: '/pomodoro',  emoji: '⏱' },
  { label: 'Cộng đồng',  path: '/community', emoji: '💬' },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Chào buổi sáng';
  if (h < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

function StatCard({ stat }) {
  return (
    <Card
      sx={{
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': { borderColor: stat.color + '60', boxShadow: `0 4px 12px ${stat.color}20` },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '16px !important' }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: stat.bg, fontSize: 22, flexShrink: 0 }}>
          {stat.icon}
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.2 }}>{stat.value}</Typography>
          <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(INIT_TASKS);
  const doneCount = tasks.filter(t => t.done).length;
  const remaining = tasks.length - doneCount;
  const toggleTask = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <Box>
      {/* Hero streak banner */}
      <Box sx={{ mb: 3, p: 2.5, borderRadius: '14px', background: 'linear-gradient(135deg, #0F4C81 0%, #072D52 100%)', color: '#fff', display: 'flex', alignItems: 'center', gap: 2, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', opacity: 0.08, fontSize: 80, lineHeight: 1, userSelect: 'none' }}>↗</Box>
        <Box sx={{ width: 52, height: 52, borderRadius: '50%', bgcolor: '#FDB813', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <LocalFireDepartmentRoundedIcon sx={{ color: '#072D52', fontSize: 28 }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: '#fff' }}>
            {greeting()}, Nguyễn Nam! 👋
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.25 }}>
            Streak <strong style={{ color: '#FDB813' }}>12 ngày</strong> liên tiếp ·{' '}
            {remaining > 0 ? `Còn ${remaining} task hôm nay` : 'Hoàn thành tất cả hôm nay 🎉'}
          </Typography>
        </Box>
        <Chip icon={<EmojiEventsRoundedIcon sx={{ fontSize: 16 }} />} label="750 XP"
          sx={{ bgcolor: '#FDB813', color: '#072D52', fontWeight: 700, flexShrink: 0 }} />
      </Box>

      {/* Quick actions */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {QUICK_ACTIONS.map(({ label, path, emoji }) => (
          <Button key={path} variant="outlined" onClick={() => navigate(path)}
            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 500, gap: 0.75, borderColor: 'divider', color: 'text.primary', '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main' + '08' } }}>
            <span>{emoji}</span> {label}
          </Button>
        ))}
      </Box>

      {/* Stat cards */}
      <Grid container spacing={2} mb={3}>
        {STATS.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}><StatCard stat={s} /></Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        {/* Tiến độ môn học */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Tiến độ môn học</Typography>
                <IconButton size="small" onClick={() => navigate('/review')} sx={{ color: 'primary.main' }}><ArrowForwardRoundedIcon fontSize="small" /></IconButton>
              </Box>
              {SUBJECTS_PROGRESS.map((sub) => (
                <Box key={sub.name} mb={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: sub.color }} />
                      <Typography variant="body2" fontWeight={500}>{sub.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {sub.dueToday > 0 && <Chip label={`${sub.dueToday} hôm nay`} size="small" color="warning" sx={{ height: 20, fontSize: 11, '& .MuiChip-label': { px: 0.75 } }} />}
                      <Typography variant="caption" color="text.secondary">{sub.progress}%</Typography>
                    </Box>
                  </Box>
                  <LinearProgress variant="determinate" value={sub.progress} sx={{ '& .MuiLinearProgress-bar': { bgcolor: sub.color } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Task hôm nay — clickable toggle + progress bar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600}>Task hôm nay</Typography>
                <Typography variant="caption" color="text.secondary">{doneCount}/{tasks.length}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(doneCount / tasks.length) * 100} color="success" sx={{ mb: 1.5 }} />
              <List dense disablePadding>
                {tasks.map((t, i) => (
                  <React.Fragment key={t.id}>
                    <ListItem disableGutters onClick={() => toggleTask(t.id)}
                      sx={{ cursor: 'pointer', borderRadius: 1, '&:hover': { bgcolor: 'background.default' } }}>
                      {t.done
                        ? <CheckCircleOutlineRoundedIcon sx={{ color: 'success.main', mr: 1, fontSize: 20, flexShrink: 0 }} />
                        : <RadioButtonUncheckedRoundedIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 20, flexShrink: 0 }} />}
                      <ListItemText primary={t.text} primaryTypographyProps={{ variant: 'body2', sx: { textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'text.secondary' : 'text.primary' } }} />
                    </ListItem>
                    {i < tasks.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Ghi chú gần đây */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600}>Ghi chú gần đây</Typography>
                <IconButton size="small" onClick={() => navigate('/notes')} sx={{ color: 'primary.main' }}><ArrowForwardRoundedIcon fontSize="small" /></IconButton>
              </Box>
              <List dense disablePadding>
                {RECENT_NOTES.map((n, i) => (
                  <React.Fragment key={n.id}>
                    <ListItem disableGutters onClick={() => navigate(`/notes/${n.id}`)}
                      sx={{ cursor: 'pointer', borderRadius: 1, '&:hover': { bgcolor: 'background.default' } }}>
                      <ListItemText primary={n.title} secondary={`${n.subject} · ${n.time}`}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        secondaryTypographyProps={{ variant: 'caption' }} />
                    </ListItem>
                    {i < RECENT_NOTES.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

