//Mudar de pagina
function MudarPagina() {
    let pagina=document.getElementById("pagina").value;

    if (pagina=="clientes") {
        window.location.href="Cliente.html";
    } else if(pagina=="fornecedores") {
        window.location.href="Fornecedor.html";
    }else if(pagina=="produtos"){
        window.location.href="Produto.html";
    }else if(pagina=="inicio"){
        window.location.href="Inicio.html"
    }
}

const enderecoServidor = 'localhost';
const porta = '3001';

//Página Cliente

async function BuscarClientes(){
    try {
        const resposta = await fetch(`http://${enderecoServidor}:${porta}/api/Cliente/Todos`,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
            } 
        });

        const dados = await resposta.json();

        if(dados.sucesso && dados.clientes.length>0){
            let tabela = '<table>';
                tabela += '<tr><th>CPF</th><th>Nome</th><th>Telefone</th></tr>';
                    
                dados.clientes.forEach(clientes => {
                    tabela += `<tr>
                    <td>${clientes.cpf}</td>
                    <td>${clientes.nome}</td>
                    <td>${clientes.telefone}</td>
                    </tr>`;
                });
                
                tabela += '</table>';
                tabela += `<p><strong>Total de registros: ${dados.quantidade}</strong></p>`;
                
                document.getElementById('saidaCliente').innerHTML = `
                    <div class="sucesso">
                        ${tabela}
                    </div>`;
            } else if (dados.sucesso && dados.clientes.length === 0) {
                document.getElementById('saidaCliente').innerHTML = '<span>Nenhum cliente cadastrado</span>';
            } else {
                document.getElementById('saidaCliente').innerHTML = `<span class="erro">${dados.mensagem}</span>`;
            }
        
        
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('saidaCliente').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
    }
}

async function BuscarCPF() {
    const inputCpf= document.getElementById("inputCliente");
    const cpf = inputCpf.value.trim();
    if(!cpf){
        
        document.getElementById('saidaCliente').innerHTML = '<span class="erro">Por favor, digite um CPF</span>';
        inputCpf.focus();
        return;

    }else if(!/^\d{11}$/.test(cpf)){
        
        document.getElementById('saidaCliente').innerHTML = '<span class="erro">Por favor, digite um CPF válido. Obs: 11 dígitos</span>'; 
        inputCpf.focus();
        inputCpf.value="";
        return;
    }

    const bilheteJSON ={
        cpf: cpf
    }


    try {
        const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Cliente/CPF`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bilheteJSON)
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            let tabela = '<table>';
                tabela += '<tr><th>CPF</th><th>Nome</th><th>Telefone</th></tr>';
                    
                tabela += `<tr>
                <td>${dados.cliente.cpf}</td>
                <td>${dados.cliente.nome}</td>
                <td>${dados.cliente.telefone}</td>
                </tr>`;
                
                tabela += '</table>';
                
            document.getElementById('saidaCliente').innerHTML = `
                <div class="sucesso">
                    ${tabela}
                </div>`;
            inputCpf.focus();
            inputCpf.value=""; 
        }else{
            document.getElementById('saidaCliente').innerHTML = `<span class="erro">${dados.mensagem}</span>`;
            inputCpf.focus();
            inputCpf.value="";  
        }


    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('saidaCliente').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
    }

}

async function BuscarNomeCliente() {
    const inputNome=document.getElementById("inputCliente");
    const nome= inputNome.value.trim();
    
    if (!nome) {
        document.getElementById('saidaCliente').innerHTML = '<span class="erro">Por favor, digite um nome</span>';
        inputNome.focus();
        return;    
    }else if(/\d/.test(nome)){
        document.getElementById('saidaCliente').innerHTML = '<span class="erro">Por favor, digite somente letras</span>';
        inputNome.focus();
        inputNome.value="";
        return;
    }
    
    const bilheteJSON={
        nome:nome
    }

    try {
        const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Cliente/Nome`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(bilheteJSON)
        });
        
        const dados= await resposta.json();

        if(dados.sucesso){
            let tabela='<table>';
            tabela+='<tr><th>CPF</th><th>Nome</th><th>Telefone</th></tr>';
            dados.clientes.forEach(cliente=>{
                tabela+=`<tr>
                        <td>${cliente.cpf}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.telefone}</td>
                        </tr>`;
            });
            tabela+='</table>';
            tabela+=`<p><strong>Total encontrado: ${dados.quantidade}</strong></p>`;

            document.getElementById('saidaCliente').innerHTML=`<div class="sucesso">
            ${tabela}</div>`;
        }else{
            document.getElementById('saidaCliente').innerHTML=`<span class="erro">${dados.mensagem}</span>`;
        }

        inputNome.value="";
        inputNome.focus();

    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('saidaCliente').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';

        inputNome.value="";
        inputNome.focus();
    }
}

