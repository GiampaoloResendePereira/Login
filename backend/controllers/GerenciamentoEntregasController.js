const { getPedidos, deletePedido } = require('../models/GerenciamentoEntregasModel');

const fetchPedidos = (req, res) => {
  console.log('fetchPedidos: Iniciando busca dos pedidos...');
  getPedidos((err, results) => {
    if (err) {
      console.error('Erro ao buscar os pedidos:', err);
      return res.status(500).json({ error: 'Erro ao buscar os pedidos', details: err });
    }
    console.log('fetchPedidos: Pedidos obtidos com sucesso!', results);
    return res.json(results);
  });
};

const removePedido = (req, res) => {
  const { id } = req.params;
  deletePedido(id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar o pedido:', err);
      return res.status(500).json({ error: 'Erro ao deletar o pedido', details: err });
    }
    return res.send('Pedido deletado com sucesso!');
  });
};

module.exports = {
  fetchPedidos,
  removePedido
};
