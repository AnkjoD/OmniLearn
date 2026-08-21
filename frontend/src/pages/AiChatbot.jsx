import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Card, TextField, IconButton, Avatar, Paper } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export default function AiChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Chào bạn! Mình là AI trợ giảng của OmniLearn. Mình có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), type: 'user', text: input.trim() };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Giả lập AI trả lời
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: 'Chức năng đang được phát triển. Sắp tới mình có thể giải đáp bài tập, tóm tắt bài giảng, và tạo đề thi thử cho bạn nhé!'
      }]);
    }, 1000);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>AI Trợ Giảng</Typography>
        <Typography variant="body1" color="text.secondary">Hỏi đáp, tóm tắt tài liệu, và lên kế hoạch học tập cùng AI.</Typography>
      </Box>

      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: '16px', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }} elevation={0}>
        {/* Chat history */}
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto', bgcolor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {messages.map(m => {
            const isAI = m.type === 'ai';
            return (
              <Box key={m.id} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexDirection: isAI ? 'row' : 'row-reverse' }}>
                <Avatar sx={{ bgcolor: isAI ? 'primary.main' : 'secondary.main', width: 40, height: 40 }}>
                  {isAI ? <SmartToyRoundedIcon fontSize="small"/> : <PersonRoundedIcon fontSize="small"/>}
                </Avatar>
                <Paper sx={{ p: 2, borderRadius: '16px', borderTopLeftRadius: isAI ? 4 : 16, borderTopRightRadius: isAI ? 16 : 4, maxWidth: '75%', bgcolor: isAI ? '#fff' : 'primary.main', color: isAI ? 'text.primary' : '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }} elevation={0}>
                  <Typography variant="body1">{m.text}</Typography>
                </Paper>
              </Box>
            );
          })}
          <div ref={endRef} />
        </Box>

        {/* Input box */}
        <Box sx={{ p: 2, bgcolor: '#fff', borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField 
            fullWidth 
            placeholder="Nhập câu hỏi của bạn..." 
            variant="outlined" 
            size="small"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px', bgcolor: '#F1F5F9' } }}
          />
          <IconButton color="primary" onClick={handleSend} sx={{ bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' }, width: 40, height: 40 }}>
            <SendRoundedIcon fontSize="small"/>
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}