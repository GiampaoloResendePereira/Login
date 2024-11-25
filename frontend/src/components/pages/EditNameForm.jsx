import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditNameForm() {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/names');
        setNames(response.data);
      } catch (error) {
        console.error('Erro ao buscar nomes', error);
      }
    };

    fetchNames();
  }, []);

  const handleNameChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const name = names.find((n) => n.id === selectedId);
    setSelectedName(name);
    setNewName(name?.name || '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedName) {
      try {
        await axios.put('http://localhost:5000/api/names', { id: selectedName.id, name: newName });
        alert('Nome atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar nome', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Editar Nome</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectName">Selecione o Nome:</label>
          <select className="form-control" id="selectName" onChange={handleNameChange}>
            <option value="">Selecione...</option>
            {names.map((name) => (
              <option key={name.id} value={name.id}>
                {name.name}
              </option>
            ))}
          </select>
        </div>
        {selectedName && (
          <div className="form-group">
            <label htmlFor="newName">Novo Nome:</label>
            <input 
              type="text" 
              className="form-control" 
              id="newName" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              required 
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Atualizar Nome</button>
      </form>
    </div>
  );
}

export default EditNameForm;
