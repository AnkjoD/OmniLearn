import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Paper, TextField, IconButton, Chip,
  Divider, List, ListItem, Avatar, CircularProgress,
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

// ponytail: mock note content — thay bằng API fetch theo sessionId
const MOCK_NOTE = {
  id: 's1',
  title: 'Giới hạn hàm số',
  subject: 'Giải tích',
  youtubeId: 'dQw4w9WgXcQ', // placeholder
  sections: [
    {
      heading: '1. Định nghĩa giới hạn',
      timestamp: 120,
      content: `Giới hạn của hàm số f(x) khi x tiến tới a là L, ký hiệu:\n\n**lim(x→a) f(x) = L**\n\nNghĩa là: với mọi ε > 0, tồn tại δ > 0 sao cho nếu 0 < |x − a| < δ thì |f(x) − L| < ε.`,
    },
    {
      heading: '2. Các quy tắc tính giới hạn',
      timestamp: 480,
      content: `- **Giới hạn tổng**: lim(f+g) = lim f + lim g\n- **Giới hạn tích**: lim(f·g) = lim f · lim g\n- **Giới hạn thương**: lim(f/g) = lim f / lim g (lim g ≠ 0)\n- **Giới hạn kẹp (Squeeze theorem)**: nếu g(x) ≤ f(x) ≤ h(x) và lim g = lim h = L thì lim f = L`,
    },
    {
      heading: '3. Giới hạn một phía',
      timestamp: 900,
      content: `- **Giới hạn phải**: lim(x→a⁺) f(x) — x tiến tới a từ bên phải\n- **Giới hạn trái**: lim(x→a⁻) f(x) — x tiến tới a từ bên trái\n\nHàm có giới hạn tại a khi và chỉ khi giới hạn trái = giới hạn phải.`,
    },
    {
      heading: '4. Giới hạn đặc biệt quan trọng',
      timestamp: 1380,
      content: `- lim(x→0) sin(x)/x = **1**\n- lim(x→∞) (1 + 1/x)ˣ = **e**\n- lim(x→0) (eˣ − 1)/x = **1**`,
    },
  ],
};

// ponytail: mock AI responses — thay bằng streaming API call
const AI_RESPONSES = {
  default: 'Câu hỏi hay! Dựa trên ghi chú về giới hạn hàm số, tôi có thể giải thích thêm. Hãy đặt câu hỏi cụ thể hơn để tôi trả lời chính xác nhé.',
  'epsilon': 'ε (epsilon) trong định nghĩa giới hạn đại diện cho "sai số đầu ra" — khoảng cách tối đa từ f(x) đến L. δ (delta) là "sai số đầu vào" — khoảng cách tối đa từ x đến a. Định nghĩa nói: với sai số đầu ra ε bất kỳ, ta luôn tìm được δ phù hợp.',
  'squeeze': 'Định lý kẹp (Squeeze Theorem) hoạt động như sau: nếu ta biết g(x) ≤ f(x) ≤ h(x) và cả g, h đều tiến tới L, thì f bị "kẹp" giữa và cũng phải tiến tới L. Ví dụ điển hình: chứng minh lim(x→0) x²sin(1/x) = 0.',
};

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('epsilon') || lower.includes('delta') || lower.includes('ε') || lower.includes('δ')) return AI_RESPONSES['epsilon'];
  if (lower.includes('kẹp') || lower.includes('squeeze')) return AI_RESPONSES['squeeze'];
  return AI_RESPONSES['default'];
}

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', flexDirection: isUser ? 'row-reverse' : 'row', mb: 2 }}>
      <Avatar sx={{ width: 28, height: 28, bgcolor: isUser ? 'primary.main' : 'secondary.main', fontSize: 14, flexShrink: 0 }}>
        {isUser ? <PersonRoundedIcon sx={{ fontSize: 16 }} /> : <SmartToyRoundedIcon sx={{ fontSize: 16 }} />}
      </Avatar>
      <Paper
        variant="outlined"
        sx={{
          p: 1.5, maxWidth: '80%',
          bgcolor: isUser ? '#0F4C81' : '#F1F5F9',
          color: isUser ? '#FFFFFF' : '#0F172A',
          border: 'none',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{msg.content}</Typography>
      </Paper>
    </Box>
  );
}

export default function NoteDetail() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Xin chào! Tôi là AI assistant cho ghi chú này. Hỏi tôi bất cứ điều gì về "Giới hạn hàm số" nhé!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    // ponytail: simulated delay — thay bằng fetch('/api/chat')
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: getAIResponse(userMsg.content) }]);
      setLoading(false);
    }, 1000);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 128px)', gap: 2 }}>
      {/* LEFT: Note content */}
      <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
        <Paper variant="outlined" sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', aspectRatio: '16/9' }}>
          <iframe
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${MOCK_NOTE.youtubeId}${activeTimestamp ? `?start=${activeTimestamp}` : ''}`}
            title={MOCK_NOTE.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen style={{ display: 'block' }}
          />
        </Paper>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={MOCK_NOTE.subject} size="small" color="primary" variant="outlined" />
        </Box>
        <Typography variant="h4" fontWeight={700} mb={3}>{MOCK_NOTE.title}</Typography>

        {MOCK_NOTE.sections.map((sec) => (
          <Box key={sec.heading} mb={3}>
            <Box
              onClick={() => setActiveTimestamp(sec.timestamp)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, cursor: 'pointer',
                '&:hover .ts-chip': { opacity: 1 } }}
            >
              <Typography variant="h5" fontWeight={600}>{sec.heading}</Typography>
              <Chip
                className="ts-chip"
                icon={<AccessTimeRoundedIcon />}
                label={formatTime(sec.timestamp)}
                size="small" variant="outlined" color="primary"
                sx={{ opacity: 0.4, transition: 'opacity 0.2s' }}
              />
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
              {sec.content}
            </Typography>
            <Divider sx={{ mt: 3 }} />
          </Box>
        ))}
      </Box>

      {/* RIGHT: Chatbot panel */}
      <Paper variant="outlined"
        sx={{ width: 360, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden' }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyRoundedIcon color="secondary" />
          <Typography variant="h6" fontWeight={600}>AI Hỏi & Đáp</Typography>
          <Chip label={MOCK_NOTE.title} size="small" sx={{ ml: 'auto', maxWidth: 130 }} />
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
          {loading && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <CircularProgress size={14} />
              <Typography variant="caption" color="text.secondary">AI đang suy nghĩ…</Typography>
            </Box>
          )}
          <div ref={chatBottomRef} />
        </Box>

        <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
          <TextField
            fullWidth multiline maxRows={3} size="small"
            placeholder="Hỏi về ghi chú này… (Enter gửi)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          />
          <IconButton color="primary" onClick={sendMessage} disabled={!input.trim() || loading}>
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

