const { insertUser } = require('../models/UserModel.js');

const createUser = (req, res) => {
  const { email, password } = req.body;
  insertUser(email, password, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      res.send('Usuário cadastrado com sucesso!');
    }
  });
};

module.exports = {
  createUser
};
