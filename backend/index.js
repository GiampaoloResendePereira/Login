const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createName } = require('./controllers/controller');
const { createUser } = require('./controllers/UserController');
const { getAllNames, getAllUsers } = require('./controllers/TabelaController');
const { updateNameById } = require('./controllers/EditNameController');
const { deleteNameById } = require('./controllers/DeleteNameController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/names', createName);
app.post('/api/users', createUser);
app.get('/api/names', getAllNames);
app.get('/api/users', getAllUsers);
app.put('/api/names', updateNameById);
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
