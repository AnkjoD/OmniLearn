import React, { useState, useRef } from 'react';
import { Box, Typography, Grid, Card, Avatar, Chip, Button, TextField, IconButton, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Switch, Badge, Divider, InputAdornment, Paper } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';

// GET  /api/groups?joined=true  → Group[]
// GET  /api/groups/discover     → Group[]
// POST /api/groups              → Group
// POST /api/groups/:id/join     → { ok }
// GET  /api/messages/:id        → Message[]
// POST /api/messages/:id        → Message
// GET  /api/friends             → Friend[]
// POST /api/friends             → Friend

const AVATAR_COLORS = ['#0F4C81','#FDB813','#16A34A','#0284C7','#DC2626','#7C3AED','#EA580C'];

const INIT_GROUPS = [
  { id:'g1', name:'Giải tích K22',     members:8,  avatarColor:'#0F4C81', privacy:'public',  joined:true, subject:'Toán',  desc:'Nhóm ôn thi Giải tích K22 IUH', lastMsg:'Ai có note chương 4?' },
  { id:'g2', name:'Vật lý nhóm 3',    members:5,  avatarColor:'#FDB813', privacy:'private', joined:true, subject:'Lý',    desc:'Nhóm riêng vật lý đại cương',   lastMsg:'Họp 8h tối nay!' },
  { id:'g3', name:'Python Self-study', members:12, avatarColor:'#16A34A', privacy:'public',  joined:true, subject:'CNTT', desc:'Tự học Python cùng nhau',         lastMsg:'Share code bài tập 5' },
];

const SUGGESTED = [
  { id:'s1', name:'Toán rời rạc IUH',  members:20, avatarColor:'#0284C7', subject:'Toán',      desc:'Ôn tập toán rời rạc, giải đề cùng nhau mỗi tối',    match:92, posts:34 },
  { id:'s2', name:'English Club IUH',  members:30, avatarColor:'#7C3AED', subject:'Tiếng Anh', desc:'Luyện IELTS, giao tiếp tiếng Anh hàng ngày',         match:85, posts:51 },
  { id:'s3', name:'CTDL & Giải thuật', members:18, avatarColor:'#EA580C', subject:'CNTT',      desc:'Thảo luận CTDL, code contest, phỏng vấn kỹ thuật',   match:88, posts:27 },
  { id:'s4', name:'Hóa Hữu cơ',        members:15, avatarColor:'#DC2626', subject:'Hóa',       desc:'Nhóm học Hóa hữu cơ, chia sẻ tài liệu thí nghiệm',  match:78, posts:19 },
  { id:'s5', name:'Machine Learning',  members:25, avatarColor:'#16A34A', subject:'CNTT',      desc:'Học ML từ cơ bản, Kaggle, paper reading mỗi tuần',    match:81, posts:42 },
  { id:'s6', name:'Vẽ kỹ thuật AutoCAD',members:9, avatarColor:'#0F4C81', subject:'Cơ khí',   desc:'Luyện AutoCAD, SolidWorks, chia sẻ bản vẽ kỹ thuật', match:60, posts:11 },
];

const INIT_FRIENDS = [
  { id:'dm1', name:'Trần Linh',    avatar:'TL', color:'#0F4C81', lastMsg:'Bạn hiểu bài 5 chưa?',   unread:2 },
  { id:'dm2', name:'Nguyễn Hùng', avatar:'NH', color:'#FDB813', lastMsg:'Cho mình xin note nhé!',  unread:0 },
  { id:'dm3', name:'Phạm Anh',    avatar:'PA', color:'#16A34A', lastMsg:'OK gặp tại thư viện!',    unread:1 },
];

const INIT_MSGS = {
  g1:[{id:1,user:'Minh',avatar:'M',text:'Ai có note chương 4?',   time:'20:12',self:false},
      {id:2,user:'Bạn', avatar:'B',text:'Mình có, để mình share!',time:'20:13',self:true },
      {id:3,user:'Lan', avatar:'L',text:'Mình cần thêm bài tập 😅',time:'20:15',self:false}],
  g2:[{id:1,user:'Hùng',avatar:'H',text:'Họp 8h tối nay nhé!',   time:'18:00',self:false}],
  g3:[{id:1,user:'Nam', avatar:'N',text:'Share code bài tập 5',    time:'17:30',self:false}],
  dm1:[{id:1,user:'Trần Linh',   avatar:'TL',text:'Bạn hiểu bài 5 chưa?',time:'19:00',self:false},
       {id:2,user:'Bạn',         avatar:'B', text:'Chưa, khó quá 😭',     time:'19:01',self:true }],
  dm2:[{id:1,user:'Nguyễn Hùng',avatar:'NH',text:'Cho mình xin note nhé!',time:'18:30',self:false}],
  dm3:[{id:1,user:'Phạm Anh',   avatar:'PA',text:'OK gặp tại thư viện!',  time:'17:00',self:false}],
};

