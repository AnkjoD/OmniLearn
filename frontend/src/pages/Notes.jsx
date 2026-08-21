import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, CardActionArea,
  IconButton, Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Chip, InputAdornment,
  MenuItem, Select, FormControl, InputLabel, Tooltip,
  List, ListItem, ListItemButton, ListItemText, Divider,
  LinearProgress, Tabs, Tab,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { addSession, setActiveSubject } from '../store/librarySlice';

const NOTE_COLORS = ['#EFF6FF','#F0FDF4','#FFFBEB','#FFF1F2','#F5F3FF','#F0F9FF'];

const INIT_FOLDERS = [
  { id: 'f0', name: 'Tất cả' },
  { id: 'f1', name: 'Giải tích' },
  { id: 'f2', name: 'Vật lý' },
  { id: 'f3', name: 'Python' },
];

const INIT_NOTES = [
  { id:'n1', title:'Đạo hàm & vi phân', folderId:'f1', content:'Quy tắc dây chuyền: (f∘g)′ = f′(g(x))·g′(x)\nTích phân từng phần: ∫u dv = uv − ∫v du', color:'#EFF6FF', pinned:true,  date:'17/08' },
  { id:'n2', title:'Định luật Newton',   folderId:'f2', content:'F = ma\nĐịnh luật 3: Mỗi lực có phản lực bằng, ngược chiều',                              color:'#F0FDF4', pinned:false, date:'16/08' },
  { id:'n3', title:'OOP Python',          folderId:'f3', content:'class Dog:\n  def __init__(self, name):\n    self.name = name',                             color:'#FFFBEB', pinned:true,  date:'15/08' },
];

const STATUS_COLOR = { ready:'success', processing:'warning', pending:'default' };
const STATUS_LABEL = { ready:'Sẵn sàng', processing:'Đang xử lý', pending:'Chờ xử lý' };
const PROCESSING_STEPS = ['Trích xuất transcript…','Phân tích nội dung…','Tạo ghi chú có cấu trúc…','Hoàn tất ✓'];