//Página Produtos

async function BuscarProdutos() {
    
    try {
        const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Todos`,{
            method:'GET',
            headers:{
                'content-type':'application/json',
            },
        });

        const dados= await resposta.json();

        if(dados.sucesso){
            let tabela='<table>';
            tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Preço</th><th>Tipo</th></tr>';
            
            dados.produtos.forEach(produto=>{
                tabela+=`<tr>
                <td>${produto.codigo_barra}</td>
                <td>${produto.descricao}</td>
                <td>R$${produto.preco}</td>
                <td>${produto.tipo}</td>
                </tr>`
            });
           
            tabela+='</table>';
            tabela+=`<p><strong>Total encontrado: ${dados.quantidade}</strong></p>`;

            document.getElementById('saidaProduto').innerHTML = `
                <div class="sucesso">
                    ${tabela}
                </div>`;
        }else{
            document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`;
        }

    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
    }
}

async function BuscarCod() {
   
    const inputCodigo=document.getElementById("inputProduto");
    const codigo=inputCodigo.value.trim();
    
    if (!codigo) {
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Por favor, digite um código</span>';
        inputCodigo.focus();
        return;  
    
    }else if(!/^\d{8,13}$/.test(codigo)){
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Por favor, digite somente 8 a 13 números</span>';
        inputCodigo.focus();
        inputCodigo.value="";
        return;
    }

    const bilheteJSON={
        codigo:codigo
    } 
        
    try {

        const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Codigo`, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(bilheteJSON)
        });

        const dados= await resposta.json();
        
        if(dados.sucesso){
            let tabela='<table>';
                tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Preço</th><th>Tipo</th></tr>';
                tabela+=`<tr>
                <td>${dados.produto.codigo_barra}</td>
                <td>${dados.produto.descricao}</td>
                <td>R$${dados.produto.preco}</td>
                <td>${dados.produto.tipo}</td>
                </tr>
                </table>`;

                document.getElementById('saidaProduto').innerHTML = `
                <div class="sucesso">
                   ${tabela}
                </div>`;
        }else{
            document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`;
        }
        
        inputCodigo.focus();
        inputCodigo.value="";

    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
        
        inputCodigo.focus();
        inputCodigo.value="";
    }
}

async function BuscarDescricao() {
    const inputDescricao= document.getElementById("inputProduto");
    const descricao= inputDescricao.value.trim();

    if(!descricao){
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Por favor, digite uma descrição</span>';
        inputDescricao.focus();
        return;  
    }

    const bilheteJSON={
        descricao:descricao
    }

    try {
        const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Descricao`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(bilheteJSON)
        });

        const dados= await resposta.json();

        if (dados.sucesso) {
            let tabela='<table>'
            tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Preço</th><th>Tipo</th></tr>';
                
            dados.produtos.forEach(produto=>{
                tabela+=`<tr>
                <td>${produto.codigo_barra}</td>
                <td>${produto.descricao}</td>
                <td>R$${produto.preco}</td>
                <td>${produto.tipo}</td>
                </tr>`
            });

            tabela+='</table>';
            tabela += `<p><strong>Total encontrado: ${dados.quantidade}</strong></p>`;
                    
            document.getElementById('saidaProduto').innerHTML = `
                <div class="sucesso">
                    ${tabela}
                </div>`;
        } else {
           document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`; 
        }
       
        inputDescricao.focus();
        inputDescricao.value="";

    } catch (error) {
        
        console.error('Erro:', error);
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
        
        inputDescricao.focus();
        inputDescricao.value="";
    }
}

