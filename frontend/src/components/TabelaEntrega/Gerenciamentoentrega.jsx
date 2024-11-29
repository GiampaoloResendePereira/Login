import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function GerenciamentoEntregas() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        console.log('fetchPedidos: Iniciando busca dos pedidos...');
        const response = await axios.get('http://localhost:5000/api/pedidos');
        console.log('fetchPedidos: Resposta recebida:', response.data);
        setPedidos(response.data);
      } catch (err) {
        console.error('Erro ao carregar os pedidos:', err);
        setErro('Erro ao carregar os pedidos');
      }
      setLoading(false);
    };
    fetchPedidos();
  }, []);

  const deletarPedido = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pedidos/${id}`);
      setPedidos(pedidos.filter((pedido) => pedido.id !== id));
    } catch (err) {
      console.error('Erro ao deletar o pedido:', err);
      setErro('Erro ao deletar o pedido');
    }
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Gerenciamento Entregas</h2>

      {loading && <p>Carregando...</p>}
      {erro && <p className="text-danger">{erro}</p>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Número do Pedido</th>
            <th>Nome do Cliente</th>
            <th>Valor do Frete</th>
            <th>Endereço Remetente</th>
            <th>Endereço Destinatário</th>
            <th>Peso</th>
            <th>Telefone do Cliente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.numero_pedido}</td>
              <td>{pedido.nome_cliente}</td>
              <td>{pedido.valor_frete}</td>
              <td>{pedido.endereco_remetente}</td>
              <td>{pedido.endereco_destinatario}</td>
              <td>{pedido.peso}</td>
              <td>{pedido.telefone_cliente}</td>
              <td>
                <button
                  onClick={() => deletarPedido(pedido.id)}
                  className="btn btn-danger"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GerenciamentoEntregas;
