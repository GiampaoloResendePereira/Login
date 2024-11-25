const { updateName } = require('../models/EditNameModel.js');

const updateNameById = (req, res) => {
  const { id, name } = req.body;
  updateName(id, name, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar nome');
    } else {
      res.send('Nome atualizado com sucesso!');
    }
  });
};

module.exports = {
  updateNameById
};
