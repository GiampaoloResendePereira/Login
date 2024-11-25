const { insertName } = require('../models/model');

const createName = (req, res) => {
  const { name } = req.body;
  insertName(name, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar nome');
    } else {
      res.send('Nome cadastrado com sucesso!');
    }
  });
};

module.exports = {
  createName,
};
