const express = require('express');
const cors = require('cors');

const models=require('./models'); //no mesmo nivel que a nossa models

const app = express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido=models.ItemPedido;
let pedido=models.Pedido;
let servico=models.Servico;

app.get('/', function(req,res){
    res.send('Olá, mundo!')
})

app.get('/servicos', async(req,res)=>{  //definição da rota
    await servico.create({    // criação de um novo serviço
        nome: "HTML/CSS",
        descricao: "Páginas estáticas estilizadas",
        createAt: new Date(),
        updateAt: new Date()
    });
    res.send('Serviço criado com sucesso'); //menssagem para o usuário
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

// app.get('/clientes', async(req,res)=>{  //definição da rota
//     await cliente.create({    // criação de um novo cliente
//         nome: "Danilo da Silva Sauro",
//         endereco: "Rua xxxx, 1188",
//         cidade: "Maringá",
//         uf: "PR",
//         nascimento: '1976-06-26',
//         clienteDesde: '2021-10-04'
//     });
//     res.send('Cliente cadastrado com sucesso'); //menssagem para o usuário
// })

app.post('/clientes', async(req,res)=>{  //definição da rota
    await cliente.create(    // criação de um novo cliente
       req.body
       ).then(function(){          //then de 'então', se ele cria o servico sem erro ele da a msg
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!"
        })
    }).catch(function(erro){        // aqui se o erro for verdadeiro ele mostra o status 400 com a msg
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/pedidos', async(req,res)=>{  //definição da rota
    await pedido.create(    // criação de um novo pedido
        req.body
       ).then(function(){          //then de 'então', se ele cria o servico sem erro ele da a msg
        return res.json({
            error: false,
            message: "Pedido criado com sucesso!"
        })
    }).catch(function(erro){        // aqui se o erro for verdadeiro ele mostra o status 400 com a msg
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
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

app.get('/clientes', function(req,res){
    res.send('Seja bem-vindo(a) a ServicesTi.')
})

app.get('/servicos', function(req,res){
    res.send('Escolha o serviço desejado.')
})

app.get('/pedidos', function(req,res){
    res.send('Em breve seu pedido será processado.')
})

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})