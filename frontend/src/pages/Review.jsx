import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Chip, LinearProgress, Paper, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const FLASHCARDS = [
  { id: 'f1', front: 'lim(x→0) sin(x)/x = ?', back: '1', subject: 'Giải tích' },
  { id: 'f2', front: 'Định lý kẹp phát biểu?', back: 'g≤f≤h, lim g=lim h=L ⟹ lim f=L', subject: 'Giải tích' },
  { id: 'f3', front: 'v từ gia tốc?', back: 'v = v₀ + at', subject: 'Vật lý' },
];
const QUIZ = [
  { id: 'q1', question: 'lim(x→0) sin(x)/x = ?', options: ['0', '1', '∞', 'Không tồn tại'], correct: 1, subject: 'Giải tích' },
  { id: 'q2', question: 'Đơn vị lực trong SI?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correct: 2, subject: 'Vật lý' },
];

function FlashcardView({ cards }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (idx >= cards.length) return (
    <Box textAlign="center" py={8}>
      <Typography variant="h5" fontWeight={700} mb={1}>Hoàn thành! 🎉</Typography>
      <Typography color="text.secondary" mb={3}>Bạn đã ôn xong {cards.length} thẻ hôm nay.</Typography>
      <Button variant="contained" onClick={() => { setIdx(0); setFlipped(false); }}>Ôn lại từ đầu</Button>
    </Box>
  );

  const card = cards[idx];
  const next = () => { setFlipped(false); setTimeout(() => setIdx(i => i + 1), 200); };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>{idx + 1} / {cards.length}</Typography>
        <Chip label={card.subject} size="small" variant="outlined" sx={{ fontWeight: 600, color: 'primary.main', borderColor: 'primary.main' }} />
      </Box>
      <LinearProgress variant="determinate" value={(idx / cards.length) * 100} sx={{ mb: 4, height: 6, borderRadius: 3 }} />
      
      {/* 3D Flip Card */}
      <Box
        sx={{
          perspective: 1000, mb: 4, cursor: 'pointer',
          width: '100%', minHeight: 280, position: 'relative',
        }}
        onClick={() => setFlipped(f => !f)}
      >
        <Box sx={{
          width: '100%', height: '100%', position: 'absolute', inset: 0,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>
          {/* Front */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              p: 4, textAlign: 'center', borderRadius: '16px',
              border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="caption" color="text.secondary" mb={2} fontWeight={600} letterSpacing={1}>CÂU HỎI</Typography>
            <Typography variant="h5" fontWeight={600} lineHeight={1.5}>{card.front}</Typography>
            <Typography variant="caption" color="text.disabled" sx={{ position: 'absolute', bottom: 16 }}>Nhấn để lật thẻ</Typography>
          </Paper>
          {/* Back */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              p: 4, textAlign: 'center', borderRadius: '16px',
              border: '1px solid', borderColor: 'primary.main', bgcolor: 'primary.main', color: 'primary.contrastText',
              transform: 'rotateY(180deg)',
              boxShadow: '0 8px 24px rgba(15,76,129,0.2)',
            }}
          >
            <Typography variant="caption" mb={2} fontWeight={600} letterSpacing={1} sx={{ opacity: 0.8 }}>ĐÁP ÁN</Typography>
            <Typography variant="h5" fontWeight={600} lineHeight={1.5}>{card.back}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', opacity: flipped ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: flipped ? 'auto' : 'none' }}>
        <Button variant="outlined" color="error" startIcon={<CancelRoundedIcon />} onClick={(e) => { e.stopPropagation(); next(); }} sx={{ flex: 1, height: 48, borderRadius: '12px' }}>
          Chưa nhớ
        </Button>
        <Button variant="contained" color="success" startIcon={<CheckCircleRoundedIcon />} onClick={(e) => { e.stopPropagation(); next(); }} sx={{ flex: 1, height: 48, borderRadius: '12px' }}>
          Đã nhớ
        </Button>
      </Box>
    </Box>
  );
}
function QuizView({ questions }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];
  
  const submit = () => {
    const ns = selected === q.correct ? score + 1 : score;
    if (idx + 1 >= questions.length) { setScore(ns); setDone(true); return; }
    setScore(ns); setIdx(i => i + 1); setSelected(null);
  };

  if (done) return (
    <Box textAlign="center" py={8}>
      <Typography variant="h2" fontWeight={800} mb={1} color="primary.main">{score}/{questions.length}</Typography>
      <Typography variant="h6" color="text.secondary" mb={4}>
        {score === questions.length ? 'Xuất sắc! Bạn đã nắm vững kiến thức 🏆' : score >= questions.length / 2 ? 'Khá tốt! Cố gắng thêm chút nữa 👍' : 'Cần ôn tập thêm phần này 📚'}
      </Typography>
      <Button variant="contained" onClick={() => { setIdx(0); setSelected(null); setScore(0); setDone(false); }} size="large" sx={{ borderRadius: '10px' }}>
        Làm lại Quiz
      </Button>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>Câu {idx + 1} / {questions.length}</Typography>
        <Chip label={q.subject} size="small" variant="outlined" sx={{ fontWeight: 600, color: 'primary.main', borderColor: 'primary.main' }} />
      </Box>
      <LinearProgress variant="determinate" value={(idx / questions.length) * 100} sx={{ mb: 4, height: 6, borderRadius: 3 }} />
      
      <Typography variant="h5" fontWeight={600} mb={4} lineHeight={1.5}>{q.question}</Typography>
      
      <FormControl fullWidth>
        <RadioGroup value={selected} onChange={e => setSelected(Number(e.target.value))}>
          {q.options.map((opt, i) => (
            <Paper key={i} elevation={0} sx={{
              mb: 1.5, borderRadius: '12px', border: '2px solid',
              borderColor: selected === i ? 'primary.main' : 'divider',
              bgcolor: selected === i ? 'primary.main' + '0A' : 'transparent',
              transition: 'all 0.2s',
              '&:hover': { borderColor: selected === i ? 'primary.main' : 'text.disabled' }
            }}>
              <FormControlLabel value={i} control={<Radio />} label={<Typography fontWeight={selected === i ? 600 : 400}>{opt}</Typography>} sx={{ width: '100%', py: 1, px: 2, m: 0 }} />
            </Paper>
          ))}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" onClick={submit} disabled={selected === null} sx={{ mt: 3, height: 48, borderRadius: '10px' }} fullWidth>
        {idx + 1 >= questions.length ? 'Nộp bài' : 'Câu tiếp theo'}
      </Button>
    </Box>
  );
}

export default function Review() {
  const [mode, setMode] = useState('flashcard');
  return (
    <Box maxWidth={680} mx="auto">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>Ôn tập</Typography>
        <Typography variant="body2" color="text.secondary">Spaced repetition — hệ thống tự động sắp xếp lịch ôn cho bạn.</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 4, justifyContent: 'center' }}>
        <Button variant={mode === 'flashcard' ? 'contained' : 'outlined'} onClick={() => setMode('flashcard')} sx={{ borderRadius: '10px', px: 3 }}>
          Flashcard ({FLASHCARDS.length})
        </Button>
        <Button variant={mode === 'quiz' ? 'contained' : 'outlined'} onClick={() => setMode('quiz')} sx={{ borderRadius: '10px', px: 3 }}>
          Quiz ({QUIZ.length})
        </Button>
      </Box>
      <Card sx={{ borderRadius: '20px', border: '1px solid', borderColor: 'divider' }} elevation={0}>
        <CardContent sx={{ p: '32px !important' }}>
          {mode === 'flashcard' ? <FlashcardView cards={FLASHCARDS} /> : <QuizView questions={QUIZ} />}
        </CardContent>
      </Card>
    </Box>
  );
}