const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'novo_usuario',
  password: 'nova_senha',
  database: 'seu_banco'
});



db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

app.post('/api/names', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO names (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) throw err;
    res.send('Nome cadastrado com sucesso!');
  });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
