const mysql = require('mysql2');

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

module.exports = db;
