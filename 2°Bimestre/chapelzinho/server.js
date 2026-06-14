const express = require('express');
const os = require('os');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do pool de conexão com PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Middleware para parsear as mensagens em JSON
app.use(express.json());

// Middleware CORS (Verificação de origem autorizada)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota 1: Verificar Estoque e Aplicar Regra de Negócio (GET)
app.get('/api/estoque', async (req, res) => {
    try {
        const query = 'SELECT * FROM public.produto';
        const result = await pool.query(query);
        
        let reposicao = {};
        
        //para cada produto (na tabela produto, faça ...)
        result.rows.forEach(produto => {
            if (produto.quantidade_produto < produto.quantidade_minima_produto) {
                const quantidadeParaPedir = produto.quantidade_maxima_produto - produto.quantidade_produto;
                
                let nomeFormatado = produto.nome_produto.toLowerCase();
                // if(nomeFormatado === "pãos") nomeFormatado = "paes";
                
                reposicao[nomeFormatado] = quantidadeParaPedir;
            }
        });
        
        res.json({
            sucesso: true,
            dados_reposicao: reposicao
        });
        
    } catch (error) {
        console.error('Erro ao consultar estoque:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno da Servidorina' });
    }
});

// Rota 2: Enviar e Receber Mensagens (POST)
app.post('/api/mensagens', async (req, res) => {
    try {
        const mensagemRecebida = req.body.mensagem;
        const query = 'SELECT * FROM public.produto';
        const result =await pool.query(query);
        const mensagemSplit=mensagemRecebida.split(" ");
        
        if (!mensagemRecebida) {
            return res.status(400).json({
            status: "erro",
            mensagem: "Bilhete vazio!" });
        }

        let resposta = "<p>Produto não encontrado.</p>";
        if (mensagemSplit[0].toLowerCase()==='quantidade') {
            result.rows.find(produto => {
                if (mensagemSplit[2].toLowerCase()===produto.nome_produto.toLowerCase()) {
                    resposta= '<table border="1"><thead><tr><th>Produto</th><th>Estoque</th></tr></thead><tbody><tr><td>'+produto.nome_produto+'</td><td>'+produto.quantidade_produto+'</td></tr></tbody></table>';
                }
        });
        
    }else if(mensagemRecebida.toLowerCase()==="minimos"){
            resposta= '<table><thead><tr><th>Produto</th><th>Mínimo</th></tr></thead><tbody>'
            result.rows.forEach(produto => {
                
                resposta+='<tr><td>'+produto.nome_produto+'</td><td>'+produto.quantidade_minima_produto+'</td></tr>';
            });
           resposta+='</tbody></table>';
        }else{
               result.rows.find(produto => {
                if (mensagemRecebida.toLowerCase()===produto.nome_produto.toLowerCase()) {
                    resposta = `
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Quantidade Mínima</th>
                                <th>Quantidade Máxima</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${produto.id_produto}</td>
                                <td>${produto.nome_produto}</td>
                                <td>${produto.quantidade_produto}</td>
                                <td>${produto.quantidade_minima_produto}</td>
                                <td>${produto.quantidade_maxima_produto}</td>
                            </tr>
                        </tbody>
                    </table>`;
                }
        });
        }
       
        
        // Retornando um Status Code de Sucesso
        res.status(200).json({ 
            status: "sucesso", 
            mensagem: resposta
        });
        console.log(`Bilhete recebido da Clientina: ${mensagemRecebida}`);
        
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        res.status(500).json({ status: "erro", mensagem: 'Erro interno da Servidorina' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidorina atenta na porta ${port}`);
});
