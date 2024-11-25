import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataTable() {
  const [names, setNames] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const namesResponse = await axios.get('http://localhost:5000/api/names');
        setNames(namesResponse.data);

        const usersResponse = await axios.get('http://localhost:5000/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Nomes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name.id}>
              <td>{name.id}</td>
              <td>{name.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Usuários</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
