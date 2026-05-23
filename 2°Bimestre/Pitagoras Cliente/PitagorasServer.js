const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // '*' permite qualquer origem
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//se vier uma requisição POST para a rota /enviar-mensagem, o servidor irá processar a mensagem recebida, convertê-la para maiúsculas e enviar uma resposta de volta ao cliente.
app.post('/pitagoras', (req, res) => {
    let A = req.body.A;
    let B = req.body.B;
    console.log(`Os valores recebidos foram: ${A} e ${B}`);
    let resposta= Math.sqrt(A**2 + B**2);
    console.log(`O valor devolvido será: ${resposta.toFixed(2)}`);
    let mensagem = `Eu sou o servidor, você mandou os valores dos catetos e o resultado foi "${resposta.toFixed(2)}" - estou lhe respondendo para você saber disso.`
    res.send(mensagem);
});

const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP()

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`)
})
