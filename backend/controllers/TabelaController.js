const { getNames, getUsers } = require('../models/TabelaModel.js');

const getAllNames = (req, res) => {
  getNames((err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar nomes');
    } else {
      res.json(results);
    }
  });
};

const getAllUsers = (req, res) => {
  getUsers((err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar usuários');
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getAllNames,
  getAllUsers
};
