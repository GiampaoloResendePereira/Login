const db = require('../db');

/**
 * Salvar uma nova solicitação de frete no banco de dados.
 * @param {Object} solicitacao - Dados da solicitação.
 * @param {Function} callback - Função de callback para tratar o resultado.
 */
const salvarSolicitacaoFrete = (solicitacao, callback) => {
  const {
    nomeRemetente,
    telefoneRemetente,
    emailRemetente,
    cepRemetente,
    nomeDestinatario,
    telefoneDestinatario,
    emailDestinatario,
    cepDestinatario,
    freteId,
  } = solicitacao;

  const sql = `
    INSERT INTO solicitacao_frete 
    (nome_remetente, telefone_remetente, email_remetente, cep_remetente, 
    nome_destinatario, telefone_destinatario, email_destinatario, cep_destinatario, frete_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nomeRemetente,
      telefoneRemetente,
      emailRemetente,
      cepRemetente,
      nomeDestinatario,
      telefoneDestinatario,
      emailDestinatario,
      cepDestinatario,
      freteId,
    ],
    (err, result) => {
      if (err) {
        console.error('Erro ao salvar solicitação de frete:', err.message);
        return callback(err, null);
      }
      return callback(null, { id: result.insertId, ...solicitacao });
    }
  );
};

/**
 * Obter uma solicitação de frete pelo ID.
 * @param {number} solicitacaoId - ID da solicitação.
 * @param {Function} callback - Função de callback para tratar o resultado.
 */
const obterSolicitacaoFretePorId = (solicitacaoId, callback) => {
  const sql = 'SELECT * FROM solicitacao_frete WHERE id = ?';

  db.query(sql, [solicitacaoId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar solicitação de frete:', err.message);
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
  obterSolicitacaoFretePorId,
};
