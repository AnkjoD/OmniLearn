import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, Card, CardContent, CardActionArea, Typography,
  Chip, Button, TextField, InputAdornment, LinearProgress,
  List, ListItem, ListItemText, ListItemIcon, Divider, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Select,
  FormControl, InputLabel,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { addSession, setActiveSubject } from '../store/librarySlice';

const STATUS_COLOR = { ready: 'success', processing: 'warning', pending: 'default' };
const STATUS_LABEL = { ready: 'Sẵn sàng', processing: 'Đang xử lý', pending: 'Chờ xử lý' };

const PROCESSING_STEPS = [
  'Trích xuất transcript…',
  'Phân tích nội dung chương 1…',
  'Phân tích nội dung chương 2…',
  'Tạo ghi chú có cấu trúc…',
  'Hoàn tất ✓',
];

function SubjectCard({ subject, onSelect, active }) {
  const done = subject.sessions.filter(s => s.status === 'ready').length;
  return (
    <Card sx={{ border: active ? '2px solid' : '1px solid', borderColor: active ? 'primary.main' : 'divider' }}>
      <CardActionArea onClick={() => onSelect(subject.id)} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: subject.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            {subject.icon}
          </Box>
          <Typography variant="h6" fontWeight={600}>{subject.name}</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {done}/{subject.sessions.length} session
        </Typography>
      </CardActionArea>
    </Card>
  );
}

function ProcessingProgress({ steps, currentStep }) {
  return (
    <Box mt={2}>
      {steps.map((step, i) => (
        <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, opacity: i > currentStep ? 0.4 : 1 }}>
          <FiberManualRecordRoundedIcon sx={{ fontSize: 10, color: i < currentStep ? 'success.main' : i === currentStep ? 'warning.main' : 'text.disabled' }} />
          <Typography variant="body2">{step}</Typography>
          {i === currentStep && <LinearProgress sx={{ flex: 1, ml: 1 }} />}
        </Box>
      ))}
    </Box>
  );
}


export default function Library() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects, activeSubjectId } = useSelector(s => s.library);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [inputType, setInputType] = useState('youtube');
  const [inputVal, setInputVal] = useState('');
  const [targetSubject, setTargetSubject] = useState('');
  const [processingStep, setProcessingStep] = useState(-1);

  const filtered = subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const active = subjects.find(s => s.id === activeSubjectId);

  const handleSubmit = () => {
    if (!inputVal || !targetSubject) return;
    const newSession = { id: `s${Date.now()}`, title: inputVal, status: 'processing', createdAt: new Date().toISOString().slice(0, 10) };
    dispatch(addSession({ subjectId: targetSubject, session: newSession }));
    setProcessingStep(0);
    PROCESSING_STEPS.forEach((_, i) => {
      setTimeout(() => setProcessingStep(i), (i + 1) * 1500);
    });
    setTimeout(() => { setAddOpen(false); setProcessingStep(-1); setInputVal(''); }, PROCESSING_STEPS.length * 1500 + 500);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Thư viện học tập</Typography>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setAddOpen(true)}>
          Thêm nội dung
        </Button>
      </Box>

      <TextField
        fullWidth placeholder="Tìm môn học…"
        value={search} onChange={e => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> }}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="overline" color="text.secondary" mb={1} display="block">Môn học</Typography>
          <Grid container spacing={1.5}>
            {filtered.map(sub => (
              <Grid item xs={12} key={sub.id}>
                <SubjectCard subject={sub} active={activeSubjectId === sub.id} onSelect={id => dispatch(setActiveSubject(id))} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          {active ? (
            <Box>
              <Typography variant="overline" color="text.secondary" mb={1} display="block">Sessions — {active.name}</Typography>
              <Card>
                <List disablePadding>
                  {active.sessions.map((sess, i) => (
                    <React.Fragment key={sess.id}>
                      <ListItem
                        secondaryAction={
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip label={STATUS_LABEL[sess.status]} color={STATUS_COLOR[sess.status]} size="small" />
                            {sess.status === 'ready' && (
                              <Button size="small" onClick={() => navigate(`/notes/${sess.id}`)}>Xem ghi chú</Button>
                            )}
                          </Box>
                        }
                      >
                        <ListItemIcon><PlayCircleOutlineRoundedIcon color="action" /></ListItemIcon>
                        <ListItemText primary={sess.title} secondary={sess.createdAt} primaryTypographyProps={{ fontWeight: 500 }} />
                      </ListItem>
                      {i < active.sessions.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </Card>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
              <Typography color="text.secondary">Chọn môn học bên trái để xem sessions</Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Thêm nội dung mới</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <InputLabel>Loại nội dung</InputLabel>
            <Select value={inputType} onChange={e => setInputType(e.target.value)} label="Loại nội dung">
              <MenuItem value="youtube"><Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><LinkRoundedIcon fontSize="small" /> Link YouTube</Box></MenuItem>
              <MenuItem value="pdf"><Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><UploadFileRoundedIcon fontSize="small" /> Upload PDF/Slide</Box></MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label={inputType === 'youtube' ? 'Dán link YouTube' : 'Tên tài liệu'}
            placeholder={inputType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'Chương 3 - Tích phân...'}
            value={inputVal} onChange={e => setInputVal(e.target.value)} sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Môn học</InputLabel>
            <Select value={targetSubject} onChange={e => setTargetSubject(e.target.value)} label="Môn học">
              {subjects.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          </FormControl>
          {processingStep >= 0 && <ProcessingProgress steps={PROCESSING_STEPS} currentStep={processingStep} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!inputVal || !targetSubject || processingStep >= 0}>
            {processingStep >= 0 ? 'Đang xử lý…' : 'Xử lý'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
