const db = require('../db');

const getPedidos = (callback) => {
  const sql = 'SELECT * FROM pedidos';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const deletePedido = (id, callback) => {
  const sql = 'DELETE FROM pedidos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

module.exports = {
  getPedidos,
  deletePedido
};
