import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NameForm from './components/pages/NameForm';
import UserForm from './components/pages/UserForm';
import TabelaForm from './components/pages/TabelaForm';
import EditNameForm from './components/pages/EditNameForm';
import DeleteNameForm from './components/pages/DeleteNameForm';

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
        </Routes>
      </Router>
    
  );
}

export default App;

//npm install bootstrap
//npm install axios
//npm install react-router-dom

