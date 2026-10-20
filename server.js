const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Sem cache durante o desenvolvimento: o navegador sempre pega a versão mais recente
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false,
  lastModified: false,
  setHeaders: (res) => res.set('Cache-Control', 'no-store'),
}));

// Recebe as respostas do quiz (por enquanto apenas registra no console)
app.post('/api/respostas', (req, res) => {
  console.log('Respostas do quiz:', req.body);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Cellive Quiz rodando em http://localhost:${PORT}`);
});
