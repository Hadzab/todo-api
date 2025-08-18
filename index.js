const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const ARQUIVO = './tarefas.json';

// Função para ler tarefas do arquivo de forma segura
function lerTarefas() {
  try {
    const data = fs.readFileSync(ARQUIVO, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Erro ao ler tarefas.json:", err);
    return [];
  }
}

// Função para salvar tarefas no arquivo
function salvarTarefas(tarefas) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
}

// GET /tarefas → lista todas as tarefas
app.get('/tarefas', (req, res) => {
  const tarefas = lerTarefas();
  res.json(tarefas);
});

// POST /tarefas → cria nova tarefa
app.post('/tarefas', (req, res) => {
  const tarefas = lerTarefas();
  const { titulo, descricao } = req.body;

  // Validação de entrada
  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    return res.status(400).json({ erro: "Título inválido" });
  }
  if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
    return res.status(400).json({ erro: "Descrição inválida" });
  }

  // Gera ID único
  const novaTarefa = {
    id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
    titulo,
    descricao,
    concluida: false
  };

  tarefas.push(novaTarefa);
  salvarTarefas(tarefas);

  res.status(201).json(novaTarefa);
});

// PUT /tarefas/:id → atualiza tarefa existente
app.put('/tarefas/:id', (req, res) => {
  const tarefas = lerTarefas();
  const id = parseInt(req.params.id);
  const { titulo, descricao, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });

  if (titulo !== undefined && typeof titulo === 'string' && titulo.trim() !== '') tarefa.titulo = titulo;
  if (descricao !== undefined && typeof descricao === 'string' && descricao.trim() !== '') tarefa.descricao = descricao;
  if (concluida !== undefined) tarefa.concluida = concluida;

  salvarTarefas(tarefas);
  res.json(tarefa);
});

// DELETE /tarefas/:id → remove tarefa
app.delete('/tarefas/:id', (req, res) => {
  const tarefas = lerTarefas();
  const id = parseInt(req.params.id);

  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ erro: "Tarefa não encontrada" });

  const tarefaRemovida = tarefas.splice(index, 1);
  salvarTarefas(tarefas);

  res.json({ mensagem: "Tarefa removida com sucesso", tarefa: tarefaRemovida[0] });
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Tarefas funcionando corretamente!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
