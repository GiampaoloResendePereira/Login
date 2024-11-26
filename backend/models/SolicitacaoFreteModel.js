const db = require('../db');

// Função para salvar uma solicitação de frete
const salvarSolicitacao = (solicitacao, callback) => {
  const query = `
    INSERT INTO solicitacao_frete 
      (nome_remetente, telefone_remetente, email_remetente, cep_remetente,
      nome_destinatario, telefone_destinatario, email_destinatario, cep_destinatario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  pool.query(query, [
    solicitacao.nome_remetente,
    solicitacao.telefone_remetente,
    solicitacao.email_remetente,
    solicitacao.cep_remetente,
    solicitacao.nome_destinatario,
    solicitacao.telefone_destinatario,
    solicitacao.email_destinatario,
    solicitacao.cep_destinatario
  ], (err, results) => {
    if (err) return callback(err);
    callback(null, results.insertId);  // Retorna o ID da solicitação criada
  });
};

// Função para obter a solicitação de frete por ID
const obterSolicitacaoPorId = (id, callback) => {
  const query = 'SELECT * FROM solicitacao_frete WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);  // Retorna os dados da solicitação
  });
};

module.exports = {
  salvarSolicitacao,
  obterSolicitacaoPorId
};