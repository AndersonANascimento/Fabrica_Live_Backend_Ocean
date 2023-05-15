const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

/* Lista de endpoints */
const mensagens = [
    "Essa é a 1ª mensagem",
    "Essa é a 2ª mensagem",
];

app.get('/mensagens', (req, res) => {
    res.send(mensagens);
});
app.get('/mensagens/:id', (req, res) => {
    const id = req.params.id - 1;
    const mensagem = mensagens[id];
    res.send(mensagem);
});
app.post('/mensagens', (req, res) => {
    const mensagem = req.body.mensagem;
    mensagens.push(mensagem)
    res.send(`Mensagem criada com sucesso: ${mensagem}`);
});
app.put('/mensagens/:id', (req, res) => {
    const id = req.params.id - 1;
    const mensagem = req.body.mensagem;
    mensagens[id] = mensagem
    res.send(`Mensagem atualizada com sucesso: ${mensagem}`);
});
app.delete('/mensagens', (req, res) => {
    res.send('Hello!');
});

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});