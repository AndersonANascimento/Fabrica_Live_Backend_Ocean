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
    {
        "id": 1,
        "texto": "Essa é a 1ª mensagem",
    },
    {
        "id": 2,
        "texto": "Essa é a 2ª mensagem",
    },
];

const getMensagensValidas = () => mensagens.filter(Boolean);

const getMensagemById = id => {
    return getMensagensValidas().find(msg => msg.id === id);
};

app.get('/mensagens', (req, res) => {
    res.send(getMensagensValidas());
    console.log('get /mensagens');
});

app.get('/mensagens/:id', (req, res) => {
    const id = +req.params.id; // o sinal de '+' converte o parametro 'id' em number
    
    const mensagem = getMensagemById(id);
    
    if (!mensagem) {
        res.send("Mensagem não encontrada!");
        return;
    }
    
    res.send(mensagem);
    console.log(`get /mensagens/${id}`);
});

app.post('/mensagens', (req, res) => {
    const mensagem = req.body;
    
    if (!mensagem || !mensagem.texto) {
        res.send("Mensagem inválida!");
        return;
    }
    
    mensagem.id = mensagens.length + 1;    
    mensagens.push(mensagem);
    
    res.send(`Mensagem criada com sucesso! ${mensagem.texto}`);
    console.log(`post /mensagens ${mensagem}`);
});

app.put('/mensagens/:id', (req, res) => {
    const id = +req.params.id;
    
    const mensagem = getMensagemById(id);

    if (!mensagem) {
        res.send("Mensagem não encontrada!");
        return;
    }
    
    const novoTexto = req.body.texto;
    
    if (!novoTexto) {
        res.send("Mensagem inválida!")
        return;
    }
    
    mensagem.texto = novoTexto;
    
    res.send(`Mensagem atualizada com sucesso: ${mensagem.texto}`);
    console.log(`put /mensagens/${id}`);
});

app.delete('/mensagens/:id', (req, res) => {
    const id = +req.params.id;
    
    const mensagem = getMensagemById(id);
    
    if (!mensagem) {
        res.send("Mensagem não encontrada!");
        return;
    }
    
    const index = mensagens.indexOf(mensagem)
    delete mensagens[index];
    
    res.send('Mensagem removida com sucesso!');
    console.log(`delete /mensagens/${id}`);
});

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});