async function BuscarTipo() {
    const inputTipo= document.getElementById("inputProduto");
    const tipo =inputTipo.value.trim();

    if(!tipo){
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Por favor, digite um tipo </span>';
        inputTipo.focus();
        return;  
    }else if(/\d/.test(tipo)){
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Por favor, digite somente letras</span>';
        inputTipo.focus();
        inputTipo.value="";
        return;
    }

    const bilheteJSON={
        tipo:tipo
    }

    try {
        const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Tipo`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(bilheteJSON)
        });

        const dados= await resposta.json();

        if (dados.sucesso) {
            let tabela= '<table>';
            tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Preço</th><th>Tipo</th></tr>';
                
            dados.produtos.forEach(produto=>{
                tabela+=`<tr>
                <td>${produto.codigo_barra}</td>
                <td>${produto.descricao}</td>
                <td>R$${produto.preco}</td>
                <td>${produto.tipo}</td>
                </tr>`
            });

            tabela+='</table>';
            tabela += `<p><strong>Total encontrado: ${dados.quantidade}</strong></p>`;
                    
            document.getElementById('saidaProduto').innerHTML = `
                <div class="sucesso">
                    ${tabela}
                </div>`;
        } else {
          document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`; 
        }
       
        inputTipo.focus();
        inputTipo.value="";


    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
        
        inputTipo.focus();
        inputTipo.value="";
    }  
}

async function BuscarEstoque() {
    const inputCodigo= document.getElementById('inputProduto')
    const codigo=inputCodigo.value.trim();

    if (!codigo) {
        try {
           
            const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Estoque`,{
                method:'GET',
                headers:{
                    'content-type':'application/json'
                }
            });
            
            const dados= await resposta.json();

            if(dados.sucesso){
                let tabela= '<table>';
                tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Estoque Min</th><th>Estoque Atual</th><th>Estoque Max</th><th>Reposição</th></tr>';
                
             dados.produtos.forEach(produto=>{
                    if (produto.estoque_atual<produto.estoque_minimo) {
                        let reposicao=produto.estoque_maximo-produto.estoque_atual;

                        tabela+=`<tr>
                        <td>${produto.codigo_barra}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.estoque_minimo}</td>
                        <td>${produto.estoque_atual}</td>
                        <td>${produto.estoque_maximo}</td>
                        <td>${reposicao}</td>
                        </tr>`
                    }else{
                        tabela+=`<tr>
                        <td>${produto.codigo_barra}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.estoque_minimo}</td>
                        <td>${produto.estoque_atual}</td>
                        <td>${produto.estoque_maximo}</td>
                        <td>Não necessária</td>
                        </tr>`
                    }
                });

                tabela+='</table>';
                tabela += `<p><strong>Total encontrado: ${dados.quantidade}</strong></p>`;

                document.getElementById('saidaProduto').innerHTML = `
                    <div class="sucesso">
                        ${tabela}
                    </div>`;
            }else{
               document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`;  
            }
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
        }
    } else {
        if(!/^\d{8,13}$/.test(codigo)){
            document.getElementById('saidaProduto').innerHTML = '<span class="erro">Por favor, digite somente 8 a 13 números, para consultar o estoque pelo código de barras</span>';
            inputCodigo.focus();
            inputCodigo.value="";
            return;
        }

        const bilheteJSON={
            codigo:codigo
        }

        try {
                const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Estoque/Codigo`, {
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(bilheteJSON)
                });

                const dados= await resposta.json();

                if (dados.sucesso) {
                    let tabela= '<table>';
                    tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Estoque Min</th><th>Estoque Atual</th><th>Estoque Max</th><th>Reposição</th></tr>';
                    
                
                    if (dados.produto.estoque_atual<dados.produto.estoque_minimo) {
                        let reposicao= dados.produto.estoque_maximo-dados.produto.estoque_atual;
                        tabela+=`<tr>
                        <td>${dados.produto.codigo_barra}</td>
                        <td>${dados.produto.descricao}</td>
                        <td>${dados.produto.estoque_minimo}</td>
                        <td>${dados.produto.estoque_atual}</td>
                        <td>${dados.produto.estoque_maximo}</td>
                        <td>${reposicao}</td>
                        </tr>`
                    }else{
                        tabela+=`<tr>
                        <td>${dados.produto.codigo_barra}</td>
                        <td>${dados.produto.descricao}</td>
                        <td>${dados.produto.estoque_minimo}</td>
                        <td>${dados.produto.estoque_atual}</td>
                        <td>${dados.produto.estoque_maximo}</td>
                        <td>Não necessária</td>
                        </tr>`
                    }
                        
                    tabela+='</table>';

                    document.getElementById('saidaProduto').innerHTML = `
                    <div class="sucesso">
                        ${tabela}
                    </div>`;
                } else{

                    document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`;  
                }

                inputCodigo.focus();
                inputCodigo.value="";

            } catch (error) {
            console.error('Erro:', error);
            document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
            
            inputCodigo.focus();
            inputCodigo.value="";
        }
    }
}