export default function Notes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects, activeSubjectId } = useSelector(s => s.library);

  const [mainTab, setMainTab]     = useState(0); // 0=Ghi chú, 1=Tài liệu
  const [notes, setNotes]         = useState(INIT_NOTES);
  const [folders, setFolders]     = useState(INIT_FOLDERS);
  const [activeFolderId, setActiveFolderId] = useState('f0');
  const [search, setSearch]       = useState('');
  const [noteOpen, setNoteOpen]   = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [draft, setDraft]         = useState({ title:'', folderId:'f1', content:'', color:NOTE_COLORS[0] });

  // Library (tab 1) state
  const [addOpen, setAddOpen]         = useState(false);
  const [inputType, setInputType]     = useState('youtube');
  const [inputVal, setInputVal]       = useState('');
  const [targetSubject, setTargetSubject] = useState('');
  const [processingStep, setProcessingStep] = useState(-1);

  // --- Notes logic ---
  const activeFolder = folders.find(f => f.id === activeFolderId);
  const filtered = notes
    .filter(n => activeFolderId === 'f0' || n.folderId === activeFolderId)
    .filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.pinned - a.pinned);

  const addNote = () => {
    if (!draft.title.trim()) return;
    const d = new Date().toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit' });
    setNotes(ns => [{ ...draft, id:`n${Date.now()}`, pinned:false, date:d }, ...ns]);
    setDraft({ title:'', folderId:'f1', content:'', color:NOTE_COLORS[0] });
    setNoteOpen(false);
  };
  const togglePin = id => setNotes(ns => ns.map(n => n.id===id ? {...n, pinned:!n.pinned} : n));
  const delNote   = id => setNotes(ns => ns.filter(n => n.id!==id));

  const addFolder = () => {
    if (!newFolderName.trim()) return;
    const f = { id:`f${Date.now()}`, name:newFolderName.trim() };
    setFolders(fs => [...fs, f]);
    setNewFolderName('');
    setFolderOpen(false);
    setActiveFolderId(f.id);
    setDraft(d => ({ ...d, folderId: f.id }));
  };

  // --- Library logic ---
  const activeLib = subjects.find(s => s.id === activeSubjectId);
  const handleSubmit = () => {
    if (!inputVal || !targetSubject) return;
    dispatch(addSession({ subjectId: targetSubject, session: {
      id:`s${Date.now()}`, title:inputVal, status:'processing', createdAt:new Date().toISOString().slice(0,10)
    }}));
    setProcessingStep(0);
    PROCESSING_STEPS.forEach((_, i) => setTimeout(() => setProcessingStep(i), (i+1)*900));
    setTimeout(() => { setProcessingStep(-1); setAddOpen(false); setInputVal(''); setTargetSubject(''); }, PROCESSING_STEPS.length*900+400);
  };

  return (
    <Box>
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb:3 }}>
        <Typography variant="h4" fontWeight={700}>Học tập & Ghi chú</Typography>
        {mainTab === 0 && (
          <Box sx={{ display:'flex', gap:1 }}>
            <Button variant="outlined" startIcon={<FolderRoundedIcon />} onClick={() => setFolderOpen(true)}>Mục mới</Button>
            <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setNoteOpen(true)}>Ghi chú mới</Button>
          </Box>
        )}
        {mainTab === 1 && (
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setAddOpen(true)}>Thêm tài liệu</Button>
        )}
      </Box>

      <Tabs value={mainTab} onChange={(_, v) => setMainTab(v)} sx={{ mb: 3 }}>
        <Tab label="📝 Ghi chú" />
        <Tab label="🎬 Tài liệu học" />
      </Tabs>

      {/* ===== TAB GHI CHÚ ===== */}
      {mainTab === 0 && (
        <Grid container spacing={2}>
          {/* Sidebar mục */}
          <Grid item xs={12} md={2.5}>
            <Card sx={{ position:'sticky', top:80 }}>
              <CardContent sx={{ p:1.5 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ px:1, display:'block', mb:0.5 }}>MỤC</Typography>
                <List disablePadding dense>
                  {folders.map(f => (
                    <ListItemButton key={f.id} selected={activeFolderId === f.id}
                      onClick={() => setActiveFolderId(f.id)} sx={{ borderRadius:1 }}>
                      <FolderRoundedIcon sx={{ fontSize:16, mr:1, color:'primary.main', opacity: f.id==='f0'?0:1 }} />
                      <ListItemText primary={f.name} primaryTypographyProps={{ variant:'body2', fontWeight: activeFolderId===f.id?600:400 }} />
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Note cards */}
          <Grid item xs={12} md={9.5}>
            <Box sx={{ display:'flex', gap:1.5, mb:2, flexWrap:'wrap', alignItems:'center' }}>
              <TextField size="small" placeholder="Tìm ghi chú…" value={search}
                onChange={e => setSearch(e.target.value)} sx={{ width:220 }}
                InputProps={{ startAdornment:<InputAdornment position="start"><SearchRoundedIcon fontSize="small"/></InputAdornment> }} />
            </Box>
            {filtered.length === 0 ? (
              <Box sx={{ textAlign:'center', py:8 }}>
                <Typography color="text.secondary">Chưa có ghi chú nào{search ? ` cho "${search}"` : ''}</Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {filtered.map(note => {
                  const folder = folders.find(f => f.id === note.folderId);
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
                      <Card sx={{ bgcolor:note.color, height:'100%', display:'flex', flexDirection:'column', position:'relative' }}>
                        <Box sx={{ position:'absolute', top:8, right:8, display:'flex', gap:0.5 }}>
                          <Tooltip title={note.pinned ? 'Bỏ ghim' : 'Ghim'}>
                            <IconButton size="small" onClick={() => togglePin(note.id)}>
                              {note.pinned ? <PushPinRoundedIcon fontSize="small" sx={{color:'#0F4C81'}}/> : <PushPinOutlinedIcon fontSize="small"/>}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xoá">
                            <IconButton size="small" onClick={() => delNote(note.id)}><DeleteOutlineRoundedIcon fontSize="small"/></IconButton>
                          </Tooltip>
                        </Box>
                        <CardContent sx={{ flex:1, pt:1.5 }}>
                          <Chip label={folder?.name || '—'} size="small" sx={{ mb:1, fontSize:11, height:20 }} />
                          <Typography variant="subtitle1" fontWeight={700} mb={1} pr={5}>{note.title}</Typography>
                          <Typography variant="body2" color="text.secondary"
                            sx={{ whiteSpace:'pre-wrap', fontSize:13, lineHeight:1.6,
                              display:'-webkit-box', WebkitLineClamp:6, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                            {note.content}
                          </Typography>
                        </CardContent>
                        <Box sx={{ px:2, pb:1.5 }}>
                          <Typography variant="caption" color="text.disabled">{note.date}</Typography>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
        </Grid>
      )}

      {/* ===== TAB TÀI LIỆU ===== */}
      {mainTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="overline" color="text.secondary" mb={1} display="block">Môn học</Typography>
            <Box sx={{ display:'flex', flexDirection:'column', gap:1 }}>
              {subjects.map(s => {
                const done = s.sessions.filter(ss => ss.status==='ready').length;
                return (
                  <Card key={s.id} sx={{ border:activeSubjectId===s.id?'2px solid':'1px solid',
                    borderColor:activeSubjectId===s.id?'primary.main':'divider' }}>
                    <CardActionArea onClick={() => dispatch(setActiveSubject(s.id))} sx={{ p:1.5 }}>
                      <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
                        <Box sx={{ width:32, height:32, borderRadius:1.5, bgcolor:s.color+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{s.icon}</Box>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>{s.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{done}/{s.sessions.length} session</Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {activeLib ? (
              <Box>
                <Typography variant="overline" color="text.secondary" mb={1} display="block">Sessions — {activeLib.name}</Typography>
                <Card><List disablePadding>
                  {activeLib.sessions.map((sess, i) => (
                    <React.Fragment key={sess.id}>
                      <ListItem secondaryAction={
                        <Box sx={{ display:'flex', gap:1 }}>
                          <Chip label={STATUS_LABEL[sess.status]} color={STATUS_COLOR[sess.status]} size="small" />
                          {sess.status==='ready' && <Button size="small" onClick={() => navigate(`/notes/${sess.id}`)}>Xem ghi chú</Button>}
                        </Box>
                      }>
                        <PlayCircleOutlineRoundedIcon sx={{ mr:2, color:'action.active' }} />
                        <ListItemText primary={sess.title} secondary={sess.createdAt} primaryTypographyProps={{ fontWeight:500 }} />
                      </ListItem>
                      {i<activeLib.sessions.length-1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List></Card>
              </Box>
            ) : (
              <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:200 }}>
                <Typography color="text.secondary">Chọn môn học bên trái để xem sessions</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      )}

      {/* Dialog mục mới */}
      <Dialog open={folderOpen} onClose={() => setFolderOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Tạo mục mới</DialogTitle>
        <DialogContent sx={{ pt:'8px !important' }}>
          <TextField label="Tên mục" fullWidth value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
            onKeyDown={e => e.key==='Enter' && addFolder()} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFolderOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={addFolder} disabled={!newFolderName.trim()}>Tạo</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog ghi chú mới */}
      <Dialog open={noteOpen} onClose={() => setNoteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Ghi chú mới</DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column', gap:2, pt:'8px !important' }}>
          <TextField label="Tiêu đề" fullWidth value={draft.title}
            onChange={e => setDraft(d => ({ ...d, title:e.target.value }))} />
          <FormControl fullWidth size="small">
            <InputLabel>Mục</InputLabel>
            <Select value={draft.folderId} label="Mục" onChange={e => setDraft(d => ({ ...d, folderId:e.target.value }))}>
              {folders.filter(f => f.id!=='f0').map(f => <MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Nội dung" fullWidth multiline rows={6} value={draft.content}
            onChange={e => setDraft(d => ({ ...d, content:e.target.value }))} />
          <Box>
            <Typography variant="caption" color="text.secondary" mb={0.5} display="block">Màu nền</Typography>
            <Box sx={{ display:'flex', gap:1 }}>
              {NOTE_COLORS.map(c => (
                <Box key={c} onClick={() => setDraft(d => ({ ...d, color:c }))}
                  sx={{ width:24, height:24, borderRadius:'50%', bgcolor:c, border:'2px solid',
                    borderColor:draft.color===c?'primary.main':'divider', cursor:'pointer' }} />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={addNote} disabled={!draft.title.trim()}>Lưu</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog tài liệu */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Thêm nội dung mới</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb:2, mt:1 }}>
            <InputLabel>Loại nội dung</InputLabel>
            <Select value={inputType} onChange={e => setInputType(e.target.value)} label="Loại nội dung">
              <MenuItem value="youtube"><Box sx={{ display:'flex', gap:1, alignItems:'center' }}><LinkRoundedIcon fontSize="small"/> Link YouTube</Box></MenuItem>
              <MenuItem value="pdf"><Box sx={{ display:'flex', gap:1, alignItems:'center' }}><UploadFileRoundedIcon fontSize="small"/> Upload PDF/Slide</Box></MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label={inputType==='youtube'?'Dán link YouTube':'Tên tài liệu'}
            placeholder={inputType==='youtube'?'https://youtube.com/watch?v=...':'Chương 3 - Tích phân...'}
            value={inputVal} onChange={e => setInputVal(e.target.value)} sx={{ mb:2 }} />
          <FormControl fullWidth>
            <InputLabel>Môn học</InputLabel>
            <Select value={targetSubject} onChange={e => setTargetSubject(e.target.value)} label="Môn học">
              {subjects.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          </FormControl>
          {processingStep >= 0 && (
            <Box mt={2}>
              {PROCESSING_STEPS.map((step, i) => (
                <Box key={step} sx={{ display:'flex', alignItems:'center', gap:1, mb:1, opacity:i>processingStep?0.4:1 }}>
                  <FiberManualRecordRoundedIcon sx={{ fontSize:10, color:i<processingStep?'success.main':i===processingStep?'warning.main':'text.disabled' }} />
                  <Typography variant="body2">{step}</Typography>
                  {i===processingStep && <LinearProgress sx={{ flex:1, ml:1 }} />}
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!inputVal||!targetSubject||processingStep>=0}>
            {processingStep>=0?'Đang xử lý…':'Xử lý'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

