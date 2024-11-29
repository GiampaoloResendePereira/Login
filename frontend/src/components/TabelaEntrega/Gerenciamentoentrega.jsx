import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function GerenciamentoEntregas() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const resposta = await axios.get('http://localhost:5000/api/pedidos');
        setPedidos(resposta.data);
      } catch (error) {
        setError(`Erro ao carregar pedidos: ${error.response ? error.response.data.error : error.message}`);
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, []);

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Gerenciamento de Entregas</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Carregando pedidos...</div>
      ) : (
        <>
          {/* Tabela de Pedidos */}
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Número do Pedido</th>
                <th>Nome do Cliente</th>
                <th>Valor do Frete</th>
                <th>Endereço Remetente</th>
                <th>Endereço Destinatário</th>
                <th>Peso</th>
                <th>Dimensões (LxAxC)</th>
                <th>Telefone do Cliente</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.nomeCliente} {pedido.sobrenomeCliente}</td>
                  <td>{pedido.valor_frete}</td>
                  <td>
                    {pedido.cep_remetente}, {pedido.bairro_remetente}, {pedido.cidade_remetente}, {pedido.estado_remetente}
                  </td>
                  <td>
                    {pedido.cep_destinatario}, {pedido.bairro_destinatario}, {pedido.cidade_destinatario}, {pedido.estado_destinatario}
                  </td>
                  <td>{pedido.peso}</td>
                  <td>{pedido.largura}x{pedido.altura}x{pedido.comprimento}</td>
                  <td>{pedido.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default GerenciamentoEntregas;
