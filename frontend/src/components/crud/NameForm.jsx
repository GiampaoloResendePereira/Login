import React, { useState } from 'react';
import axios from 'axios';

function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/names', { name });
      alert('Nome cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar nome', error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Nome</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar Nome</button>
      </form>
    </div>
  );
}

export default NameForm;
