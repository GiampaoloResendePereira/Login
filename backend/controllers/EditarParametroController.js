const { getFretes, updateFrete } = require('../models/EditarParametroModel');

const fetchFretes = (req, res) => {
  getFretes((err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar os fretes');
    }
    return res.json(results);
  });
};

const editFrete = (req, res) => {
  const id = req.params.id;
  const frete = req.body;
  updateFrete(id, frete, (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar o frete');
    }
    return res.send('Frete atualizado com sucesso!');
  });
};

module.exports = {
  fetchFretes,
  editFrete
};
