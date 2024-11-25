const { deleteName } = require('../models/DeleteNameModel');

const deleteNameById = (req, res) => {
  const { id } = req.body;
  deleteName(id, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar nome');
    } else {
      res.send('Nome deletado com sucesso!');
    }
  });
};

module.exports = {
  deleteNameById
};
