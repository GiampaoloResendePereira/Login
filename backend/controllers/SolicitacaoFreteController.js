const { salvarSolicitacaoFrete, obterSolicitacaoFretePorId } = require('../models/SolicitacaoFreteModel');

/**
 * Salva uma nova solicitação de frete.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
const salvarSolicitacao = async (req, res) => {
  const { remetente, destinatario, freteId } = req.body;

  // Validação básica dos dados
  if (!remetente || !destinatario || !freteId) {
    return res.status(400).json({ error: 'Dados insuficientes para criar uma solicitação' });
  }

  // Construção do objeto de solicitação
  const solicitacao = {
    nomeRemetente: remetente.nome,
    telefoneRemetente: remetente.telefone,
    emailRemetente: remetente.email,
    cepRemetente: remetente.endereco?.cep,
    nomeDestinatario: destinatario.nome,
    telefoneDestinatario: destinatario.telefone,
    emailDestinatario: destinatario.email,
    cepDestinatario: destinatario.endereco?.cep,
    freteId,
  };

  try {
    // Salvar a solicitação de frete
    const solicitacaoSalva = await salvarSolicitacaoFrete(solicitacao);
    return res.status(201).json({ message: 'Solicitação salva com sucesso', data: solicitacaoSalva });
  } catch (err) {
    console.error('Erro ao salvar solicitação:', err.message);
    return res.status(500).json({ error: 'Erro ao salvar solicitação de frete' });
  }
};

/**
 * Obtém uma solicitação de frete pelo ID.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
const obterSolicitacao = async (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);

  // Verificar se o ID é válido
  if (isNaN(solicitacaoId)) {
    return res.status(400).json({ error: 'ID inválido fornecido' });
  }

  try {
    // Obter a solicitação de frete pelo ID
    const solicitacao = await obterSolicitacaoFretePorId(solicitacaoId);
    if (!solicitacao) {
      return res.status(404).json({ error: 'Solicitação de frete não encontrada' });
    }
    return res.json(solicitacao);
  } catch (err) {
    console.error('Erro ao buscar solicitação:', err.message);
    return res.status(500).json({ error: 'Erro ao buscar solicitação de frete' });
  }
};

module.exports = {
  salvarSolicitacao,
  obterSolicitacao,
};
