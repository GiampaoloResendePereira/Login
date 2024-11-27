import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/logo.png';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom'; // Adicionando Link para navegação
import CalculoFrete from '../pages/CalculoFrete';

function TelaCliente() {
  const navigate = useNavigate(); // Hook para navegação entre as rotas

  // Função de navegação para a tela de login (ou página inicial)
  const handleLoginLogout = () => {
    navigate("/"); // Redireciona para a tela de login ou página inicial
  };

  

  return (
    <div>
      {/* Barra superior de navegação */}
      <Navbar bg="danger" variant="dark"></Navbar>

      {/* Barra de navegação principal */}
      <Navbar bg="dark" variant="dark">
        <Container>
          
            <img src={logo} alt="Logo" height="50" />
          
          <Nav className="me-auto">
          <Nav.Link href="/calculo-frete">Calculo Frete</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-white">
            <button className="btn btn-secondary" onClick={handleLoginLogout}>
              Sair
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Exibição da página CalculoFrete */}
      <CalculoFrete />
    </div>
  );
}

export default TelaCliente; // Exportando TelaCliente