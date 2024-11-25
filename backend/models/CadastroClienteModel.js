const db = require('../db');

const createCadastroCliente = (user, callback) => {
  const sql = 'INSERT INTO cadastrocliente (nome, sobrenome, cpf, telefone, dataNascimento, cep, rua, numero, bairro, cidade, estado, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [user.nome, user.sobrenome, user.cpf, user.telefone, user.dataNascimento, user.cep, user.rua, user.numero, user.bairro, user.cidade, user.estado, user.email, user.senha], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

module.exports = {
  createCadastroCliente
};
