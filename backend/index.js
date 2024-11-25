const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { createName } = require('./controllers/controller');
const { createUser } = require('./controllers/UserController');
const { createCliente } = require('./controllers/CadastroClienteController');
const { salvarSolicitacao, obterSolicitacao } = require('./controllers/SolicitacaoFreteController');
const { getAllNames, getAllUsers } = require('./controllers/TabelaController');
const { calcularFrete } = require('./controllers/CalculoFreteController');
const { updateNameById } = require('./controllers/EditNameController');
const { listarPedidos, alterarStatusPedido, exibirDetalhesPedido } = require('./controllers/GerenciamentoEntregasController');
const { fetchFretes, editFrete } = require('./controllers/EditarParametroController');
const { deleteNameById } = require('./controllers/DeleteNameController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/names', createName);
app.post('/api/users', createUser);
app.post('/api/cadastrocliente', createCliente);
app.post('/api/solicitarfrete', salvarSolicitacao); 
app.get('/api/solicitacaofrete/:id', obterSolicitacao);
app.get('/api/names', getAllNames);
app.get('/api/users', getAllUsers);
app.post('/api/calcularfrete', calcularFrete);
app.put('/api/names', updateNameById);
app.get('/api/fretes', fetchFretes); 
app.put('/api/fretes/:id', editFrete);
app.get('/api/pedidos', listarPedidos); 
app.patch('/api/pedidos/:id', alterarStatusPedido); 
app.get('/api/pedidos/:id', exibirDetalhesPedido);
app.delete('/api/names', deleteNameById);

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

//npm init -y
//npm install express
//npm install cors
//npm install body-parser
//npm install mysql2
//npm install -g nodemon
//npm install axios