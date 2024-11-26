import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NameForm from './components/crud/NameForm';
import UserForm from './components/crud/UserForm';
import TabelaForm from './components/crud/TabelaForm';
import EditNameForm from './components/crud/EditNameForm';
import DeleteNameForm from './components/crud/DeleteNameForm';
import CadastroCliente from './components/Formularios/CadastroCliente';
import EditarParametro from './components/pages/EditarParametro';
import CalculoFrete from './components/pages/CalculoFrete';
import SolicitacaoFrete from './components/Formularios/SolicitacaoFrete';
import GerenciamentoEntrega from './components/TabelaEntrega/Gerenciamentoentrega'
import TelaAdministrador from './components/layout/TelaAdministrador';
import TelaCliente from './components/layout/TelaCliente';
import Login from './components/pages/Login';
import RecuperacaoSenha from './components/pages/RecuperacaoSenha';


function App() {
  return (
    
      <Router>
        <Routes>
          {/* Rotas */}
          <Route path="/" element={<UserForm />} />
          <Route path="/name" element={<NameForm />} />
          <Route path="/tabela" element={<TabelaForm />} />  
          <Route path="/editar" element={<EditNameForm />} />   
          <Route path="/deletar" element={<DeleteNameForm />} /> 

          {/* Formularios */}
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/solicitacao-frete" element={<SolicitacaoFrete />} />

          {/* Pages */}
          <Route path="/editar-parametro" element={<EditarParametro />} />
          <Route path="/calculo-frete" element={<CalculoFrete />} />
          <Route path="/" element={<Login />} />
          <Route path="/recuperacao-senha" element={<RecuperacaoSenha />} />

          {/* Pages */}
          <Route path="/gerenciamento-entrega" element={<GerenciamentoEntrega />} />

          <Route path="/administrador" element={<TelaAdministrador />} />
          <Route path="/cliente" element={<TelaCliente />} />   
                                 
        </Routes>
      </Router>
    
  );
}

export default App;


//npm install react react-dom
//npm init 
//npm install react-scripts
//npm install bootstrap
//npm install axios
//npm install react-router-dom