function ChatArea({ id, group, isDM, msgs = [], onSend }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const send = () => { if (!input.trim()) return; onSend(id, input.trim()); setInput(''); };
  React.useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs.length]);
  if (!group) return (
    <Card sx={{ borderRadius:'16px', border:'1px solid', borderColor:'divider', height:'80vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2, color:'text.disabled' }} elevation={0}>
      <GroupsRoundedIcon sx={{ fontSize:56, opacity:0.2 }}/>
      <Typography variant="body2">Chọn nhóm hoặc bạn bè để bắt đầu</Typography>
    </Card>
  );
  return (
    <Card sx={{ borderRadius:'16px', border:'1px solid', borderColor:'divider', height:'80vh', display:'flex', flexDirection:'column' }} elevation={0}>
      <Box sx={{ px:3, py:2, borderBottom:'1px solid', borderColor:'divider', display:'flex', alignItems:'center', gap:1.5 }}>
        <Avatar sx={{ bgcolor: isDM ? group.color : group.avatarColor, width:36, height:36, fontSize:12, fontWeight:700 }}>
          {isDM ? group.avatar : <GroupsRoundedIcon sx={{ fontSize:18 }}/>}
        </Avatar>
        <Box>
          <Typography fontWeight={700}>{group.name}</Typography>
          {!isDM && <Typography variant="caption" color="text.secondary">{group.members} thành viên · {group.subject}</Typography>}
        </Box>
        {!isDM && <Chip label={group.privacy === 'private' ? '🔒 Riêng tư' : '🌐 Công khai'} size="small" sx={{ ml:'auto', fontSize:11 }}/>}
      </Box>
      <Box sx={{ flex:1, overflowY:'auto', p:2.5, display:'flex', flexDirection:'column', gap:1.5 }}>
        {msgs.map(m => (
          <Box key={m.id} sx={{ display:'flex', flexDirection: m.self ? 'row-reverse' : 'row', alignItems:'flex-end', gap:1 }}>
            {!m.self && <Avatar sx={{ width:28, height:28, fontSize:11, fontWeight:700, bgcolor: '#E2E8F0', color:'#475569' }}>{m.avatar}</Avatar>}
            <Box sx={{ maxWidth:'65%' }}>
              {!m.self && <Typography variant="caption" color="text.secondary" sx={{ px:1 }}>{m.user}</Typography>}
              <Paper elevation={0} sx={{ px:2, py:1, bgcolor: m.self ? '#0F4C81' : '#F1F5F9', color: m.self ? '#fff' : 'text.primary', borderRadius: m.self ? '18px 18px 4px 18px' : '18px 18px 18px 4px' }}>
                <Typography variant="body2">{m.text}</Typography>
              </Paper>
              <Typography variant="caption" color="text.disabled" sx={{ display:'block', px:1, mt:0.25, textAlign: m.self ? 'right' : 'left' }}>{m.time}</Typography>
            </Box>
          </Box>
        ))}
        {msgs.length === 0 && (
          <Box sx={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'text.disabled', gap:1 }}>
            <PeopleAltRoundedIcon sx={{ fontSize:40, opacity:0.25 }}/>
            <Typography variant="caption">Chưa có tin nhắn. Hãy bắt đầu cuộc trò chuyện!</Typography>
          </Box>
        )}
        <div ref={bottomRef}/>
      </Box>
      <Box sx={{ px:3, py:2, borderTop:'1px solid', borderColor:'divider', display:'flex', gap:1 }}>
        <TextField fullWidth size="small" placeholder="Nhắn tin…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()} sx={{ '& .MuiOutlinedInput-root':{ borderRadius:'12px' } }}/>
        <IconButton onClick={send} disabled={!input.trim()} sx={{ bgcolor:'#0F4C81', color:'#fff', borderRadius:'12px', width:42, height:42, '&:hover':{ bgcolor:'#0D3F6E' }, '&.Mui-disabled':{ bgcolor:'action.disabledBackground' } }}>
          <SendRoundedIcon fontSize="small"/>
        </IconButton>
      </Box>
    </Card>
  );
}

