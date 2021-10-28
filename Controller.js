const express = require('express');
const cors = require('cors');
const {Sequelize} = require('./models'); //permite trabalhar com sql

const models=require('./models'); //no mesmo nivel que a nossa models

const app = express(); // pra identificar as nossas rotas
app.use(cors());       //corrige algum erro de pagina
app.use(express.json());  //aplicação com formatado de dados json

let cliente=models.Cliente;         // referenciamento das classes (cliente, item, pedido, serviço)
let pedido=models.Pedido;
let servico=models.Servico;
let itempedido=models.ItemPedido;

app.get('/', function(req,res){ // para executar a aplicação e exibir a msg, ('/' - rota raiz)
    res.send('Olá, mundo!') // metodo get é sempre resposta q ele emiti
});

// inserir um novo cliente (metodo get)
app.get('/clientes', async(req,res)=>{  //definição da rota
    await cliente.create({    // criação de um novo cliente
        nome: "Danilo da Silva Sauro",
        endereco: "Rua xxxx, 1188",
        cidade: "Maringá",
        uf: "PR",
        nascimento: '1976-06-26',
        clienteDesde: '2021-10-04'
    });
    res.send('Cliente cadastrado com sucesso'); //menssagem para o usuário
})

// inserir um novo cliente (metodo post)
app.post('/cliente', async(req,res)=>{  //definição da rota
    await cliente.create(    // await espera e garante a conclusao para continuar
       req.body
       ).then(cli =>{          //then de 'então', se ele cria o cliente sem erro ele da a msg
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!",
            cli
        });
    }).catch(erro=>{        // aqui se o erro for verdadeiro ele mostra o status 400 com a msg
        return res.status(400).json({
            error: true,
            message: "Foi impossível cadastrar o cliente."
        });
    });
});

app.post('/cliente/:id/pedido', async(req,res)=>{  //definição da rota vinculado ao cliente
    const ped = {
        ClienteId: req.params.id,
        data: req.body.data
    };

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };

    await pedido.create(ped)
    .then(order =>{
        return res.json({
            error: true,
            message: "Pedido foi inserido com sucesso.",
            order
        });
    }).catch(erro =>{        // aqui se o erro for verdadeiro ele mostra o status 400 com a msg
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o pedido."
        });
    });
});
      // metodo get de trazer clientes (consulta clientes existentes)
app.get('/clientes', async(req,res)=>{
    await cliente.findAll() //retorno todos os clientes
    .then(cli =>{
        return res.json({
            error: false,
            cli
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão."
        });
    });
});

// mais um metodo de consulta de clientes
app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});

 // metodo get de trazer tudo que está relacionado aos clientes (include, ou seja, os pedidos)
app.get('/clientes-pedidos', async(req,res)=>{
    await cliente.findAll({include:[{all: true}]})
    .then(cli =>{
        return res.json({
            error: false,
            cli
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão."
        });
    });
});

// metodo put para alterar os dados do pedido
app.put('/cliente/:id/pedido', async(req,res)=>{
    const ped = {
        ClienteId: req.params.id,
        data: req.body.data
    };

    if (!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };
// atualização
    await pedido.update(ped,{
        where: Sequelize.and({ClienteId: req.params.id},
            {id: req.body.id})
    }).then(pedidos=>{
        return res.json({
            error: false,
            message: 'Pedido foi alterado com sucesso.',
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

//para realizar a exclusão (destroy)
app.get('/excluir-cliente/:id', async(req,res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluido com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Impossível excluir o cliente."
        });
    });
});

app.get('/servicos', async(req,res)=>{  //definição da rota
    await servico.create({    // criação de um novo serviço
        nome: "HTML/CSS",
        descricao: "Páginas estáticas estilizadas",
        createAt: new Date(),
        updateAt: new Date()
    });
    res.send('Serviço criado com sucesso'); //mensagem para o usuário
})

app.post('/servicos', async(req,res)=>{  //definição da rota
    await servico.create(    // criação de um novo serviço
       req.body
    ).then(function(){          //then de 'então', se ele cria o servico sem erro ele da a msg
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){        // aqui se o erro for verdadeiro ele mostra o status 400 com a msg
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

//atualização utilizando o metodo get
app.get('/atualizaservico', async(req,res)=>{
    await servico.findByPk(2) //o ideal é passar a chave externamente
    .then(serv =>{
        serv.nome = 'HTML/CSS/JS';
        serv.descricao = 'Páginas estáticas e dinâmicas estilizadas';
        serv.save();
        return res.json({serv});
    });
});

//atualização utilizando o metodo put (externo)
app.put('/atualizaservico', async(req,res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Houve erro na alteção do serviço."
        });
    });    
});

app.post('/itenspedido', async(req,res)=>{  
    await itempedido.create(    
        req.body
       ).then(function(){          //then de 'então', se ele cria o servico sem erro ele da a msg
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function(erro){        // aqui se o erro for verdadeiro ele mostra o status 400 com a msg
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

//consulta utilizando metodo get
app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

//alteração, verificar se existe pedido, verif. se existe serviço e fazer a alteração
app.put('/pedidos/:id/editaritem', async(req,res)=>{
    const item={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado."
        });
    };

    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: "Serviço não foi encontrado."
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso.",
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

// app.get('/clientes', function(req,res){
//     res.send('Seja bem-vindo(a) a ServicesTi.')
// })

// app.get('/servicos', function(req,res){
//     res.send('Escolha o serviço desejado.')
// })

// app.get('/pedidos', function(req,res){
//     res.send('Em breve seu pedido será processado.')
// })

app.get('/listaservicos', async(req,res)=>{ //metodo para consulta
    await servico.findAll({             //vai retornara para mim (findAll)
        raw: true
    }).then(function(servicos){     //retorna um servico em formato json
        res.json({servicos})
    });
});

app.get('/listaservicos', async(req,res)=>{ //alterando o metodo de consulta para uma determinada ordem
        await servico.findAll({             
            // raw: true
            order: [['nome','ASC']]        //ondem em forma descrecente (DESC) ou crescente (ASC)
        }).then(function(servicos){     
            res.json({servicos})
        });
    });

app.get('/ofertaservicos', async(req,res)=>{ // para mostrar a quantidade de servicos
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req,res)=>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível conectar!"
        });
    });
});

let port=process.env.PORT || 3001; // variavel com a porta para rodar a aplicação

app.listen(port,(req,res)=>{ // app para rodar aplicacao
    console.log('Servidor ativo: http://localhost:3001');
})