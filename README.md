# Todo-API

Uma API RESTful simples para gerenciamento de tarefas, construída com **Node.js** e **Express**, utilizando um arquivo JSON para persistência de dados.

---

## Tecnologias utilizadas
- Node.js  
- Express  
- File System (JSON)  
- Postman (para testes)  

---

## Funcionalidades
- Listar tarefas (GET `/tarefas`)  
- Criar novas tarefas (POST `/tarefas`)  
- Atualizar tarefas existentes (PUT `/tarefas/:id`)  
- Remover tarefas (DELETE `/tarefas/:id`)  
- Persistência de dados em arquivo JSON (`tarefas.json`)  
- Validações de entrada para título, descrição e conclusão  

---

## Instalação
1. Clone o repositório:
git clone <URL_DO_SEU_REPOSITORIO>

2. Entre na pasta do projeto:
cd todo-api

3. Instale as dependências:
npm install

---

## Como rodar
Inicie o servidor com o comando:
node index.js
= > O servidor será iniciado na porta 3000.

Acesse a API via Postman ou navegador:
http://localhost:3000

---

## Rotas da API
### GET /tarefas
Retorna todas as tarefas.

Exemplo de resposta:

json

[
  {
    "id": 1,
    "titulo": "Aprender Express",
    "descricao": "Criar rotas e APIs REST",
    "concluida": false
  }
]

---

### POST /tarefas
Cria uma nova tarefa.

*Body (JSON):*

json

{
  "titulo": "Aprender Node.js",
  "descricao": "Construir API completa"
}

Resposta:

json

{
  "id": 2,
  "titulo": "Aprender Node.js",
  "descricao": "Construir API completa",
  "concluida": false
}

---

### PUT /tarefas/:id
Atualiza uma tarefa existente.

*Body (JSON) – apenas os campos que deseja atualizar:*

json

{
  "titulo": "Aprender Node.js + Express",
  "concluida": true
}

Resposta:

json

{
  "id": 2,
  "titulo": "Aprender Node.js + Express",
  "descricao": "Construir API completa",
  "concluida": true
}

---

### DELETE /tarefas/:id
Remove uma tarefa.

Resposta:

json

{
  "mensagem": "Tarefa removida com sucesso",
  "tarefa": {
    "id": 2,
    "titulo": "Aprender Node.js + Express",
    "descricao": "Construir API completa",
    "concluida": true
  }
}

---

## Observações
Todos os dados são salvos no arquivo tarefas.json.

A API trata entradas inválidas e retorna mensagens de erro adequadas.

IDs das tarefas são gerados automaticamente de forma única.

---

## Testando a API
Recomenda-se utilizar o Postman ou Insomnia para testar todas as rotas de forma prática.

---

## Licença
Este projeto é open-source e pode ser usado para aprendizado e portfólio. Obrigado pela atenção!
