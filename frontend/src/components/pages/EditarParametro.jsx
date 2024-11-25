import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditarParametro() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [fretes, setFretes] = useState([]);
  const [novoFrete, setNovoFrete] = useState({
    menos_1kg: '',
    entre_1kge3kg: '',
    entre_3kge8kg: '',
    entre_8kge12kg: '',
    acima_12kg: '',
    km_rodado: ''
  });

  useEffect(() => {
    const fetchFretes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/fretes');
        setFretes(response.data[0]);
        setNovoFrete(response.data[0]); // Carregar valores atuais para edição
      } catch (err) {
        setErro('Erro ao carregar os fretes');
      }
      setLoading(false);
    };
    fetchFretes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (parseFloat(value) >= 0) { // Verificar se o valor não é negativo
      setNovoFrete({ ...novoFrete, [name]: value });
    } else {
      alert('Por favor, insira um valor não negativo.');
    }
  };

  const salvarAlteracoes = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/fretes/${fretes.id}`, novoFrete); // Usar o ID da linha existente
      alert('Frete atualizado com sucesso!');
    } catch (err) {
      setErro('Erro ao salvar alterações');
    }
    setLoading(false);
  };

  const cancelarEdicao = () => {
    setNovoFrete(fretes);
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Editar Parâmetro de Frete</h2>

      {loading && <p>Carregando...</p>}
      {erro && <p className="text-danger">{erro}</p>}

      <div className="mb-4 p-3 border rounded bg-white shadow-sm">
        <h3 className="mb-3">Parâmetro de Frete</h3>
        <div className="mb-3">
          <label className="form-label">Menos de 1Kg (R$):</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="menos_1kg"
            value={novoFrete.menos_1kg}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Entre 1Kg e 3Kg (R$):</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="entre_1kge3kg"
            value={novoFrete.entre_1kge3kg}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Entre 3Kg e 8Kg (R$):</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="entre_3kge8kg"
            value={novoFrete.entre_3kge8kg}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Entre 8Kg e 12Kg (R$):</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="entre_8kge12kg"
            value={novoFrete.entre_8kge12kg}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Acima de 12Kg (Descrição):</label>
          <input
            type="text"
            className="form-control"
            name="acima_12kg"
            value={novoFrete.acima_12kg}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Km Rodado (R$):</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="km_rodado"
            value={novoFrete.km_rodado}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button onClick={salvarAlteracoes} className="btn btn-danger" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        <button onClick={cancelarEdicao} className="btn btn-secondary" disabled={loading}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EditarParametro;
