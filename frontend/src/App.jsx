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
                                 
        </Routes>
      </Router>
    
  );
}

export default App;

//npm install bootstrap
//npm install axios
//npm install react-router-dom

