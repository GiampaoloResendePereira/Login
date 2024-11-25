const db = require('../db');

const obterPedidos = (callback) => {
  const sql = `
    SELECT sf.id AS numeroPedido, cc.nome AS nomeCliente, cf.cep_origem AS cepOrigem, cf.cep_destino AS cepDestino,
           cf.valor_frete AS valor, sf.status, sf.data_calculo AS horaSolicitacao
    FROM solicitacao_frete sf
    JOIN cadastrocliente cc ON sf.nome_remetente = cc.nome
    JOIN calculos_frete cf ON sf.frete_id = cf.id;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const atualizarStatusPedido = (pedidoId, status, callback) => {
  const sql = 'UPDATE solicitacao_frete SET status = ? WHERE id = ?';
  db.query(sql, [status, pedidoId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

const obterDetalhesPedido = (pedidoId, callback) => {
  const sql = `
    SELECT sf.id AS numeroPedido, cc.nome AS nomeCliente, cf.cep_origem AS cepOrigem, cf.cep_destino AS cepDestino,
           cf.valor_frete AS valor, sf.status, sf.data_calculo AS horaSolicitacao
    FROM solicitacao_frete sf
    JOIN cadastrocliente cc ON sf.nome_remetente = cc.nome
    JOIN calculos_frete cf ON sf.frete_id = cf.id
    WHERE sf.id = ?;
  `;
  db.query(sql, [pedidoId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length > 0) {
      return callback(null, result[0]);
    } else {
      return callback(new Error('Pedido não encontrado'), null);
    }
  });
};

module.exports = {
  obterPedidos,
  atualizarStatusPedido,
  obterDetalhesPedido
};
