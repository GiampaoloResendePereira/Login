const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importação dos controladores

//Crud
const { createName } = require('./controllers/controller');
const { createUser } = require('./controllers/UserController');
const { getAllNames, getAllUsers } = require('./controllers/TabelaController');
const { updateNameById } = require('./controllers/EditNameController');
const { deleteNameById } = require('./controllers/DeleteNameController');

//Formularios
const { createCliente } = require('./controllers/CadastroClienteController');
const { salvarSolicitacao, obterSolicitacao } = require('./controllers/SolicitacaoFreteController');

//pages
const { calcularFrete } = require('./controllers/CalculoFreteController');
const { fetchFretes, editFrete } = require('./controllers/EditarParametroController');

//TabelaEntrega
const { listarPedidos, alterarStatusPedido, exibirDetalhesPedido } = require('./controllers/GerenciamentoEntregasController');



const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas

//Crud
app.post('/api/names', createName); // Criar um nome
app.post('/api/users', createUser); // Criar um usuário
app.get('/api/names', getAllNames); // Obter todos os nomes
app.get('/api/users', getAllUsers); // Obter todos os usuários
app.put('/api/names', updateNameById); // Atualizar nome por ID
app.delete('/api/names', deleteNameById); // Deletar um nome por ID

//Formularios
app.post('/api/cadastrocliente', createCliente); // Cadastrar cliente
app.post('/api/solicitarfrete', salvarSolicitacao); // Salvar solicitação de frete
app.get('/api/solicitacaofrete/:id', obterSolicitacao); // Obter detalhes da solicitação de frete pelo ID

//page
app.post('/api/calcularfrete', calcularFrete);


//TabelaEntrega
app.get('/api/pedidos', listarPedidos); // Listar todos os pedidos
app.patch('/api/pedidos/:id', alterarStatusPedido); // Alterar status de um pedido específico
app.get('/api/pedidos/:id', exibirDetalhesPedido); // Exibir detalhes de um pedido específico


// Configuração do servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

// Comandos para inicialização de pacotes
// npm init -y
// npm install express
// npm install cors
// npm install body-parser
// npm install mysql2
// npm install -g nodemon
// npm install axios
