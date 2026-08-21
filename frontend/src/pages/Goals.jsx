import React from 'react';
import { Box, Typography, Grid, Card, CardContent, LinearProgress, Chip, Avatar } from '@mui/material';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';

// ponytail: mock — thay bằng gamification API
const BADGES = [
  { id: 'b1', icon: '🔥', label: 'Streak 7 ngày',    earned: true,  color: '#FDB813' },
  { id: 'b2', icon: '📚', label: '50 ghi chú',        earned: true,  color: '#0F4C81' },
  { id: 'b3', icon: '🏆', label: 'Quiz 100%',         earned: false, color: '#16A34A' },
  { id: 'b4', icon: '⚡', label: 'Streak 30 ngày',    earned: false, color: '#DC2626' },
  { id: 'b5', icon: '🌟', label: '10 ngày liên tiếp', earned: true,  color: '#0284C7' },
  { id: 'b6', icon: '🤝', label: 'Chia sẻ 5 note',    earned: false, color: '#7C3AED' },
];

const GOALS = [
  { id: 'g1', label: 'Hoàn thành Giải tích',   progress: 68, target: '30/06',   color: '#0F4C81' },
  { id: 'g2', label: 'Ôn 200 flashcard/tháng', progress: 55, target: '200 thẻ', color: '#FDB813' },
  { id: 'g3', label: 'Duy trì streak 30 ngày', progress: 40, target: '30 ngày', color: '#16A34A' },
];

const STREAK_DAYS = [true, true, true, false, true, true, true, true, true, false, true, true, true, true];

export default function Goals() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Mục tiêu & Thành tích</Typography>
      <Grid container spacing={3}>
        {/* Streak */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: '14px', border: '1px solid', borderColor: 'divider' }} elevation={0}>
            <CardContent sx={{ p: '24px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#FDB81318', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LocalFireDepartmentRoundedIcon sx={{ color: '#FDB813', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700} color="#FDB813" sx={{ lineHeight: 1.1 }}>12</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>ngày streak</Typography>
                </Box>
              </Box>
              <Typography variant="body2" fontWeight={600} mb={1.5}>Lịch sử 14 ngày qua</Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {STREAK_DAYS.map((active, i) => (
                  <Box key={i} sx={{ width: 26, height: 26, borderRadius: '8px', bgcolor: active ? '#FDB813' : 'background.subtle', border: '1px solid', borderColor: active ? '#FDB813' : 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: 9, color: active ? '#fff' : 'text.disabled', fontWeight: 700 }}>{i + 5}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Goals */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: '14px', border: '1px solid', borderColor: 'divider', height: '100%' }} elevation={0}>
            <CardContent sx={{ p: '24px !important' }}>
              <Typography variant="h6" fontWeight={700} mb={3}>Mục tiêu học tập</Typography>
              {GOALS.map(goal => (
                <Box key={goal.id} mb={3} sx={{ '&:last-child': { mb: 0 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>{goal.label}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={goal.target} size="small" variant="outlined" sx={{ height: 20, fontSize: 11, fontWeight: 500 }} />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>{goal.progress}%</Typography>
                    </Box>
                  </Box>
                  <LinearProgress variant="determinate" value={goal.progress}
                    sx={{ height: 8, borderRadius: 4, bgcolor: goal.color + '22', '& .MuiLinearProgress-bar': { bgcolor: goal.color, borderRadius: 4 } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Badges */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '14px', border: '1px solid', borderColor: 'divider' }} elevation={0}>
            <CardContent sx={{ p: '24px !important' }}>
              <Typography variant="h6" fontWeight={700} mb={3}>Huy hiệu</Typography>
              <Grid container spacing={2}>
                {BADGES.map(badge => (
                  <Grid item xs={6} sm={4} md={2} key={badge.id}>
                    <Box sx={{ textAlign: 'center', opacity: badge.earned ? 1 : 0.4, transition: 'transform 0.2s', '&:hover': { transform: badge.earned ? 'scale(1.05)' : 'none' } }}>
                      <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 1.5, bgcolor: badge.color + (badge.earned ? '18' : '00'), fontSize: 32, border: badge.earned ? '2px solid' : '2px dashed', borderColor: badge.earned ? badge.color : 'divider' }}>
                        {badge.icon}
                      </Avatar>
                      <Typography variant="caption" color={badge.earned ? 'text.primary' : 'text.disabled'} fontWeight={badge.earned ? 600 : 500} display="block">
                        {badge.label}
                      </Typography>
                      {badge.earned && <Chip label="Đạt được" size="small" sx={{ mt: 0.5, height: 18, fontSize: 9, bgcolor: '#16A34A18', color: '#16A34A', fontWeight: 700 }} />}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}