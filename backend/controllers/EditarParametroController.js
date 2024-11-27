const { getFretes, updateFrete } = require('../models/EditarParametroModel');

const fetchFretes = (req, res) => {
  console.log('fetchFretes: Iniciando busca dos fretes...');
  getFretes((err, results) => {
    if (err) {
      console.error('Erro ao buscar os fretes:', err);
      return res.status(500).json({ error: 'Erro ao buscar os fretes', details: err });
    }
    console.log('fetchFretes: Fretes obtidos com sucesso!', results);
    return res.json(results);
  });
};

const editFrete = (req, res) => {
  const id = req.params.id;
  const frete = req.body;

  if (!frete.menos_1kg || !frete.entre_1kge3kg || !frete.entre_3kge8kg || !frete.entre_8kge12kg || !frete.acima_12kg || !frete.km_rodado || !frete.tempo_deslocamento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  console.log('editFrete: Atualizando frete com id', id, frete);
  updateFrete(id, frete, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o frete:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o frete', details: err });
    }
    console.log('editFrete: Frete atualizado com sucesso!', result);
    return res.send('Frete atualizado com sucesso!');
  });
};

module.exports = {
  fetchFretes,
  editFrete
};