function SuggestedCard({ g, onJoin }) {
  // Ảnh cover ngẫu nhiên theo môn học hoặc màu
  const coverBg = g.avatarColor + '20'; // màu nhạt làm nền
  return (
    <Card sx={{ borderRadius:'16px', border:'1px solid', borderColor:'divider', p:0, overflow:'hidden', transition:'all 0.2s', '&:hover':{ borderColor:'primary.main', boxShadow:'0 4px 20px rgba(15,76,129,0.12)' }, display:'flex', flexDirection:'column' }} elevation={0}>
      <Box sx={{ height: 100, bgcolor: coverBg, position:'relative', backgroundImage: `linear-gradient(135deg, ${g.avatarColor}40 0%, ${g.avatarColor}10 100%)` }}>
        <Box sx={{ position:'absolute', bottom:-24, left:16, p:0.5, bgcolor:'#fff', borderRadius:'50%' }}>
          <Avatar sx={{ bgcolor:g.avatarColor, width:48, height:48, boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}><GroupsRoundedIcon/></Avatar>
        </Box>
        <Box sx={{ position:'absolute', top:12, right:12, bgcolor:'#fff', color:'#16A34A', borderRadius:'20px', px:1, py:0.25, fontSize:11, fontWeight:700, boxShadow:'0 2px 4px rgba(0,0,0,0.05)' }}>{g.match}% phù hợp</Box>
      </Box>
      <Box sx={{ p:2.5, pt:4, flex:1, display:'flex', flexDirection:'column' }}>
        <Typography fontWeight={700} fontSize={16} noWrap mb={0.5}>{g.name}</Typography>
        <Box sx={{ display:'flex', alignItems:'center', gap:1, mb:1.5 }}>
          <Typography variant="caption" color="text.secondary">{g.members} thành viên</Typography>
          <Typography variant="caption" color="text.secondary">·</Typography>
          <Typography variant="caption" color="text.secondary">{g.posts} bài đăng</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb:2, flex:1, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{g.desc}</Typography>
        <Box sx={{ display:'flex', gap:1, mt:'auto' }}>
          <Chip label={g.subject} size="small" sx={{ bgcolor:g.avatarColor+'15', color:g.avatarColor, fontWeight:600, borderRadius:'8px' }}/>
          <Button fullWidth variant="contained" size="small" onClick={()=>onJoin(g.id)} sx={{ ml:'auto', borderRadius:'10px', bgcolor:'#0F4C81', '&:hover':{ bgcolor:'#0D3F6E' }, textTransform:'none', fontWeight:600 }}>Tham gia nhóm</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default function Groups() {
  const [tab, setTab] = useState(0);
  const [groups, setGroups] = useState(INIT_GROUPS);
  const [friends, setFriends] = useState(INIT_FRIENDS);
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [activeId, setActiveId] = useState('g1');
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [newColor, setNewColor] = useState(AVATAR_COLORS[0]);
  const [friendName, setFriendName] = useState('');
  const [suggested, setSuggested] = useState(SUGGESTED);
  const [discoverSearch, setDiscoverSearch] = useState('');

  const [showDiscover, setShowDiscover] = useState(false);
  const isDM = tab === 1;
  const activeGroup = groups.find(g => g.id === activeId);
  const activeFriend = friends.find(f => f.id === activeId);

  const send = (id, text) => {
    const msg = { id:Date.now(), user:'Bạn', avatar:'B', text, time:new Date().toLocaleTimeString('vi',{hour:'2-digit',minute:'2-digit'}), self:true };
    setMsgs(m => ({ ...m, [id]: [...(m[id]||[]), msg] }));
  };
  const createGroup = () => {
    if (!newName.trim()) return;
    const g = { id:`g${Date.now()}`, name:newName, desc:newDesc, subject:newSubject, members:1, avatarColor:newColor, privacy:isPrivate?'private':'public', joined:true, lastMsg:'' };
    setGroups(gs=>[...gs,g]); setMsgs(m=>({...m,[g.id]:[]}));
    setActiveId(g.id); setTab(0); setNewName(''); setNewDesc(''); setNewSubject(''); setIsPrivate(false); setCreateOpen(false);
  };
  const addFriend = () => {
    if (!friendName.trim()) return;
    const f = { id:`dm${Date.now()}`, name:friendName, avatar:friendName.slice(0,2).toUpperCase(), color:AVATAR_COLORS[friends.length%AVATAR_COLORS.length], lastMsg:'', unread:0 };
    setFriends(fs=>[...fs,f]); setMsgs(m=>({...m,[f.id]:[]}));
    setActiveId(f.id); setTab(1); setFriendName(''); setAddFriendOpen(false);
  };
  const joinGroup = (sid) => {
    const s = suggested.find(g=>g.id===sid); if (!s) return;
    const g = { ...s, joined:true, lastMsg:'', privacy:'public' };
    setGroups(gs=>[...gs,g]); setMsgs(m=>({...m,[g.id]:[]}));
    setSuggested(ss=>ss.filter(x=>x.id!==sid)); setActiveId(g.id); setTab(0);
  };
  const filteredGroups = groups.filter(g=>g.name.toLowerCase().includes(search.toLowerCase()));
  const filteredFriends = friends.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()));
  const filteredSugg = suggested.filter(g=>g.name.toLowerCase().includes(discoverSearch.toLowerCase())||g.subject.toLowerCase().includes(discoverSearch.toLowerCase()));

  const SidebarItem = ({ item, isGroup }) => (
    <Box onClick={()=>setActiveId(item.id)} sx={{ display:'flex', alignItems:'center', gap:1.5, px:2, py:1.5, cursor:'pointer', bgcolor:activeId===item.id?'rgba(15,76,129,0.08)':'transparent', borderLeft:'3px solid', borderColor:activeId===item.id?'#0F4C81':'transparent', '&:hover':{ bgcolor:'action.hover' }, transition:'all 0.15s' }}>
      {isGroup ? <Avatar sx={{ bgcolor:item.avatarColor, width:36, height:36 }}><GroupsRoundedIcon sx={{ fontSize:18 }}/></Avatar>
        : <Badge badgeContent={item.unread||0} color="error" overlap="circular"><Avatar sx={{ bgcolor:item.color, width:36, height:36, fontSize:12, fontWeight:700 }}>{item.avatar}</Avatar></Badge>}
      <Box sx={{ flex:1, minWidth:0 }}>
        <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>
          <Typography variant="body2" fontWeight={700} noWrap>{item.name}</Typography>
          {isGroup && item.privacy==='private' && <LockRoundedIcon sx={{ fontSize:12, color:'text.disabled' }}/>}
        </Box>
        <Typography variant="caption" color="text.secondary" noWrap>{item.lastMsg}</Typography>
      </Box>
    </Box>
  );
  return (
    <Box>
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:3 }}>
        <Typography variant="h4" fontWeight={700}>Nhóm & Bạn bè</Typography>
        <Box sx={{ display:'flex', gap:1 }}>
          <Button variant="outlined" startIcon={<PersonAddRoundedIcon/>} onClick={()=>setAddFriendOpen(true)} sx={{ borderRadius:'12px', textTransform:'none' }}>Thêm bạn</Button>
          <Button variant="outlined" startIcon={<ExploreRoundedIcon/>} onClick={()=>setShowDiscover(d=>!d)} sx={{ borderRadius:'12px', textTransform:'none', ...(showDiscover && { bgcolor:'#0F4C81', color:'#fff', borderColor:'#0F4C81', '&:hover':{ bgcolor:'#0D3F6E', borderColor:'#0D3F6E' } }) }}>Khám phá nhóm</Button>
          <Button variant="contained" startIcon={<AddRoundedIcon/>} onClick={()=>setCreateOpen(true)} sx={{ borderRadius:'12px', bgcolor:'#0F4C81', textTransform:'none' }}>Tạo nhóm</Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius:'16px', border:'1px solid', borderColor:'divider', height:'80vh', display:'flex', flexDirection:'column' }} elevation={0}>
            <Box sx={{ p:2, borderBottom:'1px solid', borderColor:'divider' }}>
              <Tabs value={tab} onChange={(_,v)=>{ setTab(v); if(v===0)setActiveId(groups[0]?.id||null); else setActiveId(friends[0]?.id||null); }} sx={{ minHeight:36, mb:1.5, '& .MuiTab-root':{ minHeight:36, fontSize:11, fontWeight:600, textTransform:'none' } }} variant="fullWidth">
                <Tab label="Nhóm" icon={<GroupsRoundedIcon sx={{ fontSize:15 }}/>} iconPosition="start"/>
                <Tab label="Bạn bè" icon={<PersonAddRoundedIcon sx={{ fontSize:15 }}/>} iconPosition="start"/>
              </Tabs>
              <TextField size="small" fullWidth placeholder="Tìm…" value={search} onChange={e=>setSearch(e.target.value)} InputProps={{ startAdornment:<InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize:16, color:'text.disabled' }}/></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root':{ borderRadius:'10px' } }}/>
            </Box>
            <Box sx={{ flex:1, overflow:'auto', py:1 }}>
              {tab===0 && filteredGroups.map(g=><SidebarItem key={g.id} item={g} isGroup/>)}
              {tab===1 && filteredFriends.map(f=><SidebarItem key={f.id} item={f} isGroup={false}/>)}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          {showDiscover ? (
            <Card sx={{ borderRadius:'16px', border:'1px solid', borderColor:'divider', height:'80vh', display:'flex', flexDirection:'column' }} elevation={0}>
              <Box sx={{ px:3, py:2, borderBottom:'1px solid', borderColor:'divider', display:'flex', alignItems:'center', gap:2 }}>
                <ExploreRoundedIcon sx={{ color:'#0F4C81', fontSize:28 }}/>
                <Typography variant="h6" fontWeight={700}>Khám phá nhóm học</Typography>
                <TextField size="small" placeholder="Tìm theo tên, môn học…" value={discoverSearch} onChange={e=>setDiscoverSearch(e.target.value)} InputProps={{ startAdornment:<InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize:16, color:'text.disabled' }}/></InputAdornment> }} sx={{ ml:'auto', width:300, '& .MuiOutlinedInput-root':{ borderRadius:'10px' } }}/>
              </Box>
              <Box sx={{ flex:1, overflowY:'auto', p:3, bgcolor:'#F8FAFC' }}>
                <Grid container spacing={2.5}>
                  {filteredSugg.map(g=><Grid item xs={12} sm={6} lg={4} key={g.id}><SuggestedCard g={g} onJoin={joinGroup}/></Grid>)}
                  {filteredSugg.length===0 && (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign:'center', py:10, color:'text.secondary' }}>
                        <ExploreRoundedIcon sx={{ fontSize:64, opacity:0.15, mb:2 }}/>
                        <Typography>Không tìm thấy nhóm phù hợp</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Card>
          ) : (
            <ChatArea id={activeId} group={isDM?activeFriend:activeGroup} isDM={isDM} msgs={msgs[activeId]||[]} onSend={send}/>
          )}
        </Grid>
      </Grid>

      <Dialog open={createOpen} onClose={()=>setCreateOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Tạo nhóm học mới</DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column', gap:2, pt:'16px !important' }}>
          <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
            <Avatar sx={{ bgcolor:newColor, width:52, height:52 }}><GroupsRoundedIcon/></Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Màu nhóm</Typography>
              <Box sx={{ display:'flex', gap:1 }}>{AVATAR_COLORS.map(c=><Box key={c} onClick={()=>setNewColor(c)} sx={{ width:22, height:22, borderRadius:'50%', bgcolor:c, cursor:'pointer', border:'2px solid', borderColor:c===newColor?'text.primary':'transparent' }}/>)}</Box>
            </Box>
          </Box>
          <TextField label="Tên nhóm *" fullWidth value={newName} onChange={e=>setNewName(e.target.value)} autoFocus/>
          <TextField label="Mô tả" fullWidth value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="Nhóm này học gì…"/>
          <TextField label="Môn học" fullWidth value={newSubject} onChange={e=>setNewSubject(e.target.value)} placeholder="Toán, Lý, Python…"/>
          <FormControlLabel control={<Switch checked={isPrivate} onChange={e=>setIsPrivate(e.target.checked)} color="primary"/>} label={<Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>{isPrivate?<LockRoundedIcon fontSize="small"/>:<PublicRoundedIcon fontSize="small"/>}<Typography variant="body2">{isPrivate?'Riêng tư':'Công khai'}</Typography></Box>}/>
        </DialogContent>
        <DialogActions sx={{ p:2, pt:0 }}>
          <Button onClick={()=>setCreateOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={createGroup} disabled={!newName.trim()} sx={{ bgcolor:'#0F4C81' }}>Tạo nhóm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addFriendOpen} onClose={()=>setAddFriendOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Thêm bạn</DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column', gap:2, pt:'16px !important' }}>
          <TextField label="Tên bạn *" fullWidth value={friendName} onChange={e=>setFriendName(e.target.value)} autoFocus placeholder="Nguyễn Văn A"/>
        </DialogContent>
        <DialogActions sx={{ p:2, pt:0 }}>
          <Button onClick={()=>setAddFriendOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={addFriend} disabled={!friendName.trim()} sx={{ bgcolor:'#0F4C81' }}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
