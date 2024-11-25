const { createCadastroCliente } = require('../models/CadastroClienteModel');

const createCliente = (req, res) => {
  const user = req.body;
  createCadastroCliente(user, (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao cadastrar usuário');
    }
    return res.send('Usuário cadastrado com sucesso!');
  });
};

module.exports = {
  createCliente,
};
