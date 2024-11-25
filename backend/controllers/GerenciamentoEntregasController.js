const { obterPedidos, atualizarStatusPedido, obterDetalhesPedido } = require('../models/GerenciamentoEntregasModel');

const listarPedidos = (req, res) => {
  obterPedidos((err, pedidos) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter pedidos' });
    }
    res.json(pedidos);
  });
};

const alterarStatusPedido = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  atualizarStatusPedido(id, status, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
    }
    res.json({ message: 'Status atualizado com sucesso' });
  });
};

const exibirDetalhesPedido = (req, res) => {
  const { id } = req.params;

  obterDetalhesPedido(id, (err, pedido) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter detalhes do pedido' });
    }
    res.json(pedido);
  });
};

module.exports = {
  listarPedidos,
  alterarStatusPedido,
  exibirDetalhesPedido
};
