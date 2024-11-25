const db = require('../db');

const getFretes = (callback) => {
  const sql = 'SELECT * FROM parametro_frete';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const updateFrete = (id, frete, callback) => {
  const sql = 'UPDATE parametro_frete SET menos_1kg = ?, entre_1kge3kg = ?, entre_3kge8kg = ?, entre_8kge12kg = ?, acima_12kg = ?, km_rodado = ? WHERE id = ?';
  db.query(sql, [frete.menos_1kg, frete.entre_1kge3kg, frete.entre_3kge8kg, frete.entre_8kge12kg, frete.acima_12kg, frete.km_rodado, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

module.exports = {
  getFretes,
  updateFrete
};
