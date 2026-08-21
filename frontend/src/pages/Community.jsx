import React, { useState, useRef } from 'react';
import {
  Box, Typography, Card, CardContent, Avatar, Chip, Button,
  TextField, InputAdornment, Divider, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Select,
  FormControl, InputLabel, Tooltip, Paper,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

// ponytail: mock data — thay bằng RTK Query /posts?cat=&q=
const CATEGORIES = [
  { id: 'all',     label: 'Tất cả',       icon: null },
  { id: 'qna',     label: 'Hỏi đáp',      icon: <HelpOutlineRoundedIcon fontSize="small" /> },
  { id: 'notes',   label: 'Chia sẻ Note', icon: <MenuBookRoundedIcon fontSize="small" /> },
  { id: 'discuss', label: 'Thảo luận',    icon: <ForumRoundedIcon fontSize="small" /> },
  { id: 'team',    label: 'Tìm nhóm',     icon: <PeopleAltRoundedIcon fontSize="small" /> },
  { id: 'ann',     label: 'Thông báo',    icon: <CampaignRoundedIcon fontSize="small" /> },
];

const CAT_COLOR = {
  qna: '#0F4C81', notes: '#16A34A', discuss: '#0284C7',
  team: '#7C3AED', ann: '#D97706', all: '#64748B',
};

const TRENDING = ['Giải tích', 'Midterm', 'OOP', 'Vật lý 2', 'BTL'];

let _nextId = 4;
const INIT_POSTS = [
  {
    id: 'p1', user: 'Trần Linh', avatar: 'TL', avatarColor: '#0F4C81',
    time: '2 giờ trước', cat: 'notes',
    title: 'Note: Chuỗi Taylor & Maclaurin',
    excerpt: 'Mình vừa vẽ map tổng hợp các công thức khai triển Maclaurin của các hàm cơ bản (sin, cos, e^x, ln(1+x)…). Các bạn lưu về ôn giữa kì nhé!',
    tags: ['Giải tích', 'Toán', 'Midterm'], likes: 24, comments: 6,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
  },
  {
    id: 'p2', user: 'Nguyễn Hùng', avatar: 'NH', avatarColor: '#D97706',
    time: '5 giờ trước', cat: 'qna',
    title: 'Giúp mình bài mạch điện Thevenin',
    excerpt: 'Câu 3 phần bài tập về nhà định lý Thevenin, chỗ tính R_th mình đang bị vướng. Ai có đáp án tham khảo không ạ?',
    tags: ['Vật lý 2', 'Mạch điện'], likes: 3, comments: 12, image: null,
  },
  {
    id: 'p3', user: 'Phạm Anh', avatar: 'PA', avatarColor: '#7C3AED',
    time: 'Hôm qua', cat: 'team',
    title: 'Tuyển thành viên làm BTL OOP',
    excerpt: 'Nhóm mình đang có 3 người, cần thêm 2 bạn làm BTL lập trình hướng đối tượng (Java). Chủ đề: Quản lý thư viện.',
    tags: ['OOP', 'Java', 'BTL'], likes: 15, comments: 9, image: null,
  },
];

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const cat = CATEGORIES.find((c) => c.id === post.cat) || CATEGORIES[0];
  const catColor = CAT_COLOR[post.cat] || '#64748B';

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <Card
      sx={{
        mb: 2, borderRadius: '14px',
        border: '1px solid', borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': { borderColor: 'rgba(15,76,129,0.3)', boxShadow: '0 4px 12px rgba(15,76,129,0.12)' },
      }}
      elevation={0}
    >
      <CardContent sx={{ p: '20px 24px', '&:last-child': { pb: '16px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Avatar sx={{ bgcolor: post.avatarColor, width: 40, height: 40, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {post.avatar}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={600} noWrap>{post.user}</Typography>
            <Typography variant="caption" color="text.secondary">{post.time}</Typography>
          </Box>
          <Chip
            icon={cat.icon} label={cat.label} size="small"
            sx={{
              bgcolor: catColor + '18', color: catColor, border: '1px solid', borderColor: catColor + '40',
              fontWeight: 600, fontSize: 11,
              '& .MuiChip-icon': { color: catColor }, '& .MuiChip-label': { px: 0.75 },
            }}
          />
          <IconButton size="small" sx={{ color: 'text.disabled' }}>
            <MoreHorizRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="h6" fontWeight={700} mb={0.75} sx={{ fontSize: 16 }}>{post.title}</Typography>
        <Typography variant="body2" color="text.secondary" mb={1.5}
          sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </Typography>

        {post.image && (
          <Box component="img" src={post.image} alt={post.title}
            sx={{ width: '100%', maxHeight: 240, objectFit: 'cover', borderRadius: '10px', mb: 1.5, display: 'block' }} />
        )}

        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1.5 }}>
          {post.tags.map((t) => (
            <Chip key={t} label={`#${t}`} size="small" variant="outlined"
              sx={{ fontSize: 11, height: 22, borderColor: 'divider', color: 'text.secondary', '& .MuiChip-label': { px: 0.75 } }} />
          ))}
        </Box>

        <Divider sx={{ mb: 1.25 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Button size="small" startIcon={liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
            onClick={handleLike}
            sx={{
              color: liked ? '#DC2626' : 'text.secondary', minWidth: 0, px: 1,
              '& .MuiButton-startIcon': { mr: 0.5 },
              '&:hover': { bgcolor: liked ? '#DC262618' : 'action.hover' },
            }}>
            <Typography variant="caption" fontWeight={500}>{likeCount}</Typography>
          </Button>
          <Button size="small" startIcon={<ChatBubbleOutlineRoundedIcon />}
            sx={{ color: 'text.secondary', minWidth: 0, px: 1, '& .MuiButton-startIcon': { mr: 0.5 } }}>
            <Typography variant="caption" fontWeight={500}>{post.comments}</Typography>
          </Button>
          <Box sx={{ flex: 1 }} />
          <Tooltip title="Lưu bài">
            <IconButton size="small" onClick={() => setBookmarked((v) => !v)}
              sx={{ color: bookmarked ? 'primary.main' : 'text.disabled' }}>
              {bookmarked ? <BookmarkRoundedIcon fontSize="small" /> : <BookmarkBorderRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Chia sẻ">
            <IconButton size="small" sx={{ color: 'text.disabled' }}><ShareRoundedIcon fontSize="small" /></IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Community() {
  const fileRef = useRef(null);
  const [posts, setPosts] = useState(INIT_POSTS);
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('qna');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newTags, setNewTags] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const filtered = posts.filter((p) => {
    const matchCat = activeCat === 'all' || p.cat === activeCat;
    const q = search.toLowerCase();
    return matchCat && (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      || p.tags.some((t) => t.toLowerCase().includes(q)));
  });

  const createPost = () => {
    if (!newTitle.trim() || !newExcerpt.trim()) return;
    setPosts((ps) => [{
      id: `p${_nextId++}`, user: 'Nguyễn Nam', avatar: 'NN', avatarColor: '#0F4C81',
      time: 'Vừa xong', cat: newCat, title: newTitle, excerpt: newExcerpt,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean), likes: 0, comments: 0, image: imgUrl || null,
    }, ...ps]);
    setNewTitle(''); setNewCat('qna'); setNewExcerpt(''); setNewTags(''); setImgUrl('');
    setCreateOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} mb={0.25}>Cộng đồng</Typography>
          <Typography variant="body2" color="text.secondary">Hỏi đáp · chia sẻ note · tìm nhóm · thảo luận</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setCreateOpen(true)} sx={{ flexShrink: 0 }}>
          Đăng bài
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2.5, overflowX: 'auto', pb: 0.5,
            '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 2 } }}>
            {CATEGORIES.map((c) => (
              <Chip key={c.id} icon={c.icon} label={c.label} onClick={() => setActiveCat(c.id)}
                variant={activeCat === c.id ? 'filled' : 'outlined'} color={activeCat === c.id ? 'primary' : 'default'}
                sx={{ px: 0.5, flexShrink: 0, fontWeight: activeCat === c.id ? 600 : 400 }} />
            ))}
          </Box>
          <TextField fullWidth placeholder="Tìm kiếm bài viết, tag…" value={search} onChange={(e) => setSearch(e.target.value)} size="small"
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize: 18 }} /></InputAdornment> }} sx={{ mb: 3 }} />
          <Box sx={{ maxWidth: 680 }}>
            {filtered.length > 0 ? filtered.map((p) => <PostCard key={p.id} post={p} />) : (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '14px', border: '1px solid', borderColor: 'divider' }} elevation={0}>
                <Typography variant="h2" mb={1}>🔍</Typography>
                <Typography color="text.secondary">Không tìm thấy bài viết nào.</Typography>
              </Paper>
            )}
          </Box>
        </Box>
        <Box sx={{ width: 240, flexShrink: 0, display: { xs: 'none', lg: 'block' } }}>
          <Card sx={{ borderRadius: '14px', border: '1px solid', borderColor: 'divider', mb: 2 }} elevation={0}>
            <CardContent sx={{ p: '16px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                <TrendingUpRoundedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="subtitle2" fontWeight={700}>Trending</Typography>
              </Box>
              {TRENDING.map((tag, i) => (
                <Box key={tag} onClick={() => setSearch(tag)}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.75, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  <Typography variant="caption" color="text.disabled" sx={{ width: 16, fontWeight: 600 }}>{i + 1}</Typography>
                  <Typography variant="body2" fontWeight={500}>#{tag}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: '14px', border: '1px solid', borderColor: 'divider' }} elevation={0}>
            <CardContent sx={{ p: '16px !important' }}>
              <Typography variant="subtitle2" fontWeight={700} mb={1.5}>Cộng đồng</Typography>
              {[{ label: 'Bài viết', value: posts.length }, { label: 'Thành viên', value: '1.2K' }, { label: 'Hoạt động hôm nay', value: 47 }].map((s) => (
                <Box key={s.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                  <Typography variant="caption" fontWeight={600}>{s.value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Tạo bài viết mới</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
          <TextField label="Tiêu đề *" fullWidth value={newTitle} onChange={(e) => setNewTitle(e.target.value)} autoFocus />
          <FormControl fullWidth>
            <InputLabel>Danh mục *</InputLabel>
            <Select value={newCat} label="Danh mục *" onChange={(e) => setNewCat(e.target.value)}>
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Nội dung *" fullWidth multiline minRows={4} value={newExcerpt} onChange={(e) => setNewExcerpt(e.target.value)} />
          <TextField label="Tags (cách nhau bằng dấu phẩy)" fullWidth value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="Toán, OOP, Giải tích…" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files[0]; if (f) setImgUrl(URL.createObjectURL(f)); }} />
            <Button variant="outlined" startIcon={<ImageRoundedIcon />} onClick={() => fileRef.current?.click()}>{imgUrl ? 'Đổi ảnh' : 'Đính kèm ảnh'}</Button>
            {imgUrl && <Typography variant="caption" color="success.main">Đã đính kèm ảnh ✓</Typography>}
          </Box>
          {imgUrl && <Box component="img" src={imgUrl} sx={{ width: 120, height: 80, objectFit: 'cover', borderRadius: '10px' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={createPost} disabled={!newTitle.trim() || !newExcerpt.trim()}>Đăng bài</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}