import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, IconButton,
  List, ListItem, ListItemText, Divider, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions, Chip, MenuItem,
  Select, FormControl, InputLabel,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const SUBJECTS    = ['Giải tích','Vật lý','Python','CTDL & GT','Tiếng Anh','Khác'];
const SUBJ_COLOR  = { 'Giải tích':'#0F4C81','Vật lý':'#16A34A','Python':'#D97706','CTDL & GT':'#7C3AED','Tiếng Anh':'#0284C7','Khác':'#64748B' };
const WEEK        = ['CN','T2','T3','T4','T5','T6','T7'];

function getCalDays(year, month) {
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month+1, 0).getDate();
  const cells = [];
  for (let i=0; i<first; i++) cells.push(null);
  for (let d=1; d<=total; d++) cells.push(d);
  return cells;
}

const TODAY = new Date();

const INIT_EVENTS = [
  { id:'e1', date:`${TODAY.getFullYear()}-${String(TODAY.getMonth()+1).padStart(2,'0')}-${String(TODAY.getDate()).padStart(2,'0')}`, title:'Quiz Vật lý chương 3', subject:'Vật lý' },
  { id:'e2', date:`${TODAY.getFullYear()}-${String(TODAY.getMonth()+1).padStart(2,'0')}-${String(Math.min(TODAY.getDate()+2,28)).padStart(2,'0')}`, title:'Nộp bài tập Giải tích', subject:'Giải tích' },
];
const INIT_TASKS = [
  { id:'t1', text:'Xem video Điện trường', done:false },
  { id:'t2', text:'Quiz chương 3 Python',  done:false },
  { id:'t3', text:'Ôn 15 flashcard',       done:true  },
];

