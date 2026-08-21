import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Slider,
  IconButton, Chip, LinearProgress, List, ListItem, ListItemText,
  Divider, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab
} from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const INIT_PRESETS = [
  { id: 'p1', name: 'Pomodoro chuẩn', work: 25, short: 5,  long: 15 },
  { id: 'p2', name: 'Sprint dài',     work: 50, short: 10, long: 20 },
  { id: 'p3', name: 'Ôn nhanh',       work: 15, short: 3,  long: 10 },
];

const INIT_HISTORY = [
  { label: 'Giải tích — chương 5', duration: 25, done: true,  ts: '08:30' },
  { label: 'Python OOP',           duration: 25, done: true,  ts: '09:05' },
  { label: 'Vật lý điện trường',   duration: 50, done: false, ts: '09:40' },
];

const MODE_CONFIG = {
  work:       { label: 'Học tập',   color: '#0F4C81', bg: '#EFF6FF' },
  shortBreak: { label: 'Nghỉ ngắn', color: '#16A34A', bg: '#F0FDF4' },
  longBreak:  { label: 'Nghỉ dài',  color: '#0284C7', bg: '#F0F9FF' },
};

function CircularTimer({ progress, color, children }) {
  const r = 110, circ = 2 * Math.PI * r;
  return (
    <Box sx={{ position: 'relative', width: 280, height: 280, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle, ${color}0A 0%, transparent 70%)` }} />
      <svg width="260" height="260" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="130" cy="130" r={r} fill="none" stroke="currentColor" strokeWidth="8" style={{ color: 'var(--mui-palette-divider)' }} />
        <circle cx="130" cy="130" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.9s linear' }}
        />
      </svg>
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
      </Box>
    </Box>
  );
}

export default function Pomodoro() {
  const [tab, setTab]           = useState(0);
  const [workMin, setWorkMin]   = useState(25);
  const [shortMin, setShortMin] = useState(5);
  const [longMin, setLongMin]   = useState(15);
  const [mode, setMode]         = useState('work');
  const [seconds, setSeconds]   = useState(25 * 60);
  const [running, setRunning]   = useState(false);
  const [cycle, setCycle]       = useState(1);
  const [history, setHistory]   = useState(INIT_HISTORY);
  const [presets, setPresets]   = useState(INIT_PRESETS);
  const [presetOpen, setPresetOpen] = useState(false);
  const [newPreset, setNewPreset]   = useState({ name: '', work: 25, short: 5, long: 15 });

  const timerRef = useRef(null);
  const tick = () => setSeconds(s => s > 0 ? s - 1 : 0);

  useEffect(() => {
    if (running) { timerRef.current = setInterval(tick, 1000); }
    else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds === 0 && running) {
      setRunning(false);
      if (mode === 'work') {
        const h = new Date();
        setHistory(curr => [{ label: 'Phiên học tự do', duration: workMin, done: true, ts: `${String(h.getHours()).padStart(2,'0')}:${String(h.getMinutes()).padStart(2,'0')}` }, ...curr]);
        if (cycle % 4 === 0) setMode('longBreak'); else setMode('shortBreak');
      } else {
        if (mode === 'shortBreak' || mode === 'longBreak') setCycle(c => c + 1);
        setMode('work');
      }
    }
  }, [seconds, running, mode, cycle, workMin]);

  useEffect(() => {
    setRunning(false);
    if (mode === 'work') setSeconds(workMin * 60);
    if (mode === 'shortBreak') setSeconds(shortMin * 60);
    if (mode === 'longBreak') setSeconds(longMin * 60);
  }, [mode, workMin, shortMin, longMin]);

  const toggle = () => setRunning(!running);
  const reset = () => { setRunning(false); setSeconds((mode==='work'?workMin:mode==='shortBreak'?shortMin:longMin)*60); };
  const skip = () => setSeconds(0);

  const m = Math.floor(seconds / 60), s = seconds % 60;
  const mm = String(m).padStart(2, '0'), ss = String(s).padStart(2, '0');
  const totalSec = (mode === 'work' ? workMin : mode === 'shortBreak' ? shortMin : longMin) * 60;
  const progress = totalSec > 0 ? (totalSec - seconds) / totalSec : 0;
  const conf = MODE_CONFIG[mode];

  return (
    <Box maxWidth={800} mx="auto">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Pomodoro</Typography>
        <Tabs value={tab} onChange={(e,v)=>setTab(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5, borderRadius: 2 } }}>
          <Tab label="Timer" />
          <Tab label="Cài đặt" />
          <Tab label="Lịch sử" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Card sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }} elevation={0}>
          <Box sx={{ height: 6, bgcolor: conf.color, width: '100%', transition: 'background-color 0.3s' }} />
          <CardContent sx={{ p: '40px !important', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
              {Object.entries(MODE_CONFIG).map(([k, c]) => (
                <Chip key={k} label={c.label} onClick={() => setMode(k)}
                  sx={{
                    bgcolor: mode === k ? c.color : 'transparent', color: mode === k ? '#fff' : 'text.secondary',
                    fontWeight: mode === k ? 600 : 500, border: '1px solid', borderColor: mode === k ? c.color : 'divider',
                    px: 1, transition: 'all 0.2s',
                  }} />
              ))}
            </Box>
            <CircularTimer progress={progress} color={conf.color}>
              <Typography variant="h1" fontWeight={700} sx={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '-2px', color: 'text.primary', lineHeight: 1 }}>
                {mm}:{ss}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Chu kỳ {cycle}
              </Typography>
            </CircularTimer>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
              <IconButton onClick={reset} sx={{ width: 56, height: 56, border: '1px solid', borderColor: 'divider' }}>
                <ReplayRoundedIcon />
              </IconButton>
              <IconButton onClick={toggle} sx={{ width: 80, height: 80, bgcolor: conf.color, color: '#fff', '&:hover': { bgcolor: conf.color, opacity: 0.9 }, boxShadow: `0 8px 24px ${conf.color}40` }}>
                {running ? <PauseRoundedIcon sx={{ fontSize: 40 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 40 }} />}
              </IconButton>
              <IconButton onClick={skip} sx={{ width: 56, height: 56, border: '1px solid', borderColor: 'divider' }}>
                <SkipNextRoundedIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      )}
      {tab === 1 && (
        <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider' }} elevation={0}><CardContent>
          <Typography variant="h6" fontWeight={700} mb={3}>Cài đặt thời gian</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box mb={4}>
                <Typography variant="subtitle2" mb={1} color="#0F4C81" fontWeight={600}>Học tập ({workMin}p)</Typography>
                <Slider value={workMin} onChange={(_,v)=>setWorkMin(v)} min={5} max={90} step={5} marks sx={{ color: '#0F4C81' }} />
              </Box>
              <Box mb={4}>
                <Typography variant="subtitle2" mb={1} color="#16A34A" fontWeight={600}>Nghỉ ngắn ({shortMin}p)</Typography>
                <Slider value={shortMin} onChange={(_,v)=>setShortMin(v)} min={1} max={15} step={1} marks sx={{ color: '#16A34A' }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={1} color="#0284C7" fontWeight={600}>Nghỉ dài ({longMin}p)</Typography>
                <Slider value={longMin} onChange={(_,v)=>setLongMin(v)} min={5} max={45} step={5} marks sx={{ color: '#0284C7' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" fontWeight={700}>Preset</Typography>
                <Button size="small" startIcon={<AddRoundedIcon />} onClick={()=>setPresetOpen(true)}>Thêm</Button>
              </Box>
              <List disablePadding>
                {presets.map((p, i) => (
                  <React.Fragment key={p.id}>
                    <ListItem disableGutters secondaryAction={
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Button size="small" onClick={()=>{setWorkMin(p.work);setShortMin(p.short);setLongMin(p.long);}}>Dùng</Button>
                        <IconButton size="small" onClick={()=>setPresets(ps=>ps.filter(x=>x.id!==p.id))}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
                      </Box>
                    }>
                      <ListItemText primary={p.name} secondary={`${p.work}p · ${p.short}p · ${p.long}p`} primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }} />
                    </ListItem>
                    {i < presets.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent></Card>
      )}

      {tab === 2 && (
        <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider' }} elevation={0}><CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>Hôm nay</Typography>
          <List disablePadding>
            {history.map((s, i) => (
              <React.Fragment key={i}>
                <ListItem disableGutters>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: s.done ? 'success.main' : 'text.disabled', mr: 2 }} />
                  <ListItemText primary={s.label} secondary={`${s.ts} · ${s.duration} phút`} primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }} />
                  <Chip label={s.done ? 'Hoàn thành' : 'Bỏ lỡ'} size="small" color={s.done ? 'success' : 'default'} sx={{ height: 22, fontSize: 11, fontWeight: 600 }} />
                </ListItem>
                {i < history.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent></Card>
      )}
      
      <Dialog open={presetOpen} onClose={()=>setPresetOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Tạo preset</DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column', gap:2, pt: '12px !important' }}>
          <TextField label="Tên preset" fullWidth value={newPreset.name} onChange={e=>setNewPreset(p=>({...p,name:e.target.value}))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setPresetOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={()=>{ setPresets(p=>[...p,{...newPreset, id:`p${Date.now()}`}]); setPresetOpen(false); }}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}