async function BuscarLucro() {
    const input = document.getElementById("inputProduto");
    const codigo= input.value;

    if (!codigo) {
        try {
           
            const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Lucro`, {
                method:'GET',
                headers:{
                    'content-type':'application/json'
                }
            });
           
            const dados= await resposta.json();
              if(dados.sucesso){
                    let tabela= '<table>';
                    tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Preço</th><th>Custo</th><th>Lucro</th></tr>';
                    
                    dados.produtos.forEach(produto=>{

                        let lucro=(produto.preco-produto.custo).toFixed(2);
                        tabela+=`<tr>
                        <td>${produto.codigo_barra}</td>
                        <td>${produto.descricao}</td>
                        <td>R$${produto.preco}</td>
                        <td>R$${produto.custo}</td>
                        <td>R$${lucro}</td>
                        </tr>`
                    });

                    tabela+='</table>';
                    tabela += `<p><strong>Total encontrado: ${dados.quantidade}</strong></p>`;

                    document.getElementById('saidaProduto').innerHTML = `
                        <div class="sucesso">
                            ${tabela}
                        </div>`;
                }else{
                    document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`;  
                }

        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
        }
    } else {
        if(!/^\d{8,13}$/.test(codigo)){
            document.getElementById('saidaProduto').innerHTML = '<span class="erro">Por favor, digite somente 8 a 13 números, para consultar o Lucro pelo código de barras</span>';
            input.focus();
            input.value="";
            return;
        }

        const bilheteJSON={
            codigo:codigo
        }

        try {
            const resposta= await fetch(`http://${enderecoServidor}:${porta}/api/Produto/Lucro/Codigo`,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(bilheteJSON)
            });

            const dados= await resposta.json();
                if(dados.sucesso){
                    let tabela= '<table>';
                    tabela+='<tr><th>Código de barras</th><th>Descrição</th><th>Preço</th><th>Custo</th><th>Lucro</th></tr>';
                    
    
                    let lucro=(dados.produto.preco-dados.produto.custo).toFixed(2);
                    tabela+=`<tr>
                    <td>${dados.produto.codigo_barra}</td>
                    <td>${dados.produto.descricao}</td>
                    <td>R$${dados.produto.preco}</td>
                    <td>R$${dados.produto.custo}</td>
                    <td>R$${lucro}</td>
                    </tr>`

                    tabela+='</table>';

                    document.getElementById('saidaProduto').innerHTML = `
                        <div class="sucesso">
                            ${tabela}
                        </div>`;
                }else{
                    document.getElementById('saidaProduto').innerHTML=`<span class="erro">${dados.mensagem}</span>`;  
                }

                input.focus();
                input.value="";
        
            } catch (error) {
            console.error('Erro:', error);
            document.getElementById('saidaProduto').innerHTML = '<span class="erro">Erro na comunicação com o servidor...</span>';
            
            input.focus();
            input.value="";
        }
    }
}