export default function CalendarPage() {
  const [year,  setYear]    = useState(TODAY.getFullYear());
  const [month, setMonth]   = useState(TODAY.getMonth());
  const [events, setEvents] = useState(INIT_EVENTS);
  const [tasks,  setTasks]  = useState(INIT_TASKS);
  const [newTask, setNewTask] = useState('');
  const [selDay,  setSelDay]  = useState(null);
  const [evOpen,  setEvOpen]  = useState(false);
  const [draft,   setDraft]   = useState({ title:'', subject:'Giải tích' });

  const cells   = getCalDays(year, month);
  const dateKey = d => `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const eventsOn = d => events.filter(e => e.date===dateKey(d));
  const todayKey = `${TODAY.getFullYear()}-${String(TODAY.getMonth()+1).padStart(2,'0')}-${String(TODAY.getDate()).padStart(2,'0')}`;

  const prevMonth = () => { if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); };
  const nextMonth = () => { if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); };

  const addEvent = () => {
    if (!draft.title.trim()||!selDay) return;
    setEvents(es=>[...es,{id:`e${Date.now()}`,date:dateKey(selDay),title:draft.title,subject:draft.subject}]);
    setDraft({title:'',subject:'Giải tích'}); setEvOpen(false);
  };
  const addTask  = () => { if(!newTask.trim()) return; setTasks(ts=>[...ts,{id:`t${Date.now()}`,text:newTask,done:false}]); setNewTask(''); };
  const toggleTask = id => setTasks(ts=>ts.map(t=>t.id===id?{...t,done:!t.done}:t));

  const MONTH_NAMES=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Lịch & Task</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider' }} elevation={0}><CardContent sx={{ p: '24px !important' }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:3 }}>
              <Typography variant="h5" fontWeight={700}>{MONTH_NAMES[month]} {year}</Typography>
              <Box>
                <IconButton onClick={prevMonth} sx={{ border: '1px solid', borderColor: 'divider', mr: 1 }}><ChevronLeftRoundedIcon/></IconButton>
                <IconButton onClick={nextMonth} sx={{ border: '1px solid', borderColor: 'divider' }}><ChevronRightRoundedIcon/></IconButton>
              </Box>
            </Box>
            
            <Grid container spacing={1} mb={1}>
              {WEEK.map(w=>(
                <Grid item xs={12/7} key={w}>
                  <Typography align="center" variant="caption" fontWeight={700} color="text.secondary">{w}</Typography>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={1}>
              {cells.map((d,i)=>{
                const isToday = d && dateKey(d)===todayKey;
                const isSel   = d && selDay===d;
                const evs     = d ? eventsOn(d) : [];
                return (
                  <Grid item xs={12/7} key={i}>
                    {d ? (
                      <Box
                        onClick={()=>setSelDay(d)}
                        sx={{
                          minHeight: 100, p: 1, borderRadius: '12px', cursor: 'pointer',
                          border: '1px solid', borderColor: isSel ? 'primary.main' : 'divider',
                          bgcolor: isSel ? 'primary.main' + '0A' : (isToday ? 'primary.main' + '18' : 'background.paper'),
                          transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main' + '08' }
                        }}
                      >
                        <Typography variant="body2" fontWeight={isToday ? 700 : 500} color={isToday ? 'primary.main' : 'text.primary'} mb={0.5}>
                          {d}
                        </Typography>
                        {evs.slice(0,2).map(e=>(
                          <Box key={e.id} sx={{ bgcolor:SUBJ_COLOR[e.subject]+'18', borderLeft:'2px solid', borderColor:SUBJ_COLOR[e.subject], px:0.5, py:0.25, mb:0.5, borderRadius:'4px' }}>
                            <Typography noWrap variant="caption" sx={{ fontSize:9, color:SUBJ_COLOR[e.subject], fontWeight:600, display:'block' }}>
                              {e.title}
                            </Typography>
                          </Box>
                        ))}
                        {evs.length>2&&<Typography sx={{fontSize:9,color:'text.secondary', fontWeight: 600}}>+{evs.length-2}</Typography>}
                      </Box>
                    ):<Box sx={{minHeight:100}}/>}
                  </Grid>
                );
              })}
            </Grid>
            <Box sx={{ mt:3, display:'flex', gap:2, alignItems:'center', p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {selDay?`Đã chọn: ${selDay}/${month+1}/${year}`:'Chọn ngày để thêm sự kiện'}
              </Typography>
              <Button size="small" variant="contained" startIcon={<AddRoundedIcon/>} disabled={!selDay} onClick={()=>setEvOpen(true)} sx={{ ml: 'auto' }}>
                Thêm sự kiện
              </Button>
            </Box>
          </CardContent></Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', height: '100%' }} elevation={0}><CardContent sx={{ p: '24px !important' }}>
            <Typography variant="h6" fontWeight={700} mb={3}>Task hôm nay</Typography>
            <Box sx={{ display:'flex', gap:1, mb:3 }}>
              <TextField size="small" fullWidth placeholder="Thêm task mới…" value={newTask}
                onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTask()} 
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
      <Dialog open={evOpen} onClose={()=>setEvOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Thêm sự kiện — {selDay}/{month+1}/{year}</DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column', gap:3, pt:'16px !important' }}>
          <TextField label="Tên sự kiện" fullWidth value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))} />
          <FormControl fullWidth size="small">
            <InputLabel>Môn học</InputLabel>
            <Select value={draft.subject} label="Môn học" onChange={e=>setDraft(d=>({...d,subject:e.target.value}))}>
              {SUBJECTS.map(s=><MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={()=>setEvOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={addEvent} disabled={!draft.title.trim()}>Lưu</Button>
        </DialogActions>
      </Dialog>
              <IconButton color="primary" onClick={addTask} sx={{ bgcolor: 'primary.main' + '18', borderRadius: '10px' }}><AddRoundedIcon/></IconButton>
            </Box>
            <List dense disablePadding>
              {tasks.map((t,i)=>(
                <React.Fragment key={t.id}>
                  <ListItem disableGutters onClick={()=>toggleTask(t.id)} sx={{ cursor:'pointer', py: 1.5, px: 1, borderRadius: 2, '&:hover': { bgcolor: 'background.default' } }}>
                    <Box sx={{ width:18, height:18, borderRadius:'50%', border:'2px solid', mr:2, flexShrink:0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderColor:t.done?'success.main':'text.disabled', bgcolor:t.done?'success.main':'transparent' }}>
                        {t.done && <Box sx={{ width: 8, height: 8, bgcolor: '#fff', borderRadius: '50%' }} />}
                    </Box>
                    <ListItemText primary={t.text} primaryTypographyProps={{ variant:'body2', fontWeight: t.done ? 400 : 500,
                      sx:{ textDecoration:t.done?'line-through':'none', color:t.done?'text.secondary':'text.primary' } }} />
                  </ListItem>
                  {i<tasks.length-1&&<Divider/>}
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt:3, pt:2, borderTop:'1px solid', borderColor:'divider' }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {tasks.filter(t=>t.done).length}/{tasks.length} task hoàn thành
              </Typography>
            </Box>
          </CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  );
}
