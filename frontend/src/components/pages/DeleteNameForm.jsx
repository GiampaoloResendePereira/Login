import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteNameForm() {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);

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
    setSelectedName(selectedId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedName) {
      try {
        await axios.delete('http://localhost:5000/api/names', { data: { id: selectedName } });
        alert('Nome deletado com sucesso!');
        setNames(names.filter(name => name.id !== selectedName));
      } catch (error) {
        console.error('Erro ao deletar nome', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Deletar Nome</h2>
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
        <button type="submit" className="btn btn-danger">Deletar Nome</button>
      </form>
    </div>
  );
}

export default DeleteNameForm;
