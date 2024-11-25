const { salvarSolicitacaoFrete, obterSolicitacaoFretePorId } = require('../models/SolicitacaoFreteModel');

const salvarSolicitacao = (req, res) => {
  const { remetente, destinatario, freteId } = req.body;

  const solicitacao = {
    nomeRemetente: remetente.nome,
    telefoneRemetente: remetente.telefone,
    emailRemetente: remetente.email,
    cepRemetente: remetente.endereco.cep,
    nomeDestinatario: destinatario.nome,
    telefoneDestinatario: destinatario.telefone,
    emailDestinatario: destinatario.email,
    cepDestinatario: destinatario.endereco.cep,
    freteId
  };

  salvarSolicitacaoFrete(solicitacao, (err, solicitacaoSalva) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar solicitação de frete' });
    }
    res.json(solicitacaoSalva);
  });
};

const obterSolicitacao = (req, res) => {
  const solicitacaoId = req.params.id;
  obterSolicitacaoFretePorId(solicitacaoId, (err, solicitacao) => {
    if (err) {
      return res.status(404).json({ error: 'Solicitação de frete não encontrada' });
    }
    res.json(solicitacao);
  });
};

module.exports = {
  salvarSolicitacao,
  obterSolicitacao
};
