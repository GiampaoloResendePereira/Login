const db = require('../db');

const salvarSolicitacaoFrete = (solicitacao, callback) => {
  const { nomeRemetente, telefoneRemetente, emailRemetente, cepRemetente, nomeDestinatario, telefoneDestinatario, emailDestinatario, cepDestinatario, freteId } = solicitacao;
  const sql = 'INSERT INTO solicitacao_frete (nome_remetente, telefone_remetente, email_remetente, cep_remetente, nome_destinatario, telefone_destinatario, email_destinatario, cep_destinatario, frete_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nomeRemetente, telefoneRemetente, emailRemetente, cepRemetente, nomeDestinatario, telefoneDestinatario, emailDestinatario, cepDestinatario, freteId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, { id: result.insertId, ...solicitacao });
  });
};

const obterSolicitacaoFretePorId = (solicitacaoId, callback) => {
  const sql = 'SELECT * FROM solicitacao_frete WHERE id = ?';
  db.query(sql, [solicitacaoId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(new Error('Solicitação de frete não encontrada'), null);
    }
  });
};

module.exports = {
  salvarSolicitacaoFrete,
  obterSolicitacaoFretePorId
};
