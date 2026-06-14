const express = require('express');
const os = require('os');
const fs = require('fs');
const multer = require('multer');

const app = express();
const port = 3000;

// Pasta onde as imagens serão salvas
const pastaImagens = './imagens/';

// Verifica se a pasta existe.
// Caso não exista, ela será criada.
if (!fs.existsSync(pastaImagens)) {
    fs.mkdirSync(pastaImagens, { recursive: true });
}

// ---------------------------------------------------
// CONFIGURAÇÃO DO MULTER
// ---------------------------------------------------

// Define em qual pasta a imagem será salva
function definirDestino(req, file, callback) {
    callback(null, pastaImagens);
}

// Define o nome do arquivo da imagem
function definirNomeArquivo(req, file, callback) {
    // Usa o RA do aluno como nome da imagem
    // Exemplo: 123.png
    const cpf = req.body.cpf || 'sem-cpf';
    const nomeArquivo = cpf + '.png';
    callback(null, nomeArquivo);
}

// Configuração do armazenamento
const armazenamento = multer.diskStorage({
    destination: definirDestino,
    filename: definirNomeArquivo
});

// Middleware do multer
const upload = multer({
    storage: armazenamento
});

// ---------------------------------------------------
// MIDDLEWARES
// ---------------------------------------------------

app.use(express.json());

// Middleware CORS
// Permite que o navegador acesse o servidor
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );
    next();
});

// ---------------------------------------------------
// ROTA PRINCIPAL
// ---------------------------------------------------

// Esta rota:
// 1) Recebe os dados do aluno
// 2) Calcula a média
// 3) Calcula a situação
// 4) Retorna o resultado

app.post('/enviar-dados', upload.single('foto'), function (req, res) {
    try {
        // Dados recebidos do formulário
        const cpf = req.body.cpf;
        const nome = req.body.nome;

        const altura = parseFloat(req.body.altura);
        const peso = parseFloat(req.body.peso);

        if (!cpf || !nome) {
            return res.status(400).json({
                erro: 'cpf e nome são obrigatórios.'
            });
        }
        
        if (cpf.length<11) {
            return res.status(400).json({
                erro: 'cpf inválido'
            });
        }

        if (isNaN(altura) || isNaN(peso)||altura<0||peso<0
        ) {
            return res.status(400).json({
                erro: 'O peso e a altura devem ser numéricas.'
            });
        }
        const imc = peso/(altura**2) ;
        let classificação = '';
        if (imc < 16) {
            classificação = 'Magreza grave';
        } else if (imc <17) {
            classificação = 'Magreza moderada';
        } else if(imc<18.5) {
            classificação = 'Magreza leve';
        }else if(imc<25){
            classificação = 'Saudável';
        }else if(imc<30){
            classificação = 'Sobrepeso';
        }else if(imc<35){
            classificação = 'Obesidade Grau I';
        }else if(imc<40){
            classificação = 'Obesidade Grau II';
        }else{
            classificação = 'Obesidade Grau III (mórbida)';
        }

        // -----------------------------------------
        // EXIBE NO TERMINAL ONDE O SERVIDOR ESTÁ RODANDO
        // -----------------------------------------

        console.log('--------------------------------');
        console.log('Nome:', nome);
        console.log('Cpf:', cpf);
        console.log('Imc:', imc.toFixed(2));
        console.log('classificaçao:', classificação);

        if (req.file) {
            console.log(
                'Imagem salva:',
                req.file.filename
            );
        }

        // -----------------------------------------
        // RESPOSTA PARA O CLIENTE
        // -----------------------------------------

        res.json({
            mensagem: 'Dados processados com sucesso!',
            nomeArquivo: req.file
                ? req.file.filename
                : null,
            dados: {
                cpf: cpf,
                nome: nome,
                imc: imc.toFixed(2),
                classificação: classificação
            }
        });

    } catch (erro) {
        console.log('Erro:', erro);
        res.status(500).json({
            erro: 'Erro interno do servidor.'
        });
    }
}
);


function obterIP() { // FUNÇÃO PARA OBTER O IP DA MÁQUINA
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) {
                return info.address;
            }
        }
    }
    return 'localhost';
}

const ip = obterIP();

// ---------------------------------------------------
// INICIA O SERVIDOR
// ---------------------------------------------------

app.listen(port, '0.0.0.0', function () {
    console.log(`Servidor rodando em http://${ip}:${port}`);
    console.log('Pasta das imagens:', pastaImagens);
});