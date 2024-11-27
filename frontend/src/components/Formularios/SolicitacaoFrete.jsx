import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SolicitacaoFrete() {
  const [remetente, setRemetente] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: { cep: '', bairro: '', cidade: '', estado: '' }
  });

  const [destinatario, setDestinatario] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: { cep: '', bairro: '', cidade: '', estado: '' }
  });

  const [frete, setFrete] = useState(null);
  const [erroCEP, setErroCEP] = useState('');

  const buscarEndereco = async (cep, tipo) => {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (resposta.data && !resposta.data.erro) {
        const endereco = resposta.data;
        const atualizaEndereco = prevState => ({
          ...prevState,
          endereco: {
            ...prevState.endereco,
            cep: endereco.cep,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf
          }
        });
        tipo === 'remetente' ? setRemetente(atualizaEndereco) : setDestinatario(atualizaEndereco);
        setErroCEP('');
      } else {
        setErroCEP('CEP inválido ou não encontrado.');
      }
    } catch (error) {
      console.error(`Erro ao buscar endereço do ${tipo}:`, error);
      setErroCEP('Erro ao buscar o CEP.');
    }
  };

  useEffect(() => {
    if (remetente.endereco.cep.length === 8) {
      buscarEndereco(remetente.endereco.cep, 'remetente');
    }
  }, [remetente.endereco.cep]);

  useEffect(() => {
    if (destinatario.endereco.cep.length === 8) {
      buscarEndereco(destinatario.endereco.cep, 'destinatario');
    }
  }, [destinatario.endereco.cep]);

  const handleSalvarSolicitacao = async () => {
    try {
      const resposta = await axios.post('/api/solicitarfrete', { remetente, destinatario });
      setFrete(resposta.data.valor);
    } catch (error) {
      console.error('Erro ao salvar solicitação:', error);
    }
  };

  const criarInput = (label, value, onChange, readOnly = false) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );

  return (
    <div className="container bg-light p-5">
      <h3 className="bg-dark text-white rounded p-3 mb-4">Dados do Remetente</h3>
      {criarInput('Nome:', remetente.nome, (e) => setRemetente({ ...remetente, nome: e.target.value }))}
      {criarInput('Telefone:', remetente.telefone, (e) => setRemetente({ ...remetente, telefone: e.target.value }))}
      {criarInput('E-mail:', remetente.email, (e) => setRemetente({ ...remetente, email: e.target.value }))}
      {criarInput('CEP:', remetente.endereco.cep, (e) => setRemetente({ ...remetente, endereco: { ...remetente.endereco, cep: e.target.value } }))}
      {criarInput('Bairro:', remetente.endereco.bairro, null, true)}
      {criarInput('Cidade:', remetente.endereco.cidade, null, true)}
      {criarInput('Estado:', remetente.endereco.estado, null, true)}
      {erroCEP && <div className="text-danger">{erroCEP}</div>}

      <h3 className="bg-dark text-white rounded p-3 mb-4">Dados do Destinatário</h3>
      {criarInput('Nome:', destinatario.nome, (e) => setDestinatario({ ...destinatario, nome: e.target.value }))}
      {criarInput('Telefone:', destinatario.telefone, (e) => setDestinatario({ ...destinatario, telefone: e.target.value }))}
      {criarInput('E-mail:', destinatario.email, (e) => setDestinatario({ ...destinatario, email: e.target.value }))}
      {criarInput('CEP:', destinatario.endereco.cep, (e) => setDestinatario({ ...destinatario, endereco: { ...destinatario.endereco, cep: e.target.value } }))}
      {criarInput('Bairro:', destinatario.endereco.bairro, null, true)}
      {criarInput('Cidade:', destinatario.endereco.cidade, null, true)}
      {criarInput('Estado:', destinatario.endereco.estado, null, true)}
      {erroCEP && <div className="text-danger">{erroCEP}</div>}

      {frete !== null && (
        <div className="mb-3">
          <h4 className="bg-dark text-white rounded p-3 mb-4">Preço do Frete: R$ {frete}</h4>
        </div>
      )}

      <button onClick={handleSalvarSolicitacao} className="btn btn-success mt-4">
        Confirmar e Solicitar Frete
      </button>
    </div>
  );
}

export default SolicitacaoFrete